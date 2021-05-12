const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let conn;
let sql;

const info = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

function handleDisconnect() {
  conn = mysql.createConnection(info);
  conn.connect((err, result, fields) => {
    if (err) {
      console.log("err message", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  conn.on("error", (err) => {
    console.log("db error", err);
    if (err.conde === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

//BOARD
module.exports.getBoard = (req, res) => {
  sql = `
    SELECT b.*, COUNT(c.comment_id) AS count FROM board b
    LEFT JOIN comment c ON c.board_id = b.board_id
    GROUP BY b.board_id
    ORDER BY board_id DESC
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(false);
    } else {
      res.status(200).send(data);
    }
  });
};

//DETAIL
module.exports.getDetail = (req, res) => {
  const {
    query: { board_id },
  } = req;
  sql = `SELECT * FROM board WHERE board_id = ? `;
  conn.query(sql, [board_id], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(false);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.getComment = (req, res) => {
  const {
    query: { board_id },
  } = req;
  sql = `
    SELECT * FROM comment WHERE board_id = ?
    ORDER BY comment_id DESC
  `;
  conn.query(sql, [board_id], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(false);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.postComment = (req, res) => {
  const {
    body: { board_id, writer, comment_content },
  } = req;
  sql = `
    INSERT INTO comment (board_id, writer, comment_content, datetime)
    VALUES(?,?,?, now())
  `;
  conn.query(sql, [board_id, writer, comment_content], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(false);
    } else {
      res.status(200).send(true);
    }
  });
};
