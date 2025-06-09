import express from "express";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import connectDB from "./connectDB/connect";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(json());

app.get("/", (_, res) => {
  res.send("Hey");
});


const PORT = process.env.PORT || 5000;

const start: () => Promise<void> = async () => {
  await connectDB(process.env.MONGODB_CONNECTION_STRING as string);
  try {
    app.listen(PORT, () => {
      console.log(`Listening to your server on port ${PORT} `);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();