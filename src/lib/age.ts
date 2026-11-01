// Edad calculada al compilar a partir de BIRTH_DATE (AAAA-MM-DD).
//
// La fecha llega como secreto de GitHub Actions (o desde .env.local en local) y solo
// la usa este módulo, que únicamente importan componentes de servidor: al HTML y al
// JavaScript del navegador llega el número de años, nunca la fecha. El workflow
// recompila la web cada día, así que la edad cambia sola el día del cumpleaños.

/** Fecha de hoy en Madrid como AAAA-MM-DD. */
function todayInMadrid(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
}

/** Años cumplidos, o null si no hay fecha configurada (la fila de edad no se muestra). */
export function currentAge(): number | null {
  const birth = process.env.BIRTH_DATE?.trim();
  if (!birth) {
    if (process.env.CI) throw new Error("Falta el secreto BIRTH_DATE: la edad no se puede calcular.");
    return null;
  }
  const match = birth.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) throw new Error("BIRTH_DATE debe tener el formato AAAA-MM-DD.");

  const [, by, bm, bd] = match.map(Number);
  const [ty, tm, td] = todayInMadrid().split("-").map(Number);
  const hadBirthday = tm > bm || (tm === bm && td >= bd);
  return ty - by - (hadBirthday ? 0 : 1);
}
