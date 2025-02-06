import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  listarCategoriasCards,
  popularCategorias,
  adicionarCard,
  deleteCard,
  atualizarCard,
  moveCardToCategory,
} from "../models/categories.js";
import { uploadImage } from "../middlewares/upload.js";
import { ObjectId } from "mongodb";

// Função para listar categorias com cards
export async function getCategories(req, res) {
  try {
    const categorias = await listarCategoriasCards();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

// Função para criar uma nova categoria
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

// Função para atualizar uma categoria
export async function updateCategory(req, res) {
  console.log("Request body in updateCard:", req.body);
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

export const updateCard = async (req, res) => {
  const { categoryId, cardId } = req.params;
  const updatedCardData = req.body;

  if (!ObjectId.isValid(categoryId) || !ObjectId.isValid(cardId)) {
    return res.status(400).json({ error: "IDs inválidos" });
  }

  try {
    const updatedCategory = await atualizarCard(
      categoryId,
      cardId,
      updatedCardData
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para popular categorias com dados
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
  // Processando o upload da imagem
  uploadImage(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: err.message || "Erro ao salvar a imagem" });
    }

    // Verificar se o arquivo foi enviado corretamente
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const { categoryId } = req.params;

    // Validate categoryId
    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    try {
      // Se o upload for bem-sucedido, continue com o processo de adicionar o card
      const imageUrl = `/uploads/${req.file.filename}`; // URL do arquivo de imagem
      const updatedCategory = await adicionarCard(
        categoryId,
        req.body,
        imageUrl
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Erro ao adicionar card à categoria:", error);
      res.status(500).json({ error: "Erro ao adicionar card à categoria" });
    }
  });
}

// Função para remover um card de uma categoria
export async function deleteCardToCategoryController(req, res) {
  const { categoryId, cardId } = req.params;
  try {
    const updatedCategory = await deleteCard(categoryId, cardId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Erro ao remover card da categoria:", error);
    res.status(500).json({ error: "Erro ao remover card da categoria" });
  }
}

export const moveCardController = async (req, res) => {
  const { sourceCategoryId, destinationCategoryId, cardId } = req.params;

  try {
    const { sourceCategory, destinationCategory } = await moveCardToCategory(
      sourceCategoryId,
      destinationCategoryId,
      cardId
    );

    res.status(200).json({
      message: "Card movido com sucesso!",
      sourceCategory,
      destinationCategory,
    });
  } catch (error) {
    console.error("Erro ao mover o card:", error);
    res.status(500).json({ error: error.message });
  }
};
