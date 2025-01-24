import { listarCategorias, criarCategoria } from "../models/Category.js";

export async function getCategories(req, res) {
  const categorias = await listarCategorias();
  res.status(200).json(categorias);
}

export async function createCategory(req, res) {
  const novaCategoria = req.body;
  try {
    const categoriaCriada = await criarCategoria(novaCategoria);
    res.status(200).json(categoriaCriada);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro ao criar categoria" });
  }
}
