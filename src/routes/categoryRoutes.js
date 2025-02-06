import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  updateCard,
  popularCategoriasController,
  addCardToCategoryController,
  deleteCardToCategoryController,
  moveCardController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.put("/:categoryId/cards/:cardId", updateCard);
router.post("/popular", popularCategoriasController);
router.post("/:categoryId/cards", addCardToCategoryController);
router.delete("/:categoryId/cards/:cardId", deleteCardToCategoryController);
router.patch(
  "/:sourceCategoryId/move-card/:cardId/to/:destinationCategoryId",
  moveCardController
);

export default router;
