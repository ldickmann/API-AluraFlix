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

//Função para auxiliar tratamento de erros
const handleError = (res, error, message) => {
  console.error(message, error);
  return res.status(500).json({ error: error.message || message });
};

// Função para validação de IDs
const validateIds = (...ids) => {
  return ids.every((id) => ObjectId.isValid(id));
};

// Controllers
// Função para listar as categorias
export const getCategories = async (req, res) => {
  try {
    const categorias = await listarCategoriasCards();
    res.status(200).json(categorias);
  } catch (error) {
    handleError(res, error, "Erro ao buscar categorias");
  }
};

// Função para criar uma nova categoria
export const createCategory = async (req, res) => {
  try {
    const categoriaCriada = await criarCategoria(req.body);
    res.status(201).json(categoriaCriada);
  } catch (error) {
    handleError(res, error, "Erro ao criar categoria");
  }
};

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

// Função para adicionar card/video
export const addCardToCategoryController = async (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      return handleError(res, err, "Erro ao salvar a imagem");
    }

    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const { categoryId } = req.params;

    if (!validateIds(categoryId)) {
      return res.status(400).json({ error: "ID de categoria inválido" });
    }

    try {
      const imageUrl = `/uploads/${req.file.filename}`;
      const updatedCategory = await adicionarCard(
        categoryId,
        req.body,
        imageUrl
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      handleError(res, error, "Erro ao adicionar card à categoria");
    }
  });
};

// Função para remover um card/video de uma categoria
export const deleteCardToCategoryController = async (req, res) => {
  const { categoryId, cardId } = req.params;

  if (!validateIds(categoryId, cardId)) {
    return res.status(400).json({ error: "IDs inválidos" });
  }

  try {
    const updatedCategory = await deleteCard(categoryId, cardId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    handleError(res, error, "Erro ao remover card da categoria");
  }
};

// Função para mover objeto 'card' de categoria
export const moveCardController = async (req, res) => {
  const { sourceCategoryId, destinationCategoryId, cardId } = req.params;

  if (!validateIds(sourceCategoryId, destinationCategoryId, cardId)) {
    return res.status(400).json({ error: "IDs inválidos" });
  }

  try {
    const result = await moveCardToCategory(
      sourceCategoryId,
      destinationCategoryId,
      cardId
    );

    res.status(200).json({
      message: "Card movido com sucesso!",
      sourceCategory: {
        ...result.sourceCategory,
        categoryId: sourceCategoryId,
      },
      destinationCategory: {
        ...result.destinationCategory,
        categoryId: destinationCategoryId,
      },
      cardId: cardId,
    });
  } catch (error) {
    handleError(res, error, "Erro ao mover o card");
  }
};
