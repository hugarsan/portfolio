export const site = {
  name: "Hugo García Sánchez",
  username: "hugarsan",
  title: "Ingeniero Informático · Junior AI Engineer",
  location: "Salamanca · Madrid, España",
  email: "hugarsan@gmail.com",
  github: "https://github.com/hugarsan",
  linkedin: "https://www.linkedin.com/in/hugo-garcía-sánchez-92070731b",
  cv: "/cv/CV_Hugo_Garcia_Sanchez_Actualizado.pdf",
  whatsappHref: "https://wa.me/34654839951?text=Hola%20Hugo%2C%20me%20interesa%20trabajar%20contigo",
  whatsappLabel: "WhatsApp",
  whatsappNumber: "654 839 951",
};

export const hero = {
  badge: "Junior AI Engineer en Stormbringer · desde oct 2026",
  roleTitle: "Junior AI Engineer",
  roles: [
    "Junior AI Engineer @ Stormbringer",
    "Ingeniero Informático · USAL",
    "Máster en Inteligencia Artificial · UNIR",
    "LLMs · agentes · datos",
  ],
  description:
    "Desde octubre de 2026 trabajo como Junior AI Engineer en Stormbringer, construyendo una plataforma soberana de inteligencia de decisión. Graduado en Ingeniería Informática por la Universidad de Salamanca y Máster en Inteligencia Artificial por UNIR.",
};

