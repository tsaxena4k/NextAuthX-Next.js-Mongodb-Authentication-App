import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchSearchResults
handler.get(async (req, res) => {
  const { thesis, fname, lname, university } = req.body;
  if (!thesis || !fname || !lname || !university) {
    res.status(400).send('Missing field(s)');
    return;
  }
  const allResults = await req.db.collection("records").find(
    {"thesis":Number(thesis),"fname":Number(fname), "lname":Number(lname), "university":Number(university) }
  ).toArray();

  res.status(200).json(allResults);
});

export default handler;