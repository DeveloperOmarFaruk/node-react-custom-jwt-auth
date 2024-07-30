const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.ACCESS_SECRET_KEY}`;

// Middleware
app.use(cors());
app.use(express.json());

// Secret Key Generate Command:
// require('crypto').randomBytes(64).toString('hex')

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
      const name = registerUser.name;
      const email = registerUser.email;
      const password = registerUser.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await usersCollection.insertOne({
        name,
        email,
        password: hashedPassword,
      });
      res.json(result);
    });

    // =============================
    // User Login POST API method
    // =============================

    app.post("/login", async (req, res) => {
      const loginUser = req.body;
      const email = loginUser.email;
      const password = loginUser.password;
      const user = await usersCollection.findOne({ email: email });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      if ((token, user, isPasswordValid === true)) {
        userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        res.send({ token, userInfo });
      } else {
        res.status(401).send({ message: "Invalid email or password" });
      }
    });

    // =============================
    // User GET API method
    // =============================
    app.get("/me", async (req, res) => {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) return res.status(401).send({ message: "Unauthorized" });

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await usersCollection.findOne({
          _id: new ObjectId(decoded.id),
        });
        if (!user) return res.status(401).send({ message: "Unauthorized" });
        userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        res.send({ userInfo });
      } catch (err) {
        res.status(401).send({ message: "Unauthorized" });
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
