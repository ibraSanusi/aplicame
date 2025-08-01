import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { ApplicationType } from "@/lib";

// Crear nueva solicitud
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  try {
    const body: ApplicationType = await req.json();
    const { company, platform, email, url, message, createdAt, state } = body;
    const user = session.user;

    const application = await db.application.create({
      data: {
        company,
        platform,
        email,
        url,
        message,
        createdAt,
        state,
        user: {
          connect: { email: user?.email || "" },
        },
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
      where: {
        user: {
          email: session.user?.email || "",
        },
      },
    });

    console.log("Solicitudes obtenidas:", applications);

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
    const body: Partial<ApplicationType> = await req.json();
    const { id, company, platform, email, url, message, state } = body;
    const applications = await db.application.update({
      where: { id },
      data: {
        company,
        platform,
        email,
        url,
        message,
        state,
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
    const body: ApplicationType = await req.json();
    const deleted = await db.application.delete({
      where: { id: body.id },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return new NextResponse("Error interno al eliminar", { status: 500 });
  }
}
