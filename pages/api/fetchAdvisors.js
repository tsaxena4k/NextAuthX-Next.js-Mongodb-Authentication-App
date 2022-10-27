import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { clientPromise } from '../../lib/connection-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
const alladvisors = await req.db.collection("advisors").find({}).toArray();
  res.status(200).json(alladvisors);
});

export default handler;