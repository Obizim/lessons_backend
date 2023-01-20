const express = require("express");
const cors = require("cors");
const db = require('./db/mongodb')


const app = express();
app.use(express.json());
app.use(cors());

const client = db.connectToServer();
// const dbConnect = await db.connect()

app.get("/lessons", async (req, res) => {
  const dbConnect = db.getDb();
  dbConnect.collection("listingsAndReviews")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
      console.log(result);
        res.json(result);
      }
    });
});

app.get("/order", (req, res) => {
  
});

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server is running on 3000`)
);
