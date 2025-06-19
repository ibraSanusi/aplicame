export enum Role {
  Bot = "bot",
  User = "user",
}

export type MessageType = {
  role: Role;
  text: string;
};

export type QueryBotResponse = { response: string; state: string };

export enum ApplicationState {
  ENVIADO = "ENVIADO",
  RESPONDIDO = "RESPONDIDO",
  REENVIADO = "REENVIADO",
  DESCARTADO = "DESCARTADO",
}

export type ApiChatResponse = { response: string | null; state: string };
