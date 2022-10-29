import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchStates
handler.get(async (req, res) => {
  const {id} = req.query;
  const allstates = await req.db.collection("states").find({"country_id":Number(id)}).toArray();
  res.status(200).json(allstates);
});

export default handler;