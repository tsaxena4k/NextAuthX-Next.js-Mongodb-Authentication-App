import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  const {id} = req.query;
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }
  const { status } = req.body;

  await req.db
    .collection('records')
    .updateOne({ _id: ObjectID(id) }, { $set: { 
      status
     } });
  res.end('ok');
});

export default handler;