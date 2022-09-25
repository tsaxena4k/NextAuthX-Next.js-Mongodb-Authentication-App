import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchStates
handler.get(async (req, res) => {
  const {state_id, country_id} = req.query;
  const allstates = await req.db.collection("cities").find({"country_id":Number(country_id),"state_id":Number(state_id) }).toArray();
  res.status(200).json(allstates);
});

export default handler;