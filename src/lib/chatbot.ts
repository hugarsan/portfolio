import { chat, courses, education, experience, projects, site, skills } from "@/lib/data";

type Face = "site" | "hero" | "projects" | "experience" | "education" | "skills" | "ai" | "contact";

type Answer = { text: string; next?: Face[]; href?: string };

type Topic = {
  keywords: string[];
  faces: Face[];
  build: () => Answer;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const projectLines = () =>
  projects
    .map((p) => `▹ ${p.name} (${p.year}) — ${p.summary}`)
    .join("\n");

const experienceLines = () =>
  experience
    .map((e) => `${e.role} · ${e.company} (${e.period})`)
    .join("\n");

const educationLines = () =>
  education.map((e) => `${e.title} — ${e.institution} (${e.period})`).join("\n");

const courseLines = () =>
  courses.map((c) => `${c.title} — ${c.institution} (${c.year})`).join("\n");

const skillLines = () =>
  skills.categories
    .map(
      (cat) => `▸ ${cat.title}: ${cat.items.join(", ")}`
    )
    .join("\n");

export function getAnswer(raw: string): string {
  const q = norm(raw);
  if (!q) return chat.greeting;

  const topics: Topic[] = [
    {
      keywords: ["quien", "who", "soy", "eres", "es hugo", "presentate"],
      faces: ["site"],
      build: () => ({
        text: `${site.name} es un ${site.title.replace(/\s+/g, " ")} afincado en ${site.location}. ${educationLines()}`,
      }),
    },
    {
      keywords: ["ia", "ai", "inteligencia", "machine", "ml", "telecom", "data scientist", "buscar", "oportunidad", "puesto", "empleo", "trabajo busca"],
      faces: ["experience", "ai"],
      build: () => ({
        text: `Hugo busca su primera oportunidad profesional en IA, Machine Learning, datos o desarrollo de software. Su experiencia en IA incluye:\n${experienceLines()}`,
      }),
    },
    {
      keywords: ["proyecto", "project", "desarrollado", "detectia", "detect", "fake", "viterbi", "convolutional", "rutas", "residuos", "tfg", "tfm"],
      faces: ["projects"],
      build: () => ({
        text: `Estos son los proyectos más relevantes:\n${projectLines()}\nTodos disponibles en su GitHub: ${site.github}`,
      }),
    },
    {
      keywords: ["tecnologia", "tecnolog", "stack", "lenguaje", "lenguajes", "herramienta", "instrumento", "python", "react", "typescript", "docker", "fastapi"],
      faces: ["skills"],
      build: () => ({
        text: `Áreas de conocimiento de Hugo:\n${skillLines()}`,
      }),
    },
    {
      keywords: ["formacion", "formación", "formacion", "formación", "master", "máster", "grado", "educacion", "educación", "estudio", "carrera", "unir", "usal", "curso", "nota", "media"],
      faces: ["education"],
      build: () => ({
        text: `Formación de Hugo:\n${educationLines()}\nCursos:\n${courseLines()}`,
      }),
    },
    {
      keywords: ["experiencia", "trabajo", "trayectoria", "profesional", "camarero", "evento", "hotel", "hosteleria", "hostelería", "practica", "prácticas"],
      faces: ["experience"],
      build: () => ({
        text: `Trayectoria profesional:\n${experienceLines()}\n${site.name} combina la formación con el trabajo en eventos y el servicio en hoteles de alta gama, lo que le aporta adaptabilidad, ritmo y trabajo en equipo bajo presión.`,
      }),
    },
    {
      keywords: ["contacto", "contact", "email", "correo", "linkedin", "github", "telefono", "teléfono", "contratar", "llamar", "red"],
      faces: ["contact"],
      build: () => ({
        text: `Puedes contactar con Hugo por:\n· Email: ${site.email}\n· LinkedIn: ${site.linkedin}\n· GitHub: ${site.github}`,
      }),
    },
    {
      keywords: ["habilidades", "conocimiento", "idioma", "idiomas", "espa", "ingles", "inglés", "frances", "francés", "fortaleza", "skill"],
      faces: ["skills"],
      build: () => ({
        text: `Competencias y tecnologías de Hugo:\n${skillLines()}\nIdiomas: ${skills.languages.map((l) => `${l.name} (${l.level}${l.pct ? ` ${l.pct}%` : ""})`).join(", ")}`,
      }),
    },
  ];

  const topic = topics.find((t) => t.keywords.some((k) => q.includes(k)));

  return topic
    ? topic.build().text
    : chat.fallback;
}
