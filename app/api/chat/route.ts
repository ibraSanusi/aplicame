"use server";

import { ApiChatResponse, MessageType, tryParseResponse } from "@/lib";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// const apiKey = process.env.OPENAI_API_KEY;

// if (!apiKey) {
//   throw new Error("La variable OPENAI_API_KEY no está definida.");
// }

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function POST(
  req: Request,
): Promise<NextResponse<ApiChatResponse>> {
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
        4. Si responde afirmativamente, devuelve un JSON con el formato. Pero solo el formato. No añadas mensaje de más, por ejemplo esto que sueles poner 'Perfecto. Aquí tienes la estructura en formato JSON para guardar esta solicitud:' y sin la etiqueta de markdown que pones:
        Recuerda no poner el mensaje de extra. Solo queiro el formato json para luego poder parsear la respuesta. Muy importante.
        También asegurate de devolver la url de la pagina web de la empresa de la solicitud (importante).
        {
          company: '',
          platform: '',
          url?: '',
          email?: '' --> el de la empresa,
          message: '',
          date: '',
          state: 'ENVIADO'
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

  const objResponse = tryParseResponse(response);

  if (objResponse) {
    const currentDate = new Intl.DateTimeFormat("es-ES").format(new Date());
    // Ejemplo: "14/6/2025"

    const newData = { ...objResponse, date: currentDate };

    return NextResponse.json({
      response: JSON.stringify(newData),
      state: objResponse.state,
    });
  } else {
    return NextResponse.json({ response, state: "" });
  }
}
