import connectDatabase from "../config/dbConfig.js";
import { GridFSBucket } from "mongodb";
import { ObjectId } from "mongodb";

// Função para salvar arquivos no GridFS
const uploadToGridFS = async (file) => {
  try {
    const db = await connectDatabase();
    const bucket = new GridFSBucket(db, { bucketName: "images" });
    const uploadStream = bucket.openUploadStream(file.originalname); // Use o nome do arquivo original
    return new Promise((resolve, reject) => {
      uploadStream.on("finish", () => {
        resolve(uploadStream.id.toString());
      });
      uploadStream.on("error", (error) => {
        reject(error);
      });
      uploadStream.write(file.buffer); // Escreve os dados na stream
      uploadStream.end();
    });
  } catch (error) {
    console.error("Erro ao salvar a imagem:", error);
    throw new Error("Erro ao salvar a imagem: " + error.message);
  }
};

// Função para listar todas as categorias
const listarCategorias = async () => {
  try {
    const db = await connectDatabase();
    const categories = await db.collection("categories").find().toArray();
    return categories;
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    throw new Error("Erro ao listar categorias.");
  }
};

// Função para criar uma nova categoria
const criarCategoria = async (novaCategoria) => {
  try {
    const db = await connectDatabase();
    const newCategory = {
      _id: new ObjectId(),
      ...novaCategoria,
    };
    const collection = db.collection("categories");
    await collection.insertOne(newCategory);
    return newCategory;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw new Error("Erro ao criar categoria.");
  }
};

// Função para popular categorias com dados iniciais
const popularCategorias = async (categorias) => {
  try {
    const db = await connectDatabase();
    const collection = db.collection("categories");
    const categoriesToAdd = categorias.map((categoria) => ({
      ...categoria,
      _id: new ObjectId(),
    }));
    const result = await collection.insertMany(categoriesToAdd);
    return result;
  } catch (error) {
    console.error("Erro ao popular categorias", error);
    throw new Error("Erro ao popular categorias");
  }
};

// Função para atualizar uma categoria existente
const atualizarCategoria = async (id, dadosAtualizados) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID inválido.");
    }

    const db = await connectDatabase();
    const collection = db.collection("categories");
    const filter = { _id: new ObjectId(id) };
    const update = { $set: dadosAtualizados };
    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      throw new Error(
        "Categoria não encontrada ou nenhuma atualização realizada."
      );
    }
    const updatedCategory = await collection.findOne(filter);
    return updatedCategory;
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw new Error("Erro ao atualizar categoria.");
  }
};

const adicionarCard = async (categoryId, card, imageUrl) => {
  try {
    if (!ObjectId.isValid(categoryId)) {
      throw new Error("Invalid categoryId");
    }

    const db = await connectDatabase();
    const collection = db.collection("categories");
    const filter = { _id: new ObjectId(categoryId) };
    const newCard = {
      _id: new ObjectId(), // Adiciona um novo ObjectId ao card
      ...card,
      image: imageUrl, // Adicione a URL da imagem aqui
    };
    const update = { $push: { cards: newCard } };
    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      throw new Error(
        "Categoria não encontrada ou nenhuma atualização realizada."
      );
    }
    const updatedCategory = await collection.findOne(filter);

    return updatedCategory;
  } catch (error) {
    console.error("Erro ao adicionar card:", error);
    throw new Error("Erro ao adicionar card.");
  }
};

const deleteCard = async (categoryId, cardId) => {
  try {
    const db = await connectDatabase();
    const collection = db.collection("categories");

    // Corrigindo o uso de ObjectId para buscar o card corretamente
    const filter = { _id: new ObjectId(categoryId) };
    const update = { $pull: { cards: { _id: new ObjectId(cardId) } } }; // Garantir que estamos buscando pelo _id do card

    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      throw new Error(
        "Categoria não encontrada ou nenhuma atualização realizada."
      );
    }
    const updatedCategory = await collection.findOne(filter);
    return updatedCategory;
  } catch (error) {
    console.error("Erro ao remover card:", error);
    throw new Error("Erro ao remover card.");
  }
};

// Função para listar todas as categorias com seus cards
const listarCategoriasCards = async () => {
  try {
    const db = await connectDatabase();
    const categories = await db
      .collection("categories")
      .aggregate([
        {
          $project: {
            idMongo: "$_id",
            category: 1,
            categoryColor: 1,
            hoverColor: 1,
            bgColor: 1,
            cards: 1,
          },
        },
      ])
      .toArray();
    return categories;
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    throw new Error("Erro ao listar categorias.");
  }
};

async function atualizarCard(categoryId, cardId, updatedCardData) {
  try {
    const db = await connectDatabase();
    const collection = db.collection("categories");

    // 1. Delete existing card
    const deleteResult = await collection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $pull: { cards: { _id: new ObjectId(cardId) } } }
    );

    if (deleteResult.modifiedCount === 0) {
      throw new Error("Card não encontrado para atualização");
    }

    // 2. Add new card with updated data but keeping same ID
    const newCard = {
      _id: new ObjectId(cardId), // Mantém o mesmo ID
      ...updatedCardData,
    };

    const addResult = await collection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $push: { cards: newCard } }
    );

    if (addResult.modifiedCount === 0) {
      throw new Error("Erro ao readicionar card atualizado");
    }

    const updatedCategory = await collection.findOne({
      _id: new ObjectId(categoryId),
    });
    return updatedCategory;
  } catch (error) {
    console.error("Erro ao atualizar card:", error);
    throw new Error("Erro ao atualizar card: " + error.message);
  }
}

export {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  listarCategoriasCards,
  popularCategorias,
  adicionarCard,
  deleteCard,
  uploadToGridFS,
  atualizarCard,
};
