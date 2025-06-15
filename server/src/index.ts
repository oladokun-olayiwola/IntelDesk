import express from "express";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import connectDB from "./connectDB/connect";
import AuthRouter from "./routes/Auth";
import IncidentRouter from "./routes/Incident"
import { verifyToken } from "./middlewares/Authentication";
import CriminalRecord from "./routes/CriminalRecord"
import errorHandler from "./middlewares/errorHandler";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://intel-desk.vercel.app",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(json());

app.get("/", (_, res) => {
  res.send("Server is running");
});
app.get("/api/test", (_, res) => {
  res.json({ status: "API is working!" });
});
app.use("/api/auth", AuthRouter);
app.use("/api/incidents", verifyToken, IncidentRouter);
app.use("/api/criminals", verifyToken, CriminalRecord)


app.use(errorHandler);

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