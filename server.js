import express from "express";
import routes from "./src/routes/categoryRoutes.js";

const categories = [
  {
    id: 1,
    category: "FRONTEND",
    categoryColor: "#6BD1FF",
    hoverColor: "#5BB8E5",
    bgColor: "#f0f8ff",
    cards: [
      {
        id: 1,
        title: "O que faz uma desenvolvedora front-end?",
        image: "/images/frontend-1.png",
        videoLink: "https://example.com/video1",
        description:
          "Neste vídeo, vamos falar sobre o que faz uma desenvolvedora front-end e quais são as principais tecnologias que ela utiliza.",
      },
      {
        id: 3,
        title: "Implementando UX no Front-end teste",
        image: "/images/frontend-3.png",
        videoLink: "https://example.com/video3",
        description:
          "Neste vídeo, vamos falar sobre a importância de implementar UX no front-end e como isso pode impactar a experiência do usuário.",
      },
    ],
  },
  {
    id: 2,
    category: "BACKEND",
    categoryColor: "#00C86F",
    hoverColor: "#E6A503",
    bgColor: "#fff8e1",
    cards: [
      {
        id: 4,
        title: "Árvores Binárias Teste",
        image: "/images/backend-1.png",
        videoLink: "https://example.com/video4",
        description:
          "Neste vídeo, vamos explorar as árvores binárias aplicadas no backend e como usá-las para otimizar dados.",
      },
      {
        id: 1737498404168,
        title: "Github CLI",
        image: "/images/backend-2.png",
        videoLink: "https://www.youtube.com/watch?v=6o6-bKOZOEY",
        description:
          "Nesse vídeo vamos aprender um pouco mais o que seria o GitHub CLI e quais são as suas vantagens!",
      },
    ],
  },
  {
    id: 3,
    category: "MOBILE",
    categoryColor: "#FFBA05",
    hoverColor: "#E6A503",
    bgColor: "#fff8e1",
    cards: [
      {
        id: 5,
        title: "Desenvolvimento Android",
        image: "/images/mobile-1.png",
        videoLink: "https://www.youtube.com/watch?v=fWscDFHKgw8",
        description:
          "Um episódio focado no desenvolvimento de aplicações Android. Paulo Silveira e Felipe Torres conversam sobre os primeiros passos para começar a desenvolver, as principais ferramentas, e mais!",
      },
      {
        id: 6,
        title: "The New React Native",
        image: "/images/mobile-2.png",
        videoLink: "https://www.youtube.com/watch?v=52El0EUI6D0",
        description:
          "React Native EU 2019: Emily Janzer - The New React Native.",
      },
    ],
  },
  {
    id: 4,
    category: "INOVAÇÃO",
    categoryColor: "#FF4C61",
    hoverColor: "#A883F8",
    bgColor: "#ae9c26",
    cards: [
      {
        id: 2,
        title: "Árvores Binárias",
        category: "INOVAÇÃO",
        image: "/images/frontend-2.png",
        videoLink: "https://example.com/video2",
        description:
          "Neste vídeo, vamos falar sobre árvores binárias e como elas são implementadas em JavaScript.",
      },
    ],
  },
  {
    id: 5,
    category: "GESTÃO",
    categoryColor: "#FF7A05",
    hoverColor: "#012c1f",
    bgColor: "#ae9c26",
    cards: [
      {
        id: 7,
        title: "Hello World com Flutter",
        category: "GESTÃO",
        image: "/images/mobile-3.png",
        videoLink: "https://www.youtube.com/watch?v=xSC8j3gl7xM",
        description:
          "Chegou a hora de criarmos nosso primeiro aplicativo com o Flutter e entender como fazer tudo funcionar! Esse é apenas um dos vídeos curtos do Alura+, disponíveis na plataforma da Alura.",
      },
    ],
  },
];

// Cria uma instância do Express
const app = express();
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando ");
});
