import express from "express";
import multer from "multer";
import {
  createCategory,
  getCategories,
  updateCategory,
  popularCategoriasController,
  addCardToCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();
const upload = multer({ dest: "./uploads" });

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.post("/popular", popularCategoriasController);
router.post("/:id/cards", addCardToCategoryController);

export default router;
