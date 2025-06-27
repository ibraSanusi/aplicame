import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id, accessToken } = await req.json();

    if (!id || !accessToken) {
      return NextResponse.json(
        { error: "ID del evento y accessToken son requeridos" },
        { status: 400 },
      );
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    await calendar.events.delete({
      calendarId: "primary",
      eventId: id,
    });

    return NextResponse.json(
      { message: "Evento eliminado correctamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el evento" },
      { status: 500 },
    );
  }
}
