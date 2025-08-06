export const userInformationFields = {
  name: { title: "¿Cuál es tu nombre?", placeholder: "Nombre y apellido." },
  email: { title: "¿Cuál es tu email?", placeholder: "Email" },
  mobile: { title: "Escribe tu número móvil", placeholder: "612 345 678" },
  position: {
    title: "¿Cuál es tu puesto de trabajo?",
    placeholder: "Full Stack Developer",
  },
  skills: {
    title: "Enumera más de 5 skills.",
    placeholder: "React.js, Next.js, Tailwindcss...",
  },
};

export const fieldKeys = Object.keys(userInformationFields) as Array<
  keyof typeof userInformationFields
>;