import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { message,name } = req.body;
  const msg = await req.db
    .collection('messages')
    .insertOne({ name,message,message_date:new Date()})
    .then(({ ops }) => ops[0]);
  res.status(201).end();   
});

export default handler;