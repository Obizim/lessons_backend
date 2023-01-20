const express = require("express");
const cors = require("cors");
const db = require('./db/mongodb')


const app = express();
app.use(express.json());
app.use(cors());

db.connectToServer();

app.get("/lessons", async (req, res) => {
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

// app.get("/order", (req, res) => {
//   const dbConnect = db.getDb();
//   // dbConnect./
// });

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server is running on 3000`)
);
