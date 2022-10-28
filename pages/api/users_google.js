import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { name, email, profilePicture } = req.body;
  const emaild = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
  if (!isEmail(emaild)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  const role = 'poster';
  
  // check if email existed
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    /**res.status(201).json({
      user: extractUser(req),
    });**/
    
    const user = await req.db.collection('users').findOne({
      email: email,
    });

    req.logIn(user, (err) => {
      if (err) throw err;
      // when we finally log in, return the (filtered) user object
      res.status(201).json({
        user: extractUser(req),
      });
    });

  }
  const user = await req.db
    .collection('users')
    .insertOne({ email, name, profilePicture, role })
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