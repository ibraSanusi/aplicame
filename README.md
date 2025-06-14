



# Job Application Tracker Chatbot 🤖📄

Una aplicación web que te ayuda a generar y registrar solicitudes de empleo mediante un chatbot inteligente. Desarrollada con **Next.js**, **Tailwind CSS** y la **API de OpenAI**.

---

## 🚀 Funcionalidades

- ✅ Chatbot basado en GPT para ayudarte a redactar cartas de presentación personalizadas.
- ✅ Registro automático de cada solicitud en formato estructurado.
- ✅ Seguimiento de solicitudes por empresa, canal de aplicación y estado.
- ✅ Diseño responsive y moderno con Tailwind CSS.

---

## 🛠️ Tecnologías

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API (gpt-4o-mini)](https://platform.openai.com/docs)
- [PostgreSQL](https://www.postgresql.org/) (opcional, si almacenas datos)

---

## 📦 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/tuusuario/job-app-chatbot.git
cd job-app-chatbot

# 2. Instala dependencias
npm install

# 3. Crea un archivo .env.local y agrega tu API key de OpenAI
OPENAI_API_KEY=tu_clave_aquí

# 4. Inicia el servidor de desarrollo
npm run dev
````

---

## 📁 Estructura principal

```
/app
  └── api/chat/route.ts       # Endpoint que interactúa con OpenAI
  └── page.tsx                # Componente principal con el chat
  └── components/ChatBox.tsx  # Componente del chat
/lib
  └── types.ts                # Tipado de los mensajes
  └── utils.ts                # Funciones auxiliares
```

---

## ✨ Cómo funciona

1. El usuario escribe a qué empresa quiere postularse y por qué canal.
2. El bot responde con una carta de presentación personalizada.
3. Luego pregunta si deseas guardar esta solicitud.
4. Si la respuesta es afirmativa, devuelve un objeto con la información lista para guardar (empresa, canal, mensaje, etc.).

---

## 📥 Ejemplo de respuesta del bot para guardar:

```json
{
  "empresa": "Playtomic",
  "canal": "Correo",
  "correo": "recruiter@playtomic.io",
  "mensaje": "Hola, soy Ibrahim Ayodeji...",
  "fecha": "2025-06-14",
  "estado": "Enviado"
}
```

---

## 🔒 Variables de entorno

Crea un archivo `.env.local` con el siguiente contenido:

```env
OPENAI_API_KEY=tu_clave_de_openai
```

---

## 🧪 TODOs / Futuras mejoras

* [ ] Persistencia en base de datos (ej. PostgreSQL o SQLite)
* [ ] Filtrado y visualización del historial de solicitudes
* [ ] Exportar a CSV/Excel
* [ ] Integración con LinkedIn API
* [ ] Soporte multilenguaje

---

## 👨‍💻 Autor

**Ibrahim Ayodeji Sanusi**
📧 [ibra.sanusi.ayo@gmail.com](mailto:ibra.sanusi.ayo@gmail.com)
📍 Fuenlabrada, Madrid
[LinkedIn](https://www.linkedin.com/in/ibrahim-ayodeji-sanusi-0208112a7/) | [GitHub](https://github.com/ibraSanusi)

---

## 📄 Licencia

MIT © 2025 - Uso libre para fines personales o educativos.





