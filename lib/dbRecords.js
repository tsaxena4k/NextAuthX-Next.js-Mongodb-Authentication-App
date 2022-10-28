import { ObjectID } from 'mongodb';  

export async function getUser(req, recordId) {
    const record = await req.db.collection('records').findOne({
      _id: ObjectID(recordId),
    });
    if (!record) return null;
    const {
      _id, fname, lname, year, mname, university, pages, alFname, dissertation_Title, advisor
    } = record;
    return JSON.parse(JSON.stringify({
      _id,
      fname: fname,
      lname: lname,
      mname: mname,
      year: year,
      university: university,
      pages: pages,
      alFname: alFname,
      dissertation_Title: dissertation_Title,
      advisor: advisor
    }));
} 