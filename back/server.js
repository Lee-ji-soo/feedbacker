import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import api from "./api/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 80;

app.use(express.json()); // body parser
app.use(cors({
  origin:[
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:80",
    "http://54.180.85.4",
    "http://feedbacker.club",
    "https://feedbacker.club",
    "http://www.feedbacker.club",
    "https://www.feedbacker.club"
  ],
  credentials: true
}))

app.use("/api", api);
app.use("/", express.static(path.join(path.resolve(),"./dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`💚 APP LISTEN IN PORT : ${PORT}`)
})