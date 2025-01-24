import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  listarCategoriasCards,
  popularCategorias,
  adicionarCard,
} from "../models/categories.js";

export async function getCategories(req, res) {
  try {
    const categorias = await listarCategoriasCards();
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

export async function updateCategory(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const categoriaAtualizada = await atualizarCategoria(id, dadosAtualizados);
    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
}

export async function popularCategoriasController(req, res) {
  try {
    const { categories } = req.body;
    const result = await popularCategorias(categories);
    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao popular categorias:", error);
    res.status(500).json({ error: "Erro ao popular categorias" });
  }
}

export async function addCardToCategoryController(req, res) {
  const { id } = req.params;
  const cardData = req.body;
  try {
    const updatedCategory = await adicionarCard(id, cardData);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Erro ao adicionar card a categoria:", error);
    res.status(500).json({ error: "Erro ao adicionar card a categoria" });
  }
}
