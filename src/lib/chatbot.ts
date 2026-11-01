import { chat, courses, education, experience, projects, site, skills } from "@/lib/data";

type Topic = {
  keywords: string[];
  build: () => string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const current = experience.find((e) => e.current);

const projectLines = () => projects.map((p) => `▹ ${p.name} (${p.year}): ${p.summary}`).join("\n");

const experienceLines = () => experience.map((e) => `▹ ${e.role} · ${e.company} (${e.period})`).join("\n");

const educationLines = () => education.map((e) => `▹ ${e.title} · ${e.institution} (${e.period})`).join("\n");

const courseLines = () => courses.map((c) => `▹ ${c.title} · ${c.institution} (${c.year})`).join("\n");

const skillLines = () => skills.categories.map((cat) => `▸ ${cat.title}: ${cat.items.join(", ")}`).join("\n");

const currentLine = () =>
  current ? `Desde octubre de 2026 trabaja como ${current.role} en ${current.company} (${current.location}). ${current.description}` : "";

// El orden importa: gana el primer tema cuyas palabras clave aparezcan en la pregunta.
const topics: Topic[] = [
  {
    keywords: ["stormbringer", "ahora", "actual", "donde trabaja", "empresa", "empleo"],
    build: currentLine,
  },
  {
    keywords: ["quien", "who", "es hugo", "presentate", "biograf"],
    build: () =>
      `${site.name} es ${site.title}, de ${site.location}. ${currentLine()}\n\nFormación:\n${educationLines()}`,
  },
  {
    keywords: ["proyecto", "project", "detectia", "fake", "viterbi", "convolucional", "rutas", "residuos", "tfg", "tfm"],
    build: () => `Estos son sus proyectos más relevantes:\n${projectLines()}\n\nMás en su GitHub: ${site.github}`,
  },
  {
    keywords: ["tecnolog", "stack", "lenguaje", "herramienta", "python", "react", "typescript", "docker", "fastapi", "kubernetes"],
    build: () => `Tecnologías que usa:\n${skillLines()}`,
  },
  {
    keywords: ["formacion", "master", "grado", "educacion", "estudi", "carrera", "unir", "usal", "curso", "nota"],
    build: () => `Formación:\n${educationLines()}\n\nCursos:\n${courseLines()}`,
  },
  {
    keywords: ["experiencia", "trabajo", "trayectoria", "profesional", "practica", "ia", "ai", "inteligencia", "machine"],
    build: () => `Trayectoria profesional:\n${experienceLines()}\n\n${currentLine()}`,
  },
  {
    keywords: ["contacto", "contact", "email", "correo", "linkedin", "github", "telefono", "whatsapp", "llamar"],
    build: () =>
      `Puedes contactar con Hugo por:\n· Email: ${site.email}\n· WhatsApp: ${site.whatsappNumber}\n· LinkedIn: ${site.linkedin}\n· GitHub: ${site.github}`,
  },
  {
    keywords: ["habilidad", "idioma", "ingles", "frances", "competencia", "skill"],
    build: () =>
      `Idiomas: ${skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}.\nCompetencias: ${skills.competencies.join(", ")}.`,
  },
];

export function getAnswer(raw: string): string {
  const q = norm(raw);
  if (!q.trim()) return chat.greeting;
  const topic = topics.find((t) => t.keywords.some((k) => q.includes(k)));
  return topic ? topic.build() : chat.fallback;
}
