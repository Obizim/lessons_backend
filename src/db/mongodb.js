const {MongoClient} = require('mongodb')

const url = "mongodb://127.0.0.1:27017/"
const databaseName = 'lessons-app'
const client = new MongoClient(url);


const connection = async () => {
  await client.connect();
  console.log('Connected successfully to database');

  const database = client.db(databaseName);
  return database
}

module.exports = connection