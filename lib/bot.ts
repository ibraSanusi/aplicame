// lib/bot.ts
import { ApiChatResponse, MessageType, QueryBotResponse, Role } from "./models";

/**
 * Envía los mensajes del usuario al endpoint /api/chat para obtener una respuesta del modelo de lenguaje (ChatGPT).
 *
 * @param userMessages - Array de mensajes del usuario y del bot en formato MessageType[].
 * @returns Un objeto con la respuesta generada por el bot y un indicador `saved` que señala si se debe guardar la solicitud, o null si ocurre un error.
 */
export async function queryBot(
  userMessages: MessageType[]
): Promise<QueryBotResponse | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!res.ok) {
      console.error(`Error HTTP: ${res.status} - ${res.statusText}`);
      return null;
    }

    const data: ApiChatResponse = await res.json();

    // Validar que la respuesta tiene lo esperado
    if (typeof data.response !== "string" || typeof data.save !== "boolean") {
      console.error("Respuesta del bot con formato inesperado", data);
      return null;
    }

    return {
      response: data.response,
      saved: data.save,
    };
  } catch (error) {
    console.error("Error al consultar al bot:", error);
    return null;
  }
}

export function addMessages(
  messages: MessageType[],
  userText: string,
  botText: string
): MessageType[] {
  return [
    ...messages,
    { role: Role.User, text: userText },
    { role: Role.Bot, text: botText },
  ];
}
