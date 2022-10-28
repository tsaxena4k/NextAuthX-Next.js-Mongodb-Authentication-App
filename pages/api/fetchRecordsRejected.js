import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { ObjectID } from 'mongodb';  

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// GET /api/fetchPosters
handler.get(async (req, res) => {
  const allrecords = await req.db.collection("records").aggregate([
    { $match : { "status":3 } },
    {
      $addFields: {
        university: {
          $toObjectId: "$university"
        }
      }
    },
    {
      $addFields: {
        advisor: {
          $toObjectId: "$advisor"
        }
      }
    },
    {
      $lookup:
      {
        from: 'universities',
        localField: 'university',
        foreignField:'_id',
        as: 'universityDetails'
      }
    },
    {
    $lookup:
      {
        from: 'countries',
        localField: 'universityDetails.country',
        foreignField: 'id',
        as: 'countriesdetails'
      }
    },{
      $lookup:
      {
        from: 'states',
        localField: 'universityDetails.state',
        foreignField: 'id',
        as: 'statesdetails'
      }
    },{
      $lookup:
      {
        from: 'cities',
        localField: 'universityDetails.city',
        foreignField: 'id',
        as: 'citiesdetails'
      }
    },{
      $lookup:
      {
        from: 'advisors',
        localField: 'advisor',
        foreignField: '_id',
        as: 'advisorName'
      }
    }
  ]).toArray();
  res.status(200).json(allrecords);
});

export default handler;