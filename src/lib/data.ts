export const site = {
  name: "Hugo García Sánchez",
  username: "hugarsan",
  title: "Ingeniero Informático · AI Engineer Junior",
  location: "Salamanca, España",
  email: "hugarsan@gmail.com",
  github: "https://github.com/hugarsan",
  linkedin: "https://www.linkedin.com/in/hugo-garcía-sánchez-92070731b",
  cv: "/cv/CV_Hugo_Garcia_Sanchez_Actualizado.pdf",
};

export const hero = {
  badge: "Disponible para nuevas oportunidades",
  roleTitle: "Ingeniero Informático · Máster en Inteligencia Artificial",
  description:
    "Graduado en Ingeniería Informática por la Universidad de Salamanca y Máster en Inteligencia Artificial por UNIR. Actualmente busco mi primera oportunidad profesional en IA, datos o desarrollo de software.",
};

export const about = {
  paragraphs: [
    "Formación académica en desarrollo de software, arquitecturas web (React, FastAPI, PostgreSQL, Docker) y modelos de IA aplicada: procesamiento del lenguaje natural y LLMs. Experiencia práctica construyendo aplicaciones completas de principio a fin, desde el diseño hasta el despliegue.",
    "Proactivo, autónomo y bien organizado, con capacidad de aprendizaje continuo. Mi prioridad profesional está en la inteligencia artificial, el Machine Learning y los datos, y estoy igualmente cómodo en desarrollo de software.",
  ],
  facts: [
    { label: "Ubicación", value: "Salamanca, España" },
    { label: "Edad", value: "23 años" },
    { label: "Grado (USAL)", value: "Nota media 8,19" },
    { label: "Máster IA (UNIR)", value: "2025–2026 · Completado" },
    { label: "Disponibilidad", value: "Abierto a nuevos retos" },
  ],
  stats: [
    { value: "3", label: "Proyectos finales" },
    { value: "8,19", label: "Nota media" },
    { value: "3", label: "Idiomas" },
    { value: "2026", label: "Máster IA" },
  ],
  roles: {
    intro:
      "Busco mi primera oportunidad profesional en Inteligencia Artificial, Machine Learning, Data y desarrollo de software, donde pueda aplicar mis conocimientos y seguir creciendo profesionalmente.",
    areas: [
      "AI Engineer",
      "Machine Learning",
      "Data Science",
      "Data Analytics",
      "Data Engineering",
      "Python",
      "Software Development",
    ],
  },
};

export const skills = {
  categories: [
    {
      title: "AI & Data",
      icon: "ai",
      items: [
        "Python",
        "XGBoost",
        "TF-IDF",
        "LSTM",
        "NLP",
        "LLMs",
        "BETO",
        "Gemini",
        "LIME",
        "SHAP",
      ],
    },
    {
      title: "Software Development",
      icon: "code",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Vite",
        "Next.js",
        "FastAPI",
        "REST APIs",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Databases",
      icon: "server",
      items: ["PostgreSQL", "SQL"],
    },
    {
      title: "Tools & DevOps",
      icon: "tool",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Docker Compose",
        "GitHub Actions",
        "Linux",
        "macOS",
        "Terminal",
      ],
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

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  name: string;
  tag: string;
  summary: string;
  details: string[];
  stack: string[];
  year: string;
  metrics?: ProjectMetric[];
  github?: string;
};

export const projects: Project[] = [
  {
    name: "DetectIA",
    tag: "TFM · Detección de fake news",
    summary:
      "Sistema de detección de noticias falsas en español. Compara enfoques de Machine Learning y Deep Learning y genera explicaciones automáticas de sus predicciones.",
    details: [
      "Comparativa entre enfoques de Machine Learning (XGBoost con TF-IDF) y Deep Learning (LSTM, BETO pre-entrenado).",
      "Incorporación de técnicas de explicabilidad con LIME y SHAP para interpretar las predicciones.",
      "Justificaciones generadas con Gemini y evaluación de su fiabilidad mediante simulabilidad contrafactual y verificación con NLI.",
    ],
    metrics: [
      { value: "60K+", label: "noticias" },
      { value: "90,64%", label: "Accuracy" },
      { value: "91,83%", label: "F1" },
    ],
    stack: ["Python", "XGBoost", "TF-IDF", "LSTM", "BETO", "LIME", "SHAP", "Gemini", "NLP"],
    year: "2026",
  },
  {
    name: "Optimización de rutas de recogida de residuos",
    tag: "AI Talentum · Prácticas de Máster",
    summary:
      "Proyecto de IA y análisis de datos orientado a la optimización de rutas de vehículos para la recogida de residuos, trabajando con información de contenedores, flota disponible, nivel de llenado y restricciones reales de carreteras.",
    details: [
      "Optimización de rutas sobre redes viarias reales para distintas ciudades españolas, con criterios como el nivel de llenado de contenedores y las emisiones de CO2.",
      "Exploración y procesamiento de los datos de partida: contenedores, flota disponible y restricciones de carretera.",
      "Asistente de IA integrado y módulo propio de evaluación de soluciones.",
    ],
    stack: [
      "Python",
      "Data Analytics",
      "Optimización",
      "VRP",
      "Machine Learning / IA",
      "Datos de vehículos",
      "Datos de contenedores",
    ],
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
      "Colaboración en el equipo de ciberseguridad del instituto de investigación, participando en el desarrollo de un SIEM (Sistema de Gestión de Información y Eventos de Seguridad) con funcionalidades de Inteligencia Artificial.",
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
    period: "2025–2026",
    note: "Completado",
  },
  {
    title: "Grado en Ingeniería Informática",
    institution: "Universidad de Salamanca",
    period: "2021–2026",
    note: "Nota media: 8,19",
  },
];

export const courses = [
  "IA Generativa para la Creación de Aplicaciones · 2024",
  "Ciberinteligencia y Ciberseguridad · USAL · 2023",
  "Programación en Python · USAL · 2023",
  "Ciberseguridad para Empresas · 2023",
];