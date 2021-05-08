import express from "express";
import {
  getBoard,
  getDetail,
  getComment,
  postComment
} from "../factory/index.js";
const router = express.Router();

router.get("/getBoard", getBoard);
router.get("/getDetail", getDetail);
router.get("/getComment", getComment);
router.post("/postComment", postComment);

export default router;