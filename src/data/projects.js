import imgRestaurantes from "../assets/img/projects/gestor-restaurantes.png"
import imgBanco from "../assets/img/projects/gestor-banco.png"
import imgSentinel from "../assets/img/projects/ia-sentinel.png"
import imgHangman from "../assets/img/projects/hangman.png"
import imgFutbol from "../assets/img/projects/mundo-futbol.png"


export const projects = [
  {
    id: "gestor-restaurantes",
    title: "Gestor de Restaurantes",
    featured: true,
    description:
      "Proyecto desarrollado para resolver las necesidades de un gestor de restaurantes: pedir en tus lugares favoritos, agendar reservaciones y más.",
    skillsLearned:
      "Puso en práctica lo aprendido durante 2026 con tecnologías como .NET, React, Stack MERN y React Native.",
    tech: [".NET", "React", "MERN", "React Native"],
    repoUrl: "https://github.com/orgs/Grupo-1-Gestion-de-Restaurantes/repositories",
    demoUrl: "https://clientusergestionrestaurantes.web.app/",
    image: imgRestaurantes,
  },
  {
    id: "gestor-banco",
    title: "Gestor de Banco",
    featured: true,
    description:
      "Programa simulado para un banco: apertura de cuenta, transferencias, pagos y otras operaciones (todo simulado; no se maneja dinero real).",
    skillsLearned:
      "Puso en práctica lo aprendido durante 2026 con tecnologías como .NET, React, Stack MERN y React Native.",
    tech: [".NET", "React", "MERN", "React Native"],
    repoUrl: "https://github.com/orgs/Grupo-1-Sistema-Bancario/repositories",
    demoUrl: "https://client-sistemabancario.onrender.com/",
    image: imgBanco,
  },
  {
    id: "ia-sentinel",
    title: "IA Sentinel",
    featured: true,
    description:
      "Propuesta de trabajo final con visión computacional para analizar al estudiante de la institución, reconocerlo y verificar si cuenta con el uniforme completo.",
    skillsLearned:
      "Fue un reto en el que se aprendió Python, OpenCV, CUDA, YOLO y herramientas de visión por computadora.",
    tech: ["Python", "OpenCV", "CUDA", "YOLO"],
    repoUrl: "https://github.com/orgs/Grupo1-AISentinel/repositories",
    demoUrl: "",
    image: imgSentinel,
  },
  {
    id: "hangman",
    title: "HangManGame",
    featured: false,
    description:
      "Juego simple de ahorcado para practicar habilidades de HTML, CSS y JavaScript.",
    skillsLearned:
      "Puso en práctica lo aprendido durante 2025: HTML, CSS y JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/Sac1606/HangManGame",
    demoUrl: "https://sac1606.github.io/HangManGame/",
    image: imgHangman,
  },
  {
    id: "mundo-futbol",
    title: "El mundo de Fútbol",
    featured: false,
    description:
      "Página de venta de camisas de fútbol de todo el planeta, creada para practicar HTML y CSS y reflejar una de mis pasiones: el fútbol.",
    skillsLearned:
      "Puso en práctica lo aprendido durante 2025: HTML y CSS.",
    tech: ["HTML", "CSS"],
    repoUrl: "https://github.com/Sac1606/El-mundo-de-Futbol",
    demoUrl: "https://sac1606.github.io/El-mundo-de-Futbol/",
    image: imgFutbol,
  },
]
