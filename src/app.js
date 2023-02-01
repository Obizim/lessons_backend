const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const connection = require("./db/mongodb");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

const port = process.env.PORT || 3000
const staticPath = path.join(__dirname, "public/images");
app.use(express.static(staticPath));

app.get("/lessons", async (req, res) => {
  const db = await connection();
  let searchQuery = req.query.search;
  let data = {};

  if (searchQuery) {
    data = {
      $or: [
        { subject: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
      ],
    };
  }
  db.collection("lessons")
    .find(data)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching lessons!");
      } else {
        res.status(200).send(result);
      }
    });
});

app.put("/lessons/:id", async (req, res) => {
  const db = await connection();
  db.collection("lessons").updateOne(
    { _id: ObjectId(req.params.id) },
    { $inc: { spaces: -(req.body.spaces)} },
    (err, result) => {
      if(err) res.status(400).send();
      res.send(result)
    }
  );
});

app.post("/order", async (req, res) => {
  const db = await connection();
  db.collection("order").insertOne(req.body, (err, result) => {
    if (err) res.status(400).send();
    res.send(result);
  });
});

app.use((req,res) => {
  res.status(404).send('Resource not found!')
})

app.listen(port, () =>
  console.log(`Server is running on ${port}`)
);
