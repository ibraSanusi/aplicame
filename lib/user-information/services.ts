import { SkillType, UserInformationType } from "../models";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

// Servicio para guardar info del usuario
export async function saveUserInformation(
  formData: Partial<UserInformationType>,
): Promise<ApiResponse<null>> {
  try {
    const res = await fetch("/api/user-information", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const json: ApiResponse<null> = await res.json();
    return json;
  } catch (error) {
    console.error("Error guardando info del usuario:", error);
    return { success: false, data: null, error: "Error de red" };
  }
}

// Servicio para obtener todas las skills
export async function getAllSkills(): Promise<ApiResponse<SkillType[]>> {
  try {
    const res = await fetch("/api/user-information");
    const json: ApiResponse<SkillType[]> = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: json.error || "Error desconocido",
      };
    }

    return json;
  } catch (error) {
    console.error("Error obteniendo skills:", error);
    return { success: false, data: null, error: "Error de red" };
  }
}
