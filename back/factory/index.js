const mysql = require("mysql");
require("dotenv").config();

const info={
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

function handleDisconnect(){
  conn = mysql.createConnection(info);
  conn.connect((err,req,res)=>{
    if(err){
      console.log("err message:", err);
      setTimeout(handleDisconnect, 2000);
    }
  })

  conn.on("error", (err)=>{
    console.log("db error" + err);
    if(err.conde == "PROTOCOL_CONNECTION_LOST"){
      handleDisconnect()
    }else{
      throw err;
    }
  })
}

handleDisconnect();

module.exports.getBoard = (req, res) => {
  sql = "SELECT * FROM board ORDER BY board_id DESC";
  conn.query(sql, (err, data) => {
    if(err){
      console.log(err);
      res.status(500).send(false);
    }else{
      res.status(200).send(data);
    }
  })
}

module.exports.getDetail = (req, res) => {
  const {query : {board_id}} = req;
  sql = "SELECT * FROM board WHERE board_id = ? ";
  conn.query(sql, [board_id], (err, data) => {
    if(err){
      res.status(500).send(false);
    }else{
      res.status(200).send(data);
    }
  })
}

module.exports.getComment = (req, res) => {
  const {query : {board_id}} = req;
  sql = "SELECT * FROM board WHERE board_id = ? ";
  conn.query(sql, [board_id], (err, data) => {
    if(err){
      res.status(500).send(false);
    }else{
      res.status(200).send(data);
    }
  })
}
