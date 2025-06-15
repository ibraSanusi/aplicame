export enum Role {
  Bot = "bot",
  User = "user",
}

export type MessageType = {
  role: Role;
  text: string;
};

export type QueryBotResponse = { response: string; saved: boolean };

export type ApplicationData = {
  company: string;
  channel: string;
  email?: string; // Optional: only present if sent via email
  message: string;
  date: string;
  save: boolean; // true if user wants to save, false otherwise
};

export type ApiChatResponse = { response: string; save: boolean };
