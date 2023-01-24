const express = require("express");
const cors = require("cors");
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const connection = require('./db/mongodb')


const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());


var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

// app.use('/lesson-images', (req, res, next) => {
//   express.static(lessonImagesPath, {fallthrough: false})(req, res, next);
// }).on('error', function(err) {
//   if (err.status === 404) {
//     res.status(404).send({ error: 'Image file not found' });
//   } else {
//     next(err);
//   }
// });


app.get("/lessons", async (req, res) => {
  const db = await connection()
  db.collection("lessons")
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
  const db = await connection()
  if(Object.keys(req.body).length === 0) res.status(400).send()
  db.collection("order").insertOne(req.body, (err, result) => {
    if(err) res.status(400).send({error: "Error inserting document"})
    res.send(result)
  })
});

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server is running on 3000`)
);
