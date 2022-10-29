import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { ObjectID } from 'mongodb';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }
  const { year, fname, lname, mname, university, dissertation_Title } = req.body;
  if (!year && !fname && !lname && mname && !university && !dissertation_Title) {
    res.status(400).send('Missing field(s)');
    return;
  }
  console.log(university);
  const allrecords = await req.db.collection("records").aggregate([
    { $match : { "status":1, 
    "dissertation_Title": new RegExp('.*' + dissertation_Title + '.*'),
    "fname": new RegExp('.*' + fname + '.*'),
    "lname": new RegExp('.*' + lname + '.*'),
    "mname": new RegExp('.*' + mname + '.*'),
    "year": new RegExp('.*' + year + '.*'),
    "university": new RegExp('.*' + university + '.*'),
  } },
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