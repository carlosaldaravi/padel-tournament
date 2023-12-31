"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addPlayerToDB,
  addTournamentToDB,
  deletePlayerFromDB,
  editPlayerFromDB,
} from "@/app/database/db";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {
  Match,
  PhaseEnum,
  StageEnum,
  StageValue,
  TournamentType,
  ValidStageKey,
} from "./definitions";

const PlayerFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string().min(1, {
    message: "Por favor, escribe el nombre.",
  }),
  lastName: z.string().min(1, {
    message: "Por favor, escribe el apellido.",
  }),
  paid: z.boolean(),
  phone: z.string().length(9, {
    message: "Por favor, escribe un teléfono válido.",
  }),
  comments: z.string(),
  email: z.string().email({
    message: "Por favor, escribe un email válido.",
  }),
  categoryId: z.string({
    invalid_type_error: "Por favor, elige una categoría.",
  }),
});

const TournamentFormSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, {
    message: "Por favor, escribe el nombre.",
  }),
  paid: z.boolean(),
  categoryId: z.string({
    invalid_type_error: "Por favor, elige una categoría.",
  }),
});

const CreatePlayer = PlayerFormSchema.omit({ id: true, userId: true });
const UpdatePlayer = PlayerFormSchema.omit({ id: true });
const CreateTournament = TournamentFormSchema.omit({});

export type State = {
  errors?: {
    id?: string[];
    firstName?: string[];
    lastName?: string[];
    paid?: string[];
    phone?: string[];
    comments?: string[];
    categoryId?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createPlayer(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreatePlayer.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    paid: formData.get("paid") === "on" ? true : false,
    phone: formData.get("phone"),
    comments: formData.get("comments"),
    categoryId: formData.get("categoryId"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Completa los campos obligatorios.",
    };
  }

  const { firstName, lastName, paid, phone, comments, email, categoryId } =
    validatedFields.data;

  const player = {
    firstName,
    lastName,
    paid,
    phone,
    comments,
    category: { id: categoryId },
    user: { email },
  };

  // Insert data into the database
  try {
    const p = await addPlayerToDB(player);

    if (p.error?.status === true) {
      return {
        message: "Este jugador ya está registrado",
      };
    }
  } catch (error: any) {
    return {
      message: "Error en la base de datos: no se ha creado el jugador.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/player?category=${categoryId}`);
  redirect(`/player?category=${categoryId}`);
}

export async function updatePlayer(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log("formData: ", formData);
  const validatedFields = UpdatePlayer.safeParse({
    id,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    paid: formData.get("paid") === "on" ? true : false,
    phone: formData.get("phone"),
    comments: formData.get("comments"),
    categoryId: formData.get("categoryId"),
    email: formData.get("email"),
    userId: formData.get("userId"),
  });
  console.log("!");
  if (!validatedFields.success) {
    console.log("1");
    console.log("validatedFields: ", validatedFields);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se ha podido actualizar el jugador.",
    };
  }
  console.log("2");

  const {
    firstName,
    lastName,
    paid,
    phone,
    comments,
    email,
    categoryId,
    userId,
  } = validatedFields.data;

  const player = {
    id,
    firstName,
    lastName,
    paid,
    phone,
    comments,
    category: { id: categoryId },
    user: { id: userId, email },
  };

  try {
    await editPlayerFromDB(player);
  } catch (error) {
    return { message: "Database Error: Failed to Update Player." };
  }

  revalidatePath(`/player?category=${categoryId}`);
  redirect(`/player?category=${categoryId}`);
}

export async function deletePlayer(id: string) {
  // throw new Error('Failed to Delete Player');

  try {
    await deletePlayerFromDB(id);
    revalidatePath("/player");
    return { message: "Jugador eliminado" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Player." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "Algo ha ido mal..";
      }
    }
    throw error;
  }
}

export async function createTournament(
  prevState: State,
  formData: any
): Promise<State> {
  const tournament = {
    categories: formData
      .map((item: any) => {
        if (item.enabled) {
          return {
            id: item.id,
            initialPhase: item.initialPhase,
          };
        } else {
          return null;
        }
      })
      .filter((c: any) => c !== null),
  } as Partial<TournamentType>;
  try {
    const p = await addTournamentToDB(tournament);
  } catch (error: any) {
    return {
      message: "Error en la base de datos: no se ha creado el jugador.",
    };
  }
  revalidatePath(`/tournament/create`);
  redirect(`/tournament/create`);
}
