"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addCoupleToDB,
  addPlayerToDB,
  addTournamentToDB,
  deletePlayerFromDB,
  editMatchFromDB,
  editPlayerFromDB,
} from "@/app/database/db";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {
  CategoryOfTournamentType,
  MatchType,
  TournamentType,
  WinnersEnum,
} from "./definitions";

const PlayerFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  coupleId: z.string(),
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

const CoupleFormSchema = z.object({
  tournamentId: z.string(),
  categoryId: z.string(),
  player1: z.string(),
  player2: z.string(),
});

const MatchFormSchema = z.object({
  matchId: z.string(),
  result: z.string(),
  court: z.string(),
  winners: z.string(),
  date: z.string(),
  time: z.string(),
});

const CreatePlayer = PlayerFormSchema.omit({ id: true, userId: true });
const UpdatePlayer = PlayerFormSchema.omit({ id: true });
const CreateTournament = TournamentFormSchema.omit({});
const CreateCuople = CoupleFormSchema.omit({});
const UpdateMatch = MatchFormSchema.omit({});

export type State = {
  errors?: {
    id?: string[];
    firstName?: string[];
    lastName?: string[];
    paid?: string[];
    phone?: string[];
    comments?: string[];
    categoryId?: string[];
    tournamentId?: string[];
    email?: string[];
    player1?: string[];
    player2?: string[];
    coupleId?: string[];
    matchId?: string[];
    result?: string[];
    court?: string[];
    date?: string[];
    time?: string[];
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
    coupleId: formData.get("coupleId"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Completa los campos obligatorios.",
    };
  }

  const {
    firstName,
    lastName,
    paid,
    phone,
    comments,
    email,
    categoryId,
    coupleId,
  } = validatedFields.data;

  const player = {
    firstName,
    lastName,
    paid,
    phone,
    comments,
    category: { id: categoryId },
    user: { email },
    couple: { id: coupleId },
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
  revalidatePath(`/player?categoryId=${categoryId}`);
  redirect(`/player?categoryId=${categoryId}`);
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
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se ha podido actualizar el jugador.",
    };
  }

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

  revalidatePath(`/player?categoryId=${categoryId}`);
  redirect(`/player?categoryId=${categoryId}`);
}
export async function updateMatch(
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log("formData: ", formData);
  const validatedFields = UpdateMatch.safeParse({
    matchId: formData.get("matchId"),
    result: formData.get("result"),
    court: formData.get("court"),
    date: formData.get("date"),
    time: formData.get("time"),
    winners: formData.get("winners"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se ha podido actualizar el partido.",
    };
  }

  const { matchId, result, court, date, time, winners } = validatedFields.data;

  // TODO: type winners
  const fullDate = new Date(`${date}T${time}`);
  const timestamp = fullDate.getTime();
  const match: any = {
    id: matchId,
    result,
    court,
    date: fullDate,
    winners,
  };

  try {
    await editMatchFromDB(match);
  } catch (error) {
    return { message: "Database Error: Failed to Update Match." };
  }

  revalidatePath(
    `/tournament?tournamentId=51031936-5ed9-44d2-b9da-ba21e6518062&categoryId=d38d958f-ab84-481d-9e8e-2c4f36cce724`
  );
  redirect(
    `/tournament?tournamentId=51031936-5ed9-44d2-b9da-ba21e6518062&categoryId=d38d958f-ab84-481d-9e8e-2c4f36cce724`
  );
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
      .filter((c: CategoryOfTournamentType) => c !== null),
  } as Partial<TournamentType>;
  let tournamentId = "";
  try {
    const response = await addTournamentToDB(tournament);
    tournamentId = response.id;
  } catch (error: any) {
    return {
      message: "Error en la base de datos: no se ha creado el jugador.",
    };
  }
  revalidatePath(`/tournament?tournamentId=${tournamentId}`);
  redirect(`/tournament?tournamentId=${tournamentId}`);
}

export async function addCoupleToTournament(
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log("1");

  let tId = "";
  let cId = "";
  try {
    const validatedFields = CreateCuople.safeParse({
      tournamentId: formData.get("tournamentId"),
      categoryId: formData.get("categoryId"),
      player1: formData.get("player1"),
      player2: formData.get("player2"),
    });
    if (!validatedFields.success) {
      console.log(
        "validatedFields.error.flatten().fieldErrors: ",
        validatedFields.error.flatten().fieldErrors
      );

      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Completa los campos obligatorios.",
      };
    }

    const { tournamentId, categoryId, player1, player2 } = validatedFields.data;
    tId = tournamentId!;
    cId = categoryId!;
    console.log("-> player1: ", player1);
    console.log("-> player2: ", player2);
    const response = await addCoupleToDB(
      tournamentId,
      categoryId,
      player1,
      player2
    );
  } catch (error) {
    return { message: "Database Error: Failed to Delete Player." };
  }
  revalidatePath(`/tournament?tournamentId=${tId}&categoryId=${cId}`);
  redirect(`/tournament?tournamentId=${tId}&categoryId=${cId}`);
}
