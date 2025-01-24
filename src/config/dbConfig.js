import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  let mongoClient;
  try {
    mongoClient = new MongoClient(process.env.STRING_CONEXAO);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    return mongoClient.db();
  } catch (erro) {
    console.error("Falha na conexão com o banco!", erro);
    process.exit(1);
  }
};

export default connectDatabase;
