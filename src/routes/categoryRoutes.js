import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  popularCategoriasController,
  addCardToCategoryController,
  deleteCardToCategoryController,
  updateCard,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.post("/popular", popularCategoriasController);
router.post("/:id/cards", addCardToCategoryController);

router.delete("/:categoryId/cards/:cardId", deleteCardToCategoryController);
router.put("/:categoryId/cards/:cardId", updateCard);

export default router;
