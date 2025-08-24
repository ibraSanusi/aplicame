import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { UserInformationType } from "@/lib";

// Guarda la información de un usuario: nombre, telefono, posición y skills[]
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, data: null, error: "No autorizado" },
      { status: 401 },
    );
  }

  try {
    const body: Partial<UserInformationType> = await req.json();
    const { mobile, name: userName, position, skills } = body;

    const userInSession = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!userInSession) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Usuario en sesión no encontrado",
        },
        { status: 404 },
      );
    }

    // Guardar skills del usuario
    const createdUserSkills = skills
      ? await Promise.all(
          skills.map((skill) =>
            db.userSkill.create({
              data: { skillId: skill.id, userId: userInSession.id },
            }),
          ),
        )
      : [];

    console.log({ createdUserSkills });

    //  Actualizar el usuario (position, mobile)
    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: {
        name: userName,
        mobile: mobile?.toString(),
        position,
      },
      include: {
        skills: {
          include: {
            skill: true, // incluye los detalles del skill en la respuesta
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: updatedUser, error: null });
  } catch (error) {
    console.error("Error al actulizar la información del usuario.", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Error interno al actualizar información",
      },
      { status: 500 },
    );
  }
}

// Recuperar las skills de la base de datos para que el usuario las seleccione.
export async function GET() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return new NextResponse("No autorizado", { status: 401 });
  // }

  try {
    const skills = await db.skill.findMany();
    if (!Array.isArray(skills)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Skills inválidas",
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: true, data: skills, error: null });
  } catch (error) {
    console.error("Error al recuperar las skills.:", error);
    return new NextResponse("Error interno al reperar skills", { status: 500 });
  }
}
