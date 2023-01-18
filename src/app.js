const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())

app.get("/lessons", (request, response) => {
  response.json([
    { topic: "Web-based Mobile App Development", location: "Hendon", price: 100 },
    { topic: "Business Intelligence", location: "Colindale", price: 80 },
    { topic: "Strategic Information Systems", location: "Brent Cross", price: 90 },
    { topic: "Advanced Web Development with Big Data", location: "Golders Green", price: 120 },
  ]);
});

app.get("/user", (request, response) => {
    response.json([
        {email: "user@email.com", password: "mypassword"}
    ])
})

app.listen(process.env.APP_PORT || 3000, () => console.log(`Server is running on ${process.env.APP_PORT || 3000}: http://localhost:${process.env.APP_PORT || 3000}`));
