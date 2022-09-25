import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/posters
handler.post(async (req, res) => {
  const { name, state, city, country, createby, createdate } = req.body;
  if (!name || !state || !city || !country) {
    res.status(400).send('Missing field(s)');
    return;
  }
 
  const user = await req.db
    .collection('universities')
    .insertOne({ name, state, city, country, createby, createdate})
    .then(({ ops }) => ops[0]);
  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;