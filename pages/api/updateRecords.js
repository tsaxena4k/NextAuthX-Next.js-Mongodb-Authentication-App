import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  const {id} = req.query;
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }
  const { year, fname, lname, mname, university, pages, alFname, dissertation_Title, advisor, createby, createdate } = req.body;
  if (!year || !fname || !lname || !university || !dissertation_Title || !advisor) {
    res.status(400).send('Missing field(s)');
    return;
  }

  await req.db
    .collection('records')
    .updateOne({ _id: ObjectID(id) }, { $set: { 
      year, fname, lname, mname, university, pages, alFname, advisor, dissertation_Title, createdate
     } });
  res.end('ok');
});

export default handler;