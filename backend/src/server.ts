import express, { Application } from "express";
import mongoose from "mongoose";
import summarizeRouter from "./routes/summarizeRoute";
import dotenv from "dotenv";
import cors from "cors";
import documentRouter from "./routes/documentRoute";
import extractKeyPointsRoute from "./routes/extractKeyPointsRoute";
import authRouter from "./routes/userRoute"



dotenv.config();

const PORT = 8000;
const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const MONGO_URI = `${dbDialect}://${dbHost}:${dbPort}/${dbName}`;


const app: Application = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, function () {
      console.log(`Server is listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api", summarizeRouter);
app.use("/api", extractKeyPointsRoute);
app.use("/api", documentRouter);
app.use("/api/auth", authRouter);

app.get("/", function (req, res) {
  res.send("Hello World!");
});