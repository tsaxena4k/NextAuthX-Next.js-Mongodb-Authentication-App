import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/records
handler.post(async (req, res) => {
  const { name, createby, createdate } = req.body;
  if (!name) {
    res.status(400).send('Missing field(s)');
    return;
  }
 
  const user = await req.db
    .collection('advisors')
    .insertOne({ name, createby, createdate})
    .then(({ ops }) => ops[0]);
    const alladvisors = await req.db.collection("advisors").find({}).toArray();
    res.status(200).json(alladvisors);
});

export default handler;