const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crud-mongodb.bkqhhcm.mongodb.net/?appName=crud-mongodb`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("customJWTDB");
    const usersCollection = database.collection("users");

    // =============================
    // User Register POST API method
    // =============================

    app.post("/register", async (req, res) => {
      const registerUser = req.body;
      const result = await usersCollection.insertOne(registerUser);
      res.json(result);
    });

    // =============================
    // User Login POST API method
    // =============================

    app.post("/login", async (req, res) => {
      const loginUser = req.body;
      const email = loginUser.email;
      const password = loginUser.password;
      const cursor = usersCollection.find({ email: email });
      const result = await cursor.toArray();
      if (result) {
        if (result.password === password) {
          res.json("Login Successful");
        } else {
          res.json("The Password is Incorrect");
        }
      } else {
        res.json("No Record Existed");
      }
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm a Node server. Now I'm working...Custom JWT Auth project. Please don't disturbe me."
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