export const about = {
  manifesto:
    "Soy ingeniero informático y máster en IA. Construyo sistemas de inteligencia artificial que se pueden explicar, desde los datos hasta el despliegue, y hoy lo hago en Stormbringer.",
  paragraphs: [
    "Formación académica en desarrollo de software, arquitecturas web (React, FastAPI, PostgreSQL, Docker) y modelos de IA aplicada: procesamiento del lenguaje natural y LLMs. Experiencia práctica construyendo aplicaciones completas de principio a fin, desde el diseño hasta el despliegue.",
    "Proactivo, autónomo y bien organizado, con capacidad de aprendizaje continuo. Mi prioridad profesional está en la inteligencia artificial, el Machine Learning y los datos, y estoy igualmente cómodo en desarrollo de software.",
  ],
  facts: [
    { label: "Ubicación", value: "Salamanca · Madrid" },
    { label: "Edad", value: "23 años" },
    { label: "Puesto actual", value: "Junior AI Engineer · Stormbringer" },
    { label: "Grado (USAL)", value: "Nota media 8,19" },
    { label: "Máster IA (UNIR)", value: "2025–2026 · Completado" },
  ],
  stats: [
    { value: "3", label: "Proyectos finales" },
    { value: "8,19", label: "Nota media" },
    { value: "3", label: "Idiomas" },
    { value: "2026", label: "Máster IA" },
  ],
  roles: {
    intro:
      "Desde octubre de 2026 soy Junior AI Engineer en Stormbringer, donde trabajo en una plataforma soberana de inteligencia de decisión: agentes con LLMs, datos y despliegue en Kubernetes.",
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
        "Agentes",
        "Fine-tuning",
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
      items: ["Git", "GitHub", "GitHub Actions", "Docker", "Docker Compose", "Kubernetes", "Linux", "macOS", "Terminal"],
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
  /** Ilustración que acompaña al proyecto en la tarjeta. */
  visual: "classifier" | "routes" | "trellis";
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
    visual: "classifier",
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
    visual: "routes",
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
    visual: "trellis",
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
  current?: boolean;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Junior AI Engineer",
    company: "Stormbringer",
    period: "oct 2026 → actualidad",
    location: "Madrid · Híbrido",
    highlight: true,
    current: true,
    description:
      "Desarrollo de una plataforma soberana de IA para la toma de decisiones (Sovereign Decision Intelligence): agentes basados en LLMs, capa de datos, fine-tuning de modelos y despliegue en Kubernetes, trabajando por iteraciones con verificación de extremo a extremo.",
    tags: ["LLMs", "Agentes", "Fine-tuning", "Kubernetes", "Python", "React"],
  },
  {
    role: "AI Engineer — Prácticas de Máster",
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
    period: "may 2025 → sep 2026",
    location: "Salamanca",
    highlight: false,
    description:
      "Servicio en hotel 5 estrellas, combinado con la actividad profesional: adaptabilidad, ritmo y trabajo en equipo en eventos de alto nivel.",
    tags: [],
  },
  {
    role: "Camarero — Eventos",
    company: "NH Hoteles",
    period: "sep 2024 → sep 2026",
    location: "Salamanca · Eventos",
    highlight: false,
    description:
      "Servicio de eventos (bodas, comuniones y eventos corporativos) trabajando bajo presión y en equipo.",
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

export type AICoreNode = {
  id: string;
  label: string;
  summary: string;
  areas: string[];
  href: string;
  kind: "hub" | "project" | "now";
  /** Ids de los hubs con los que se conecta, además del núcleo. */
  links?: string[];
};

// El orden de los hubs fija su posición en la elipse, empezando arriba y en sentido horario.
export const aiCoreNodes: AICoreNode[] = [
  {
    id: "stormbringer",
    label: "STORMBRINGER",
    summary:
      "Mi trabajo actual (desde oct 2026, Madrid · híbrido): Junior AI Engineer en una plataforma soberana de inteligencia de decisión, con agentes LLM, datos y Kubernetes.",
    areas: ["LLMs", "Agentes", "Fine-tuning", "Kubernetes", "Python", "React"],
    href: "#experiencia",
    kind: "now",
    links: ["ai-ml", "data", "software"],
  },
  {
    id: "ai-ml",
    label: "AI & MACHINE LEARNING",
    summary: "NLP, LLMs y modelos clásicos y profundos, con foco en que las predicciones se puedan explicar.",
    areas: ["NLP", "LLMs", "XGBoost", "LSTM", "BETO", "LIME", "SHAP"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "data",
    label: "DATA",
    summary: "Exploración, limpieza y modelado de datos reales para optimizar decisiones.",
    areas: ["Python", "Data Analytics", "Optimización", "SQL"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "software",
    label: "SOFTWARE",
    summary: "Aplicaciones completas de principio a fin: frontend, API, base de datos y despliegue.",
    areas: ["React", "TypeScript", "Next.js", "FastAPI", "Docker"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "projects-hub",
    label: "PROJECTS",
    summary: "Tres proyectos finales: detección de fake news, rutas de recogida y códigos convolucionales.",
    areas: ["DetectIA", "Rutas optimizadas", "Códigos conv."],
    href: "#proyectos",
    kind: "hub",
  },
  {
    id: "skills",
    label: "SKILLS",
    summary: "Cuatro áreas técnicas, tres idiomas y las competencias de quien ha trabajado bajo presión.",
    areas: ["4 áreas", "3 idiomas", "Trabajo en equipo"],
    href: "#habilidades",
    kind: "hub",
  },
  {
    id: "education",
    label: "EDUCATION",
    summary: "Grado en Ingeniería Informática (USAL, nota media 8,19) y Máster en Inteligencia Artificial (UNIR).",
    areas: ["Máster IA UNIR", "Grado USAL", "Cursos UNIR"],
    href: "#experiencia",
    kind: "hub",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    summary: "De la investigación en ciberseguridad con IA a las prácticas como AI Engineer y mi puesto actual.",
    areas: ["Stormbringer", "AI Talentum", "AIR Institute"],
    href: "#experiencia",
    kind: "hub",
  },
  {
    id: "detectia",
    label: "DetectIA",
    summary: "TFM: detección de noticias falsas en español con ML, DL y explicaciones generadas con Gemini. 90,64 % de accuracy.",
    areas: ["XGBoost", "LSTM", "BETO", "LIME", "SHAP", "Gemini"],
    href: "#proyectos",
    kind: "project",
    links: ["ai-ml"],
  },
  {
    id: "rutas",
    label: "Rutas optimizadas",
    summary: "Prácticas en AI Talentum: rutas de recogida de residuos sobre redes viarias reales, con llenado y CO2.",
    areas: ["Python", "VRP", "Optimización", "Datos"],
    href: "#proyectos",
    kind: "project",
    links: ["data"],
  },
  {
    id: "viterbi",
    label: "Viterbi",
    summary: "TFG: aplicación web para estudiar códigos convolucionales y el algoritmo de Viterbi.",
    areas: ["React", "Vite", "FastAPI", "PostgreSQL", "Docker"],
    href: "#proyectos",
    kind: "project",
    links: ["software"],
  },
];

export const aiCore = {
  sectionIndex: "05",
  sectionTag: "explora_hugo_ai",
  title: "Explore Hugo AI",
  subtitle:
    "Un mapa vivo de lo que sé hacer y de dónde lo he aprendido. Toca un nodo para ver sus conexiones o pregúntale directamente a Hugo AI.",
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
    "¿Dónde trabaja ahora?",
    "¿Quién es Hugo?",
    "¿Qué experiencia tiene en IA?",
    "¿Qué proyectos ha desarrollado?",
    "¿Qué tecnologías utiliza?",
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
    "No tengo respuesta para eso. Pregúntame por su trabajo en Stormbringer, su formación, experiencia, proyectos, tecnologías o contacto.",
};
