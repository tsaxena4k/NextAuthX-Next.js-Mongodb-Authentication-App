import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/records
handler.post(async (req, res) => {
  const { year, fname, lname, mname, university, pages, status, alFname, dissertation_Title, advisor, createby, createdate } = req.body;
  if (!year || !fname || !lname || !university || !dissertation_Title || !advisor) {
    res.status(400).send('Missing field(s)');
    return;
  }
 
  const user = await req.db
    .collection('records')
    .insertOne({ year, fname, lname, mname, university, pages, alFname, advisor, dissertation_Title, status, createby, createdate})
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