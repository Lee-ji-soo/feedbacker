const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const info = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const conn = mysql.createConnection(info);

exports.login = async (req, res) => {
  const { userId, name, picture, token, expiresIn } = req.body;
  conn.query(
    `INSERT INTO users SET ?`,
    { userId, name, picture, token, expiresIn },
    (err, results) => {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    conn.query(
      `SELECT userId FROM users WHERE userId = ?`,
      [userId],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const cookieOptions = {
            expires: new Date(Date.now() + expiresIn * 24 * 60),
          };
          res.cookie("fbUser", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.loggedIn = async (req, res) => {
  const userToken = req.cookies;
  res.status(200).send("userToken", userToken);
};
