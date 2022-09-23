import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
  const { country } = req.body;
  const allstates = await req.db.collection("states").find({country_id:country}).toArray();
  res.status(200).json(allcountries);
});

export default handler;