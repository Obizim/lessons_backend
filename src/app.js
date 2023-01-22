const express = require("express");
const cors = require("cors");
require('dotenv').config()
const db = require('./db/mongodb')


const app = express();
app.use(express.json());
app.use(cors());

db.connectToServer();
app.get("/lessons", (req, res) => {
  const dbConnect = db.getDb();
  dbConnect.collection("lessons")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching lessons!");
     } else {
        res.json(result);
      }
    });
});

app.post("/order", async (req, res) => {
  const dbConnect = db.getDb();
  if(Object.keys(req.body).length === 0) res.status(400).send()
  dbConnect.collection("order").insertOne(req.body, (err, result) => {
    if(err) res.status(400).send({error: "Error inserting document"})
    res.send(result)
  })
});

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server is running on 3000`)
);
