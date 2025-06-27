import { Application } from "@prisma/client";
import { CalendarEvent } from "../models";
import { parseDateToReminder } from "../chat";

export function deleteCalendarEvent(
  id: string,
  accessToken: string | undefined,
): Promise<{ ok: boolean; data?: CalendarEvent }> {
  return fetch("/api/delete-event", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, accessToken }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al eliminar el evento");
      return res.json();
    })
    .then((data) => ({ ok: true, data }))
    .catch(() => ({ ok: false }));
}

export async function saveApplication(
  objToSave: Application,
): Promise<Response> {
  return fetch("/api/application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objToSave),
  });
}

export async function createCalendarEvent(
  objToSave: Application,
  accessToken?: string,
) {
  // Preparar y enviar evento a Google Calendar
  const { start, end } = parseDateToReminder(objToSave.createdAt);
  const calendarEvent = {
    summary: `Solicitud de ${objToSave.company}`,
    description: `Solicitud enviada por ${objToSave.platform} para la empresa ${objToSave.company}.`,
    start,
    end,
  };

  if (!accessToken) throw new Error("AccessToken no disponible en sesión");

  const calendarRes = await fetch("/api/create-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...calendarEvent, accessToken }),
  });

  if (!calendarRes.ok)
    throw new Error("Error al crear el evento en el calendario");

  const calendarData: CalendarEvent = await calendarRes.json();
  console.log("✅ Evento creado:", calendarData);

  if (!calendarData.id) {
    throw new Error("El evento no se creó correctamente");
  }

  return {
    ok: true,
    data: calendarData,
  };
}
