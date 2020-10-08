import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => res.json({ user: extractUser(req) }));

export default handler;