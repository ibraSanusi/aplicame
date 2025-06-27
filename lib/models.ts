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

export type CalendarEvent = {
  kind: "calendar#event";
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string; // ISO date
  updated: string; // ISO date
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator: {
    email: string;
    displayName?: string;
    self?: boolean;
  };
  organizer: {
    email: string;
    displayName?: string;
    self?: boolean;
  };
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  attendees?: {
    email: string;
    displayName?: string;
    organizer?: boolean;
    self?: boolean;
    optional?: boolean;
    responseStatus: string;
  }[];
  hangoutLink?: string;
  conferenceData?: {
    conferenceId?: string;
  };
  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
  source?: {
    url: string;
    title: string;
  };
  eventType?: string;
};
