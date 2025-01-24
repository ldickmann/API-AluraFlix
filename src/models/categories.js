import { ObjectId } from "mongodb";
import connectDatabase from "../config/dbConfig.js";

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

const atualizarCategoria = async (id, dadosAtualizados) => {
  try {
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

const adicionarCard = async (categoryId, card) => {
  try {
    const db = await connectDatabase();
    const collection = db.collection("categories");
    const filter = { _id: new ObjectId(categoryId) };
    const newCard = {
      id: Date.now(),
      ...card,
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
export {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  listarCategoriasCards,
  popularCategorias,
  adicionarCard,
};
