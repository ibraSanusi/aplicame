import { db } from "@/lib/db";
import { type Application } from "@prisma/client";
import { NextResponse } from "next/server";

// Crear nueva solicitud
export async function POST(req: Request) {
  try {
    const body: Application = await req.json();
    const application = await db.application.create({
      data: {
        company: body.company,
        platform: body.platform,
        email: body.email,
        url: body.url,
        message: body.message,
        date: body.date,
        state: body.state,
      },
    });
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return new NextResponse("Error interno al crear", { status: 500 });
  }
}

// Obtener todas las solicitudes
export async function GET() {
  try {
    const solicitudes = await db.application.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return new NextResponse("Error interno al obtener", { status: 500 });
  }
}

// Actualizar solicitud
export async function PUT(req: Request) {
  try {
    const body: Application = await req.json();
    const solicitud = await db.application.update({
      where: { id: body.id },
      data: {
        company: body.company,
        platform: body.platform,
        email: body.email,
        url: body.url,
        message: body.message,
        date: body.date,
        state: body.state,
      },
    });
    return NextResponse.json(solicitud);
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    return new NextResponse("Error interno al actualizar", { status: 500 });
  }
}

// Eliminar solicitud
export async function DELETE(req: Request) {
  try {
    const body: Application = await req.json();
    const deleted = await db.application.delete({
      where: { id: body.id },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return new NextResponse("Error interno al eliminar", { status: 500 });
  }
}
