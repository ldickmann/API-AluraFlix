import express from "express";
import multer from "multer";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const upload = multer({ dest: "./uploads" });

const routes = (app) => {
  app.use(express.json());

  app.get("/categories", getCategories);

  app.post("/categories", createCategory);
};

export default routes;
