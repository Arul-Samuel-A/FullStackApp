import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/books", bookRoute);

async function startServer() {
  try {
    await connectDB(mongoURI);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err.message);
  }
}

startServer();
