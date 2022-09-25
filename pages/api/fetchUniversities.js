import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { clientPromise } from '../../lib/connection-helpers';

const db = (await clientPromise).db(process.env.MONGODB_DB);

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
  const allposters = await req.db.collection("universities").find({}).toArray();
  res.status(200).json(allposters);
});

export default handler;