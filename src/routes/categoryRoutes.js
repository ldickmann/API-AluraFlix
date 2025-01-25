import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  updateCard,
  popularCategoriasController,
  addCardToCategoryController,
  deleteCardToCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.put("/:categoryId/cards/:cardId", updateCard);
router.post("/popular", popularCategoriasController);
router.post("/:id/cards", addCardToCategoryController);

router.delete("/:categoryId/cards/:cardId", deleteCardToCategoryController);

export default router;
