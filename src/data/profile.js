export const profile = {
  name: "Isaac Tiguilá Véliz",
  title: "Desarrollador Full Stack & Estudiante de Informática",
  tagline: "Apasionado a las computadoras y al desarrollo de software",
  welcome:
    "Bienvenido a mi portafolio. Aquí encontrarás una mirada clara a mi trabajo como desarrollador junior y las cosas que me apacionan en el mundo de la tecnología. Explora mis proyectos, habilidades y certificaciones.",
  age: "19",
  yearsCoding: "2+",
  studying: true,
  studyingLabel: "Perito en Informática",
  avatar: "/media/Isaac.jpg",
  resumeUrl: "/media/Isaac_Tiguila_CV.pdf",
  email: "isasctiguila@gmail.com",
  phone: "",
  location: "Guatemala",
  social: {
    github: "https://github.com/Sac1606",
    linkedin: "https://www.linkedin.com/in/isaac-tiguil%C3%A1-b36b54374/",
  },
  about:
    "Soy Isaac Tiguilá Véliz, desarrollador full stack junior con interes en el hardware y el desarrollo de software. Me gusta construir productos usables, con interfaces claras y una base técnica sólida. Mi meta es seguir creciendo en el desarrollo web, móvil y en soluciones que integren software con el mundo físico.",
  capabilities: [
    "Desarrollo de interfaces con React",
    "APIs y lógica de negocio con .NET y stack MERN",
    "Aplicaciones móviles con React Native",
  ],
  services: [
    {
      id: "fullstack",
      title: "Desarrollo Web Full Stack",
      command: "pnpm dev --fullstack",
      description:
        "Diseño e implementación de aplicaciones web modernas, rápidas y adaptables utilizando React, Tailwind CSS, Node.js / Express y .NET Core.",
      tags: ["React", "Tailwind", ".NET", "MERN", "REST API"],
    },
    {
      id: "mobile",
      title: "Desarrollo Móvil Multiplataforma",
      command: "npx react-native start",
      description:
        "Creación de prototipos y aplicaciones móviles nativas/multiplataforma con React Native, enfocadas en rendimiento e interfaz intuitiva.",
      tags: ["React Native", "Expo", "Mobile UI", "APIs"],
    },
    {
      id: "backend-db",
      title: "Backend APIs & Arquitectura DB",
      command: "dotnet run --api",
      description:
        "Desarrollo de servicios backend robustos, autenticación segura y gestión de bases de datos relacionales (SQL) y no relacionales (MongoDB).",
      tags: [".NET", "MongoDB", "Express", "C#", "Node.js"],
    },
  ],
  certificates: [
    {
      id: "perito-informatica",
      title: "Perito en Informática",
      issuer: "Centro Educativo Técnico Laboral Kinal",
      period: "2024 — 2026 (En Curso)",
      status: "En Progreso",
      description:
        "Formación integral en desarrollo de software, arquitectura de computadoras, bases de datos SQL y lógica de programación.",
      skills: ["Java / C#", "Bases de Datos SQL", "Hardware & Redes", "Lógica de Software"],
      icon: "academic",
      image: "/media/cert-perito.jpg",
    },
    {
      id: "cisco-ccna",
      title: "CCNA (Cisco Certified Network Associate)",
      issuer: "Cisco Networking Academy",
      period: "2024",
      status: "Completado",
      description:
        "Certificación en conceptos fundamentales de redes, enrutamiento, conmutación (switching), direccionamiento IP, seguridad de red y conectividad.",
      skills: ["Redes & Routing", "Switching", "TCP/IP & Subnetting", "Seguridad de Red"],
      icon: "code",
      image: "/media/cert-ccna.jpg",
    },
    {
      id: "cisco-it-essentials",
      title: "IT Essentials (PC Hardware & Software)",
      issuer: "Cisco Networking Academy",
      period: "2024",
      status: "Completado",
      description:
        "Formación práctica en arquitectura de hardware de computadoras, ensamblaje, diagnóstico de fallas, sistemas operativos y mantenimiento de equipos.",
      skills: ["Hardware de PC", "Ensamblaje & Mantenimiento", "Sistemas Operativos", "Diagnóstico de Fallas"],
      icon: "cpu",
      image: "/media/cert-it-essentials.jpg",
    },
  ],
  skills: [
    { name: "React", level: 60 },
    { name: "JavaScript", level: 65 },
    { name: "HTML / CSS", level: 75 },
    { name: "Tailwind CSS", level: 65 },
    { name: ".NET", level: 55 },
    { name: "Stack MERN", level: 65 },
    { name: "React Native", level: 60 },
    { name: "Python", level: 60 },
    { name: "Java", level: 65 },
  ],
  skillCategories: [
    {
      category: "Frontend Web",
      command: "ls skills/frontend/",
      skills: [
        { name: "React.js", level: 60 },
        { name: "JavaScript (ES6+)", level: 65 },
        { name: "HTML5 / CSS3", level: 75 },
        { name: "Tailwind CSS", level: 65 },
      ],
    },
    {
      category: "Backend & APIs",
      command: "ls skills/backend/",
      skills: [
        { name: ".NET Core / C#", level: 55 },
        { name: "Node.js & Express", level: 75 },
        { name: "Stack MERN (MongoDB)", level: 75 },
        { name: "Python", level: 60 },
      ],
    },
    {
      category: "Lenguajes",
      command: "ls skills/languages/",
      skills: [
        { name: "JavaScript (ES6+)", level: 82 },
        { name: "C# / .NET", level: 70 },
        { name: "Java", level: 65 },
        { name: "Python", level: 70 },
      ],
    },
    {
      category: "Bases de Datos",
      command: "ls skills/databases/",
      skills: [
        { name: "MongoDB", level: 75 },
        { name: "MySQL", level: 70 },
        { name: "PostgreSQL", level: 65 },
      ],
    },
    {
      category: "Móvil & Multiplataforma",
      command: "ls skills/mobile/",
      skills: [
        { name: "React Native / Expo", level: 65 },
      ],
    },
    {
      category: "Herramientas & Entornos",
      command: "ls skills/tools/",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Vite & Build Tools", level: 80 },
      ],
    },
  ],
  technologies: [
    { name: "React", icon: "SiReact" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "HTML5", icon: "SiHtml5" },
    { name: "CSS3", icon: "SiCss" },
    { name: "Tailwind", icon: "SiTailwindcss" },
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "Express", icon: "SiExpress" },
    { name: ".NET", icon: "SiDotnet" },
    { name: "React Native", icon: "SiReact" },
    { name: "Python", icon: "SiPython" },
    { name: "Java", icon: "SiJava" },
    { name: "MySQL", icon: "SiMysql" },
    { name: "PostgreSQL", icon: "SiPostgresql" },
    { name: "GitHub", icon: "SiGithub" },
    { name: "Vite", icon: "SiVite" },
  ],
  education: [
    {
      title: "Perito en Informática",
      place: "Centro Educativo Técnico Laboral Kinal",
      period: "En curso — 2024 - 2026",
      description:
        "Formación enfocada en desarrollo web, aplicaciones y prácticas con tecnologías modernas del ecosistema full stack.",
    },
    {
      title: "Basicos",
      place: "Centro Educativo Rotario Benito Juárez",
      period: "2021 - 2023",
      description:
        "Formación academica de el nivel de educación basica, con enfoque en ciencias y matematicas.",
    },
  ],
  experience: [
    {
      title: "Proyectos académicos y de equipo",
      place: "Gestor de Restaurantes, Sistema Bancario, IA Sentinel",
      period: "2026",
      description:
        "Participación en proyectos de grupo e individuales aplicando React, .NET, MERN, React Native y Python.",
    },
    {
      title: "Proyectos web personales",
      place: "HangManGame, El mundo de Fútbol",
      period: "2025",
      description:
        "Sitios y juegos desarrollados con HTML, CSS y JavaScript para reforzar fundamentos y desplegar en GitHub Pages.",
    },
  ],
}
