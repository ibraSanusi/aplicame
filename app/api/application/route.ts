import { db } from "@/lib/db";
import { type Application } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// Crear nueva solicitud
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  try {
    const body: Application = await req.json();
    const application = await db.application.create({
      data: {
        company: body.company,
        platform: body.platform,
        email: body.email,
        url: body.url,
        message: body.message,
        createdAt: body.createdAt,
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
  const session = await getServerSession(authOptions);

  console.log("Session:", session);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  try {
    const applications = await db.application.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return new NextResponse("Error interno al obtener", { status: 500 });
  }
}

// Actualizar solicitud
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  try {
    const body: Application = await req.json();
    const applications = await db.application.update({
      where: { id: body.id },
      data: {
        company: body.company,
        platform: body.platform,
        email: body.email,
        url: body.url,
        message: body.message,
        createdAt: body.createdAt,
        state: body.state,
      },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    return new NextResponse("Error interno al actualizar", { status: 500 });
  }
}

// Eliminar solicitud
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

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
