const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
// const serviceAccount = JSON.parse(decoded)
const serviceAccount = require("./firebasePrivateKeys.json");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://assignment11-d0983.web.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const userInfo = await admin.auth().verifyIdToken(token);
  req.tokenEmail = userInfo.email;
  next();
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2i7tcvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("Assignment11");
    const FoodExpiryData = database.collection("FoodExpiry");
    const FoodComments = database.collection("comments");

    app.get("/fridge", async (req, res) => {
      const result = await FoodExpiryData.find().toArray();
      res.send(result);
    });

    app.get("/comments", async (req, res) => {
      const result = await FoodComments.find().toArray();
      res.send(result);
    });

    app.get("/fridgeFood", async (req, res) => {
      const search = req.query.search || "";

      const query = search ? { title: { $regex: search, $options: "i" } } : {};

      try {
        const result = await FoodExpiryData.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching fridge items:", error);
        res.status(500).send({ error: "Server Error" });
      }
    });

    app.get("/fridgeFood/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await FoodExpiryData.findOne(query);
      res.send(result);
    });

    app.get("/fridgeEmail", verifyToken, async (req, res) => {
      const email = req.query.email;

      if (req.tokenEmail != email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const result = await FoodExpiryData.find({ email: email }).toArray();
      res.send(result);
    });

    app.delete("/fridgeFood/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await FoodExpiryData.deleteOne(query);
      res.send(result);
    });

    // post
    app.post("/FoodExpiry", verifyToken, async (req, res) => {
      const food = req.body;
      const result = await FoodExpiryData.insertOne(food);
      res.send(result);
    });

    app.post("/jwt", async (req, res) => {
      const userData = req.body;
      const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
      });

      // set token in the cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // required for HTTPS
        sameSite: "None",
      });
      res.send({ success: true });
    });

    // comments post
    app.post("/comments", verifyToken, async (req, res) => {
      const food = req.body;
      const result = await FoodComments.insertOne(food);
      res.send(result);
    });

    // update product
    app.patch("/fridge/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id), email: req.decoded.email }; // 👈 check ownership
      const updateDocs = {
        $set: req.body,
      };
      const result = await FoodExpiryData.updateOne(filter, updateDocs);

      if (result.matchedCount === 0) {
        return res.status(403).send({ message: "Forbidden: not your item" });
      }

      res.send(result);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run();

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
