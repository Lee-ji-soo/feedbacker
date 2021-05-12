const express = require("express");
const factory = require("../factory");
const router = express.Router();

router.get("/getBoard", factory.getBoard);
router.get("/getDetail", factory.getDetail);
router.get("/getComment", factory.getComment);
router.post("/postComment", factory.postComment);

module.exports = router;
