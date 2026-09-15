export const site = {
  name: "Hugo García Sánchez",
  username: "hugarsan",
  title: "Ingeniero Informático · Inteligencia Artificial",
  location: "Salamanca, España",
  email: "hugarsan@gmail.com",
  phone: "+34 654 839 951",
  github: "https://github.com/hugarsan",
  linkedin: "https://www.linkedin.com/in/hugo-garcía-sánchez-92070731b",
};

export const hero = {
  badge: "Disponible para nuevas oportunidades",
  roles: [
    "Ingeniero Informático",
    "Inteligencia Artificial",
    "Full-Stack Developer",
    "IA Aplicada · NLP",
  ],
  description:
    "Ingeniero Informático por la Universidad de Salamanca y Máster en Inteligencia Artificial por UNIR. Desarrollo aplicaciones completas de principio a fin: desde la arquitectura web hasta los modelos de IA.",
};

export const about = {
  paragraphs: [
    "Ingeniero Informático por la Universidad de Salamanca y Máster en Inteligencia Artificial por la UNIR. Formación sólida en desarrollo de software, arquitecturas web (React, FastAPI, PostgreSQL, Docker) y modelos de IA aplicada: procesamiento del lenguaje natural y LLMs.",
    "Experiencia práctica desarrollando aplicaciones completas de principio a fin, desde el diseño hasta el despliegue. Proactivo, con capacidad de aprendizaje autónomo y buena organización, buscando aportar en un equipo técnico mientras sigo creciendo.",
  ],
  facts: [
    { label: "Ubicación", value: "Salamanca, España" },
    { label: "Edad", value: "23 años" },
    { label: "Grado (USAL)", value: "Nota media 8,19" },
    { label: "Máster IA (UNIR)", value: "En curso · 2026" },
    { label: "Disponibilidad", value: "Abierto a nuevos retos" },
  ],
  stats: [
    { value: "2", label: "TFG y TFM" },
    { value: "8,19", label: "Nota media" },
    { value: "3", label: "Idiomas" },
    { value: "2026", label: "Máster IA" },
  ],
};

export const skills = {
  categories: [
    {
      title: "Frontend",
      icon: "code",
      items: ["React", "Vite", "JavaScript", "HTML / CSS"],
    },
    {
      title: "Backend & Datos",
      icon: "server",
      items: ["FastAPI", "PostgreSQL", "APIs REST", "Docker Compose"],
    },
    {
      title: "IA y ML",
      icon: "ai",
      items: ["Python", "NLP", "LLMs", "BETO", "Gemini API", "Análisis de datos"],
    },
    {
      title: "Herramientas",
      icon: "tool",
      items: ["Docker", "Git / GitHub", "Linux", "macOS", "Terminal", "Render"],
    },
  ],
  competencies: [
    "Trabajo en equipo",
    "Adaptabilidad",
    "Resolución de problemas",
    "Responsabilidad",
    "Trabajo bajo presión",
  ],
  languages: [
    { name: "Español", level: "Nativo", pct: 100 },
    { name: "Inglés", level: "Intermedio-alto", pct: 75 },
    { name: "Francés", level: "Básico", pct: 25 },
  ],
};

export const projects = [
  {
    name: "DetectIA",
    tag: "TFM · Detección de fake news",
    summary:
      "Detección de noticias falsas en español mediante clasificación con BETO y justificaciones generadas con la API de Gemini.",
    details: [
      "Clasificación de textos en español con BETO sobre datos reales.",
      "Justificaciones explicativas generadas con la API de Gemini.",
      "Evaluación de su fiabilidad con simulabilidad contrafactual y verificación mediante NLI.",
    ],
    stack: ["Python", "BETO", "Gemini API", "NLP", "NLI"],
    year: "2026",
  },
  {
    name: "Códigos conv. + Viterbi",
    tag: "TFG · Aplicación web completa",
    summary:
      "Aplicación web para codificar y decodificar mensajes con códigos convolucionales y el algoritmo de Viterbi.",
    details: [
      "Arquitectura completa en Docker Compose: React/Vite, FastAPI y PostgreSQL.",
      "Desarrollada de principio a fin: diseño, backend, frontend y despliegue.",
      "Desplegada en Render con contenedores Docker.",
    ],
    stack: ["React", "Vite", "FastAPI", "PostgreSQL", "Docker Compose", "Render"],
    year: "2025",
  },
];

export const experience = [
  {
    role: "Prácticas de Máster — IA",
    company: "AI Talentum",
    period: "abr 2026 → jun 2026",
    location: "Murcia",
    highlight: true,
    description:
      "Optimización de rutas de recogida de residuos urbanos para distintas ciudades españolas: desde la exploración inicial de los datos hasta la optimización sobre redes viarias reales, incorporando criterios como el nivel de llenado de los contenedores y las emisiones de CO2. Incluye un asistente de IA y un módulo propio de evaluación de soluciones.",
    tags: ["Optimización", "Datos", "IA"],
  },
  {
    role: "Investigador de IA y Analista de Ciberseguridad",
    company: "AIR Institute",
    period: "jul 2024 → sep 2024",
    location: "Salamanca",
    highlight: true,
    description:
      "Colaboración en el equipo de ciberseguridad en el desarrollo de un SIEM (Sistema de Gestión de Información y Eventos de Seguridad) con capacidades de Inteligencia Artificial.",
    tags: ["Ciberseguridad", "SIEM", "IA"],
  },
  {
    role: "Camarero — Eventos",
    company: "Hospes Palacio de San Esteban",
    period: "may 2025 → actualidad",
    location: "Salamanca",
    highlight: false,
    description:
      "Servicio en hotel 5 estrellas, combinado con la actividad profesional: adaptabilidad, ritmo y trabajo en equipo en eventos de alto nivel.",
    tags: [],
  },
  {
    role: "Camarero — Eventos",
    company: "NH Hoteles",
    period: "sep 2024 → actualidad",
    location: "Salamanca",
    highlight: false,
    description:
      "Servicio de eventos (bodas, comuniones y eventos corporativos) trabajando bajo presión y en equipo.",
    tags: [],
  },
  {
    role: "Camarero — Eventos",
    company: "Hacienda Zorita (Hotel 5★ Superior)",
    period: "abr 2022 → feb 2025",
    location: "Valverdón, Salamanca",
    highlight: false,
    description:
      "Años de experiencia en logística y servicio de eventos, compatibilizando el trabajo con la carrera universitaria.",
    tags: [],
  },
];

export const education = [
  {
    title: "Máster en Inteligencia Artificial",
    institution: "UNIR — Universidad Internacional de La Rioja",
    period: "sep 2025 → jul 2026",
    note: "En curso",
  },
  {
    title: "Grado en Ingeniería Informática",
    institution: "Universidad de Salamanca (USAL)",
    period: "sep 2021 → jun 2026",
    note: "Nota media 8,19",
  },
];

export const courses = [
  "IA Generativa para la Creación de Aplicaciones · 2024",
  "Ciberinteligencia y Ciberseguridad · USAL · 2023",
  "Programación en Python · USAL · 2023",
  "Ciberseguridad para Empresas · 2023",
];