import { ObjectId } from "mongodb";
import connectDatabase from "../config/dbConfig.js";

const conexao = await connectDatabase(process.env.STRING_CONEXAO);

const listarCategorias = async () => {
  try {
    const db = await connectDatabase(); // Conecta ao banco
    const categories = await db.collection("categories").find().toArray();
    return categories;
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    throw new Error("Erro ao listar categorias.");
  }
};

const criarCategoria = async (novaCategoria) => {
  try {
    const db = await connectDatabase(); // Conecta ao banco
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

export { listarCategorias, criarCategoria };
