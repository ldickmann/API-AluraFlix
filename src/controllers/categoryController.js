import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  listarCategoriasCards,
  popularCategorias,
  adicionarCard,
  deleteCard,
  atualizarCard,
} from "../models/categories.js";
import { uploadImage } from "../middlewares/upload.js";

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
  try {
    const { id } = req.params; // ID do card
    const dadosCardAtualizados = req.body; // Dados enviados no corpo da requisição

    console.log("Updating card with id:", id);
    console.log("Updated card data:", dadosCardAtualizados);

    const cardAtualizado = await atualizarCard(id, dadosCardAtualizados);

    if (!cardAtualizado) {
      return res.status(404).json({ message: "Card não encontrado" });
    }

    res.status(200).json(cardAtualizado);
  } catch (erro) {
    console.error("Error updating card:", erro);
    res.status(500).json({ message: erro.message });
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
  const { id } = req.params;

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

    try {
      // Se o upload for bem-sucedido, continue com o processo de adicionar o card
      const imageUrl = `/uploads/${req.file.filename}`; // URL do arquivo de imagem
      const updatedCategory = await adicionarCard(id, req.body, imageUrl);
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
    console.error("Erro ao remover card:", error);
    res.status(500).json({ error: "Erro ao remover card" });
  }
}
