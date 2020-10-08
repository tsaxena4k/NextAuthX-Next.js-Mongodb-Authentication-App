import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { message } = req.body;
  const msg = await req.db
    .collection('messages')
    .insertOne({ message })
    .then(({ ops }) => ops[0]);
  res.status(201).end();   
});

export default handler;