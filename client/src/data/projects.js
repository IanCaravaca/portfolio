import portfolioImage from "../assets/images/portfolio.png";
import tiendaImage from "../assets/images/tienda.png";
import climaImage from "../assets/images/clima.png";

const projects = [
  {
    id: 1,
    title: "Portfolio",
    description: "Mi portfolio personal",
    technologies: ["React", "CSS", "Vite"],
    image: portfolioImage,
    link: "https://...",
    github: "https://...",
  },
  {
    id: 2,
    title: "Tienda Online",
    description: "Aplicación de comercio electrónico",
    technologies: ["React", "Node.js", "MongoDB"],
    image: tiendaImage,
    link: "https://...",
    github: "https://...",
  },
  {
    id: 3,
    title: "App del clima",
    description: "Aplicación para consultar el clima",
    technologies: ["JavaScript", "CSS", "API"],
    image: climaImage,
    link: "https://...",
    github: "https://...",
  },
];

export default projects;
