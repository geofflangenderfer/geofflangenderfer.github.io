
import mongodb from 'mongodb'
import { readFile, writeFile } from 'fs/promises';
const { MongoClient, ObjectId } = mongodb
 
const uri = <get_from_mongo_website>
const client = new MongoClient(uri);

try {
    await client.connect();
    //let ls = JSON.parse(await readFile("initialState.json", "utf8"))
    let cp = client.db("leetcode").collection("contestParticipants")
    let contestParticipants = await cp.find().toArray()

    let start = null
    let startId = null
    for (let i =0;i<contestParticipants.length;i++) {
        let c = contestParticipants[i]
        if ("start" in c) {
            start = c.start
            startId = c._id
            contestParticipants.splice(i,1)
        }
    }

    await writeFile('complete.json', JSON.stringify(contestParticipants))
    //let result = await cp.insertOne({"start":"423"})
//    console.log(result)
    //let startId = "60c52a0d5c51fd70535559bd"

    //console.log(start, startId)
    //let start = await cp.findOne({_id: ObjectId("60c52cc624b75f742e3585c6")})
    //console.log(start)
    //await writeFile('initialState.json', JSON.stringify(res))



} catch (err) {
    console.log(err.stack)
}
finally {
    await client.close()
}

