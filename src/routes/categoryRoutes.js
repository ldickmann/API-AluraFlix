import express from "express";
import multer from "multer";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();
const upload = multer({ dest: "./uploads" });

router.get("/", getCategories);
router.post("/", createCategory);

export default router;
