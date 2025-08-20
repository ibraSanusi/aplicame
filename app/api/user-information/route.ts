import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { UserInformationType } from "@/lib";

// Guarda la información de un usuario: nombre, telefono, posición y skills[]
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  try {
    const body: UserInformationType = await req.json();
    const { email, mobile, name: userName, position, skills } = body;

    const user = session.user;

    // Buscar skills existentes en la tabla Skill
    const foundSkills = await db.skill.findMany({
      where: {
        name: {
          in: skills,
        },
      },
    });

    //  Actualizar el usuario y asociar skills encontrados
    const updatedUser = await db.user.update({
      where: { email: user?.email || "" },
      data: {
        name: userName,
        mobile: mobile?.toString(),
        email,
        position,
        skills: {
          create: foundSkills.map((skill) => ({
            skill: {
              connect: { id: skill.id }, // conecta por id del skill existente
            },
          })),
        },
      },
      include: {
        skills: {
          include: {
            skill: true, // incluye los detalles del skill en la respuesta
          },
        },
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return new NextResponse("Error interno al crear", { status: 500 });
  }
}
