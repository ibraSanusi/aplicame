import { MessageType } from "@/lib";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const userInformation = {
  name: "Ibrahim Ayodeji Sanusi",
  email: "ibra.sanusi.ayo@gmail.com",
  mobile: "631752039",
  position: "Full Stack Developer",
  skills: [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "CSS3",
    "HTML5",
  ],
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const chatMessages = [
    {
      role: "system",
      content: `
        Eres un asistente para ayudar a registrar solicitudes de trabajo. 

        Información del usuario:
        - Nombre: ${userInformation.name}
        - Email: ${userInformation.email}
        - Teléfono: ${userInformation.mobile}
        - Puesto buscado: ${userInformation.position}
        - Tecnologías: ${userInformation.skills.join(", ")}

        Tu tarea:
        1. Pregunta a qué empresa quiere postularse y por qué canal (LinkedIn, correo, etc).
        2. Ofrece un mensaje de presentación personalizado para enviar por ese canal.
        3. Pregunta si quiere guardar esta solicitud.
        4. Si responde afirmativamente, devuelve un JSON con el formato:
        {
          empresa: '',
          canal: '',
          correo?: '',
          mensaje: '',
          fecha: '',
          estado: ''
        }
      `.trim(),
    },
    ...messages.map((msg: MessageType) => ({
      role: msg.role === "bot" ? "assistant" : "user",
      content: msg.text,
    })),
  ];

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: chatMessages,
  });

  const response = chatCompletion.choices[0].message.content;

  return NextResponse.json({ response });
}
