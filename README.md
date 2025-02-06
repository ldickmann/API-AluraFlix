# 📺 API AluraFlix

<div align="center">
  <h3>Desenvolvida por Lucas Elias Dickmann</h3>
</div>

API para gerenciar categorias de vídeos e cards no **AluraFlix**, com suporte para upload de imagens. A API permite criar, atualizar, deletar e listar categorias, além de adicionar e mover cards entre elas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework minimalista para criação de servidores.
- **MongoDB**: Banco de dados NoSQL para armazenamento das categorias e cards.
- **Mongoose**: ODM para interagir com o MongoDB.
- **Multer**: Middleware para upload de imagens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Cors**: Middleware para permitir requisições de diferentes origens.

---

## 📦 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/ldickmann/API-AluraFlix.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd API-AluraFlix
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

---

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável:
   ```env
   STRING_CONEXAO=sua_string_de_conexao_mongodb
   ```
   Substitua `sua_string_de_conexao_mongodb` pela string de conexão do seu MongoDB.

---

## ▶️ Uso

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em:

```
http://localhost:3000
```

---

## 🔗 Rotas da API

### 📂 Categorias

| Método     | Rota                                                             | Descrição                                                |
| ---------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| **GET**    | `/categorias`                                                    | Lista todas as categorias com seus cards.                |
| **POST**   | `/categorias`                                                    | Cria uma nova categoria.                                 |
| **PUT**    | `/categorias/:id`                                                | Atualiza uma categoria existente.                        |
| **POST**   | `/categorias/:categoryId/cards`                                  | Adiciona um card a uma categoria. (Com upload de imagem) |
| **PUT**    | `/categorias/:categoryId/cards/:cardId`                          | Atualiza um card existente.                              |
| **DELETE** | `/categorias/:categoryId/cards/:cardId`                          | Remove um card de uma categoria.                         |
| **PATCH**  | `/:sourceCategoryId/move-card/:cardId/to/:destinationCategoryId` | Move o card de categoria                                 |

---

## 📂 Estrutura do Projeto

```
.env
.gitignore
package.json
README.md
server.js
src/
  ├── config/
  │   ├── dbConfig.js
  ├── controllers/
  │   ├── categoryController.js
  ├── middlewares/
  │   ├── upload.js
  ├── models/
  │   ├── categories.js
  ├── routes/
  │   ├── categoryRoutes.js
  │   ├── index.js
uploads/
```

- **`server.js`**: Arquivo principal do servidor.
- **`dbConfig.js`**: Configuração da conexão com o banco de dados.
- **`categoryController.js`**: Controladores das rotas de categorias.
- **`upload.js`**: Middleware para upload de imagens.
- **`categories.js`**: Modelos e funções relacionadas às categorias.
- **`categoryRoutes.js`**: Rotas relacionadas às categorias.
- **`index.js`**: Arquivo de roteamento principal.

---

## 🤝 Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request para revisão.

---

## 📌 Desenvolvedor

Projeto desenvolvido por **Lucas Elias Dickmann**.

💼 [LinkedIn](https://www.linkedin.com/in/lucas-dickmann) | 📂 [GitHub](https://github.com/ldickmann)
