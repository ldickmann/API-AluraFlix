import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function listarCategorias() {
  const db = conexao.db("DB-AluraFlix");
  const categorias = db.collection("categorias");
  const resultado = await categorias.find().toArray();
}

export async function criarCategoria(novaCategoria) {
  const db = conexao.db("DB-AluraFlix");
  const categorias = db.collection("categorias");
  const resultado = await categorias.insertOne(novaCategoria);
  return resultado;
}
