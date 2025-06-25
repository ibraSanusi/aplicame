import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { summary, description, start, end, accessToken } = await req.json();

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
      },
    });

    return NextResponse.json(event.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo crear el evento" },
      { status: 500 },
    );
  }
}
