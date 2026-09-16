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
      "Busco mi primera oportunidad profesional en inteligencia artificial, Machine Learning, datos o desarrollo de software, donde pueda aportar valor desde el primer día y seguir creciendo.",
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

export type SkillsCategory = {
  title: string;
  icon: string;
  items: string[];
};

export const skills = {
  categories: [
    {
      title: "AI & Data",
      icon: "ai",
      items: [
        "Python",
        "Machine Learning",
        "NLP",
        "LLMs",
        "Gemini",
        "XGBoost",
        "TensorFlow",
        "LSTM",
        "BETO",
        "LIME",
        "SHAP",
      ],
    },
    {
      title: "Software Development",
      icon: "code",
      items: ["JavaScript", "TypeScript", "React", "Vite", "Next.js", "FastAPI", "REST APIs", "HTML", "CSS"],
    },
    {
      title: "Databases",
      icon: "server",
      items: ["PostgreSQL", "SQL"],
    },
    {
      title: "Tools & DevOps",
      icon: "tool",
      items: ["Git", "GitHub", "GitHub Actions", "Docker", "Docker Compose", "Linux", "macOS", "Terminal"],
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
  metrics?: ProjectMetric[];
  github?: string;
  stack: string[];
  year: string;
};

export const projects: Project[] = [
  {
    name: "DetectIA",
    tag: "TFM · Detección de fake news",
    summary:
      "Sistema de detección de noticias falsas en español. Compara enfoques de Machine Learning y Deep Learning y genera explicaciones automáticas de sus predicciones.",
    details: [
      "Comparativa entre enfoques de ML (XGBoost con TF-IDF) y DL (LSTM, BETO pre-entrenado).",
      "Técnicas de explicabilidad con LIME y SHAP para interpretar las predicciones.",
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
      "Proyecto de IA y análisis de datos orientado a la optimización de rutas de vehículos para la recogida de residuos, trabajando con información de contenedores, flota disponible y restricciones reales de carreteras.",
    details: [
      "Optimización de rutas sobre redes viarias reales para distintas ciudades españolas, con criterios como el nivel de llenado de contenedores y las emisiones de CO2.",
      "Exploración y procesamiento de los datos de partida: contenedores, flota disponible y restricciones de carretera.",
      "Asistente de IA integrado y módulo propio de evaluación de soluciones.",
    ],
    stack: ["Python", "Data Analytics", "Optimización", "VRP", "Machine Learning / IA", "Datos de vehículos", "Datos de contenedores", "Data Engineering"],
    year: "2026",
  },
  {
    name: "Códigos convolucionales + Viterbi",
    tag: "TFG · Ingeniería Informática",
    summary:
      "Aplicación web de estudio para el análisis de códigos convolucionales y el algoritmo de Viterbi, con resultados visuales interactivos.",
    details: [
      "Visualización interactiva de codificadores convolucionales y decodificación por Viterbi.",
      "Backend con FastAPI y despliegue en Docker Compose.",
      "Repositorio de TFG disponible en GitHub.",
    ],
    stack: ["React", "Vite", "FastAPI", "PostgreSQL", "Docker Compose"],
    year: "2025",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlight?: boolean;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Prácticas de Máster — IA",
    company: "AI Talentum",
    period: "abr 2026 → jun 2026",
    location: "Salamanca · Remoto",
    highlight: true,
    description:
      "Optimización de rutas de recogida de residuos urbanos para distintas ciudades españolas: desde la exploración de los datos hasta la optimización sobre redes viarias reales, incorporando criterios como el nivel de llenado de los contenedores y las emisiones de CO2. Incluye un asistente de IA y un módulo propio de evaluación de soluciones.",
    tags: ["Optimización", "Datos", "IA"],
  },
  {
    role: "Colaborador de Investigación — Ciberseguridad e IA",
    company: "AIR Institute",
    period: "jul 2024 → sep 2024",
    location: "Salamanca",
    highlight: true,
    description:
      "Colaboración en el equipo de ciberseguridad del instituto de investigación, participando en el desarrollo de un SIEM con funcionalidades de Inteligencia Artificial.",
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
    location: "Salamanca · Eventos",
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

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
  note: string;
};

export const education: EducationItem[] = [
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

export type CourseItem = {
  title: string;
  institution: string;
  year: string;
};

export const courses: CourseItem[] = [
  { title: "Machine Learning con Python", institution: "UNIR", year: "2025" },
  { title: "Inteligencia Artificial Generativa", institution: "UNIR", year: "2026" },
  { title: "NLP con Python", institution: "UNIR", year: "2026" },
];

export type AICoreLink = {
  id: string;
  label: string;
  areas: string[];
  href: string;
  kind: "hub" | "project";
};

export type AICoreNode = AICoreLink;

export const aiCoreNodes: AICoreNode[] = [
  {
    id: "ai-ml",
    label: "AI & MACHINE LEARNING",
    areas: ["NLP", "LLMs", "XGBoost", "LSTM", "BETO", "LIME", "SHAP"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "data",
    label: "DATA",
    areas: ["Python", "Data Analytics", "Optimización", "Datos"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "software",
    label: "SOFTWARE",
    areas: ["React", "TypeScript", "Next.js", "FastAPI", "Docker"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "projects-hub",
    label: "PROJECTS",
    areas: ["DetectIA", "Rutas optimizadas", "Códigos conv."],
    href: "#proyectos",
    kind: "hub",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    areas: ["AI Talentum", "AIR Institute", "Hostelería"],
    href: "#experiencia",
    kind: "hub",
  },
  {
    id: "education",
    label: "EDUCATION",
    areas: ["Máster IA UNIR", "Grado USAL"],
    href: "#experiencia",
    kind: "hub",
  },
  {
    id: "skills",
    label: "SKILLS",
    areas: ["4 áreas", "3 idiomas", "Herramientas"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "detectia",
    label: "DetectIA",
    areas: ["XGBoost", "LSTM", "BETO", "LIME", "SHAP", "Gemini", "NLP"],
    href: "#proyectos",
    kind: "project",
  },
  {
    id: "rutas",
    label: "Rutas optimizadas",
    areas: ["Python", "Data", "VRP", "Datos contenedores"],
    href: "#proyectos",
    kind: "project",
  },
  {
    id: "viterbi",
    label: "Códigos conv. + Viterbi",
    areas: ["React", "Vite", "FastAPI", "PostgreSQL", "Docker"],
    href: "#proyectos",
    kind: "project",
  },
];

export const aiCore = {
  sectionIndex: "00",
  sectionTag: "explora_hugo_ai",
  title: "Explore Hugo AI",
  subtitle:
    "Una representación interactiva de mi experiencia, proyectos y conocimientos. Mueve el cursor por la nebulosa, pasa por los nodos y haz clic para explorar.",
  coreLabel: "HUGO AI",
  coreSubtext: "núcleo · hugarsan",
  canvasLabel: "Hugo AI · Representación neuronal interactiva",
  reducedMotionLabel:
    "Hugo AI · Representación visual estática (animaciones reducidas activadas)",
  fallbackLabel: "Hugo AI · Vista en texto (sin animación)",
};

export const chat = {
  name: "hugo_ai",
  displayName: "Hugo AI",
  greeting:
    "Hola, soy Hugo AI.\nPuedo contarte sobre la experiencia, proyectos, formación y tecnologías de Hugo.",
  suggestions: [
    "¿Quién es Hugo?",
    "¿Qué experiencia tiene en IA?",
    "¿Qué proyectos ha desarrollado?",
    "¿Qué tecnologías utiliza?",
    "¿Qué tipo de trabajo busca?",
  ],
  placeholders: [
    "¿Quién es Hugo?",
    "¿Qué proyectos ha hecho?",
    "¿Qué tecnologías usa?",
    "¿Qué formación tiene?",
    "¿Qué experiencia tiene en IA?",
    "¿Cómo contacto con Hugo?",
  ],
  fallback:
    "Hugo AI está en modo sin conexión. Pregúntame sobre su formación, experiencia, proyectos, tecnologías o contacto.",
};
