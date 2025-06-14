export enum Role {
  Bot = "bot",
  User = "user",
}

export type MessageType = {
  role: Role;
  text: string;
};

export type QueryBotResponse = { response: string; shouldSave: boolean };
