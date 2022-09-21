import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/posters
handler.post(async (req, res) => {
  const { email, fname, lname, phone, createby, createdate } = req.body;
  if (!email || !fname || !lname || !phone) {
    res.status(400).send('Missing field(s)');
    return;
  }
  // check if email existed
  if ((await req.db.collection('posters').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }
  const user = await req.db
    .collection('posters')
    .insertOne({ email, fname, lname, phone, createby, createdate})
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