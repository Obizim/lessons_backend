const {MongoClient, ServerApiVersion} = require('mongodb')

const url = process.env.MONGO_URL_CONNECTION
const databaseName = 'lessons-app'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const connection = async () => {
  await client.connect();
  console.log('Connected successfully to database');

  const database = client.db(databaseName);
  return database
}

module.exports = connection