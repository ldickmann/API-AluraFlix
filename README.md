# API AluraFlix | Desenvolvida por Lucas Elias Dickmann

Esta é a API do **AluraFlix**, um serviço para gerenciar categorias de vídeos e cards, com suporte para upload de imagens. Essa API permite criar, atualizar, deletar e listar categorias, bem como adicionar e mover cards entre as categorias.

## Instalação

1. Clone o repositório:
   `git clone https://github.com/seu-usuario/api-aluraflix.git`

2. Navegue até o diretório do projeto:
   `cd api-aluraflix`

3. Instale as dependências:
   ```
   npm install
   # ou
   yarn install
   ```

### Configuração

1. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
   `STRING_CONEXAO=sua_string_de_conexao_mongodb`

Certifique-se de substituir `sua_string_de_conexao_mongodb` pela string de conexão do seu banco MongoDB.

### Uso

Para iniciar o servidor em modo de desenvolvimento, execute:
`npm run dev`

O servidor estará disponível em http://localhost:3000.

Rotas

Categorias

- GET /categorias: Lista todas as categorias com seus cards.
- POST /categorias: Cria uma nova categoria.
- PUT /categorias/:id: Atualiza uma categoria existente.
- POST /categorias/popular: Popula categorias com dados iniciais.
- POST /categorias/:categoryId/cards: Adiciona um card a uma categoria (com upload de imagem).
- PUT /categorias/:categoryId/cards/:cardId: Atualiza um card existente.
- DELETE /categorias/:categoryId/cards/:cardId: Remove um card de uma categoria.
- PUT /categorias/moverCard: Move um card de uma categoria para outra.

### Estrutura do Projeto

```
.env
.gitignore
package.json
README.md
server.js
src/
  config/
    dbConfig.js
  controllers/
    categoryController.js
  middlewares/
    upload.js
  models/
    categories.js
  routes/
    categoryRoutes.js
    index.js
uploads/
```

- `server.js`: Arquivo principal do servidor.
- `dbConfig.js`: Configuração da conexão com o banco de dados.
- `categoryController.js`: Controladores das rotas de categorias.
- `upload.js`: Middleware para upload de imagens.
- `categories.js`: Modelos e funções relacionadas às categorias.
- `categoryRoutes.js`: Rotas relacionadas às categorias.
- `index.js`: Arquivo de roteamento principal.

### Tecnologias Utilizadas

- Node.js: Ambiente de execução para JavaScript no servidor.
- Express: Framework para criar o servidor.
- MongoDB: Banco de dados NoSQL para armazenamento das categorias e cards.
- Mongoose: ORM para interagir com o MongoDB.
- Multer: Middleware para upload de arquivos.
- Dotenv: Carregamento das variáveis de ambiente.
- Cors: Middleware para permitir requisições de diferentes origens.

### Como Contribuir

- Fork este repositório.
- Crie uma nova branch para suas alterações (git checkout -b minha-feature).
- Faça o commit das suas alterações (git commit -am 'Adiciona nova feature').
- Envie sua branch para o repositório remoto (git push origin minha-feature).
- Abra um Pull Request.
