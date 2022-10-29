import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { clientPromise } from '../../lib/connection-helpers';

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
const alluniversities = await req.db.collection("universities").aggregate([{
    $lookup:
      {
        from: 'countries',
        localField: 'country',
        foreignField: 'id',
        as: 'countriesdetails'
      }
    },{
      $lookup:
      {
        from: 'states',
        localField: 'state',
        foreignField: 'id',
        as: 'statesdetails'
      }
    },{
      $lookup:
      {
        from: 'cities',
        localField: 'city',
        foreignField: 'id',
        as: 'citiesdetails'
      }
    }
  ]).toArray();

  res.status(200).json(alluniversities);
});

export default handler;