const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const api = require("./routers/api.js");
const auth = require("./routers/auth.js");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 80;

app.use(express.json()); // body parser
app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:3000",
      "http://localhost:80",
      "http://54.180.85.4",
      "http://feedbacker.club",
      "https://feedbacker.club",
      "http://www.feedbacker.club",
      "https://www.feedbacker.club",
    ],
    credentials: true,
  })
);

app.use("/auth", auth);
app.use("/api", api);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API Client)
app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(path.resolve(), "./dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`💚 APP LISTEN IN PORT : ${PORT}`);
});
