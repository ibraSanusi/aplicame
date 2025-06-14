// lib/bot.ts
// import { normalizar } from "./helpers";
import { MessageType, QueryBotResponse, Role } from "./models";

// export function queryBot(userMessage: string): {
//   response: string;
//   shouldSave: boolean;
// } {
//   const msgNorm = normalizar(userMessage);

//   if (msgNorm.includes("linkedin")) {
//     return {
//       response:
//         "Este es el mensaje para LinkedIn... ¿Quieres guardar la solicitud?",
//       shouldSave: true,
//     };
//   }

//   return {
//     response: "Perfecto. ¿Has enviado la solicitud?",
//     shouldSave: true,
//   };
// }

/**
 * Envía los mensajes del usuario al endpoint /api/chat para obtener una respuesta del modelo de lenguaje (ChatGPT).
 *
 * @param userMessages - Array de mensajes del usuario y del bot en formato MessageType[].
 * @returns Un objeto con la respuesta generada por el bot y un indicador `shouldSave` que señala si se debe guardar la solicitud.
 */
export async function queryBot(
  userMessages: MessageType[]
): Promise<QueryBotResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: userMessages }), // <-- corregido aquí
  });

  const data = await res.json();
  return {
    response: data.response,
    shouldSave: true,
  };
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
