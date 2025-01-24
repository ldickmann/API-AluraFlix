import { listarCategorias, criarCategoria } from "../models/categories.js";

export async function getCategories(req, res) {
  try {
    const categorias = await listarCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

export async function createCategory(req, res) {
  const novaCategoria = req.body;
  try {
    const categoriaCriada = await criarCategoria(novaCategoria);
    res.status(201).json(categoriaCriada);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
}
