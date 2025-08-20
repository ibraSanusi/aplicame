import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const skills = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Go", "Rust", "PHP", "Ruby",
    "React", "Next.js", "Vue.js", "Angular", "Svelte", "HTML", "CSS", "Tailwind CSS",
    "Node.js", "Express", "NestJS", "Spring Boot", "Django", "Flask", ".NET Core",
    "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Firebase",
    "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "CI/CD", "Terraform",
    "SQL", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn",
    "Git", "GitHub", "GitLab", "Jira", "Figma",
    "Comunicación", "Trabajo en equipo", "Liderazgo", "Resolución de problemas",
    "Adaptabilidad", "Pensamiento crítico"
  ];

  for (const skill of skills) {
   await db.skill.create({
    data: {
      name: skill
    }
   })
  }

  console.log("✅ Skills cargadas correctamente");
}

main().finally(async () => {
  await db.$disconnect();
});
