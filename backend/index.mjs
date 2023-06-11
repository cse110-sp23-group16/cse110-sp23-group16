// Imports for express mongo and dotenv
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

// Imports for https
import { createServer } from "https";
import { readFileSync } from "fs";

// Setup dotenv
dotenv.config({ path: ".env" });

// Create a MongoClient with the server string
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

// Attempt a connection with the MongoDB Client
let conn;
try {
  console.log("Connecting to MongoDB");
  conn = await client.connect();
  console.log("Connection to MongoDB Secured");
} catch (e) {
  console.error(e);
}

// Get a database for the Analytics Collection
let db = conn.db("Analytics");

// Set up node js and routes
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// This route is for error tracking.
app.post("/error", async (req, res) => {
  let newDocument = {
    error: req.body.error,
  };
  let collection = await db.collection("TestErrors");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This route is for Analytics
app.post("/analytics", async (req, res) => {
  let newDocument = req.body;
  let collection = await db.collection("Sessions");
  let result = await collection.replaceOne({ id: req.body.id }, newDocument, {
    upsert: true,
  });
  res.send(result).status(204);
});

const options = {
  key: readFileSync("/etc/letsencrypt/live/stargazer.rest/privkey.pem"),
  cert: readFileSync("/etc/letsencrypt/live/stargazer.rest/fullchain.pem"),
};

createServer(options, app).listen(port, () => {
  console.log(`Server Started at ${port}`);
});
