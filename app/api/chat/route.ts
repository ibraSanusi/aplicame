"use server";

import { ApiChatResponse, MessageType, tryParseResponse } from "@/lib";
import { type Application } from "@prisma/client";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

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
        Eres un asistente diseñado para ayudar a registrar solicitudes de trabajo.

        Información del usuario:
        - Nombre: ${userInformation.name}
        - Email: ${userInformation.email}
        - Teléfono: ${userInformation.mobile}
        - Puesto buscado: ${userInformation.position}
        - Tecnologías: ${userInformation.skills.join(", ")}

        Tu tarea se divide en fases. **Haz solo una a la vez**:

        1. Pregunta al usuario a qué empresa quiere postularse y por qué canal (LinkedIn, correo, etc.).
        2. Luego, genera un **mensaje de presentación personalizado** en tono profesional y cercano.
          - Muestra el mensaje en **formato Markdown**, sin envolver en etiquetas \`\`\`, para que se vea bien en pantalla.
        3. Después de mostrar el mensaje en Markdown, pregunta si desea **guardar esta solicitud**.
        4. Si el usuario responde afirmativamente, **devuelve exclusivamente** un JSON válido con el siguiente formato:

        {
          company: '',      
          platform: '',     
          url: '',          
          email: '',        
          message: '',      // El mensaje generado, en texto plano (sin Markdown ni saltos innecesarios)
          createdAt: '',    
          state: 'ENVIADO'  
        }

        ⚠️ Importante:
        - El mensaje mostrado al usuario debe estar en formato Markdown, **antes** de la parte del JSON.
        - El JSON debe devolverse solo si el usuario dice explícitamente que desea guardar.
        - El JSON debe ir **sin ninguna explicación adicional** y **sin etiquetas Markdown**.
        - La URL de la empresa es obligatoria.
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

  const objResponse: Application | null = tryParseResponse(response);

  if (objResponse) {
    const currentDate = new Date();
    // Ejemplo: "2025-06-14T18:23:45.123Z"

    const newData = { ...objResponse, createdAt: currentDate };

    return NextResponse.json({
      response: JSON.stringify(newData),
      state: objResponse.state,
    });
  } else {
    return NextResponse.json({ response, state: "" });
  }
}
