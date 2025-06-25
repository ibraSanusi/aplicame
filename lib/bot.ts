// lib/bot.ts
import { tryParseResponse } from "./helpers";
import { ApiChatResponse, MessageType, QueryBotResponse, Role } from "./models";

/**
 * Envía los mensajes del usuario al endpoint /api/chat para obtener una respuesta del modelo de lenguaje (ChatGPT).
 *
 * @param userMessages - Array de mensajes del usuario y del bot en formato MessageType[].
 * @returns Un objeto con la respuesta generada por el bot y un indicador `saved` que señala si se debe guardar la solicitud, o null si ocurre un error.
 */
export async function queryBot(
  userMessages: MessageType[],
): Promise<QueryBotResponse | null> {
  try {
    const chatResponse = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!chatResponse.ok) {
      console.error(
        `Error HTTP: ${chatResponse.status} - ${chatResponse.statusText}`,
      );
      return null;
    }

    const data: ApiChatResponse = await chatResponse.json();
    if (!data.response)
      return {
        response: "ChatGPT no dio respuesta",
        state: "",
      };

    console.log("Respuesta del bot:", data.response);

    // Se intenta parsear el mensaje. Si GPT no devolvio el formato adecuado es que no se pudo formatear
    const objToSave = tryParseResponse(data.response);
    if (!objToSave) {
      console.error("No se pudo parsear la respuesta a un Application válido");
      return {
        response: data.response,
        state: "",
      };
    }

    // Validar que la respuesta tiene lo esperado
    if (typeof data.response !== "string" || typeof data.state !== "string") {
      console.error("Respuesta del bot con formato inesperado", data);
      return null;
    }

    return {
      response: data.response,
      state: objToSave.state,
    };
  } catch (error) {
    console.error("Error al consultar al bot:", error);
    return null;
  }
}

export function addMessages(
  messages: MessageType[],
  userText: string,
  botText: string,
): MessageType[] {
  return [
    ...messages,
    { role: Role.User, text: userText },
    { role: Role.Bot, text: botText },
  ];
}
