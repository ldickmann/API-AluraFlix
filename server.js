import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./src/config/dbConfig.js";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

// Configurar CORS para permitir requisições do front-end local
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
