import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/records
handler.post(async (req, res) => {
  const { email, fname, lname, university, createby, createdate } = req.body;
  if (!email || !fname || !lname || !university) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('records').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }
  const user = await req.db
    .collection('records')
    .insertOne({ email, fname, lname, university, createby, createdate})
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