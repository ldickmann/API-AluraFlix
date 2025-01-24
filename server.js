import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./src/config/dbConfig.js";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let db;
const startServer = async () => {
  try {
    db = await connectDatabase();

    app.use("/", routes); // Use o router geral

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
