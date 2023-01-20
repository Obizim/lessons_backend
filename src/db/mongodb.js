const {MongoClient} = require('mongodb')

const uri = "mongodb://127.0.0.1:27017/"
const databaseName = 'lessons-app'


const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let dbConnection;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
 
      dbConnection = db.db(databaseName);
      console.log("Successfully connected to MongoDB.");
 
    //   return callback();
    });
  },
 
  getDb: function () {
    return dbConnection;
  },
};