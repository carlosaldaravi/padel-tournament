"use server";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import {
  CategoryType,
  ClubType,
  MatchType,
  PlayerType,
  PlayerForm,
  TournamentType,
  User,
  UserCredentialsType,
} from "@/app/lib/definitions";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const getClub = async (): Promise<ClubType> => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM club");

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM category ORDER BY name");

    return result.rows;
  } finally {
    client.release();
  }
};

export const getUserById = async (id: string): Promise<User> => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM "user" WHERE id = $1', [
      id,
    ]);

    return result.rows[0];
  } finally {
    client.release();
  }
};
export const getUserByEmail = async (
  email: string
): Promise<UserCredentialsType> => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getPlayerById = async (id: string): Promise<PlayerType> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT p.*, u.email FROM "player" p LEFT JOIN "user" u ON p.user_id = u.id WHERE p.id = $1',
      [id]
    );

    const players: PlayerType[] = result.rows.map((player) => {
      return {
        id: player.id.toString(),
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id.toString(),
          name: player.category_name,
        },
        user: {
          id: player.user_id.toString(),
          email: player.email,
        },
      };
    });

    return players[0];
  } finally {
    client.release();
  }
};

export const getPlayersByCategory = async (categoryId: number) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT p.*, u.email, u.id as user_id FROM "player" p LEFT JOIN "user" u ON p.user_id = u.id WHERE p.category_id = $1 ORDER BY p.first_name',
      [categoryId]
    );

    const players: PlayerType[] = result.rows.map((player) => {
      return {
        id: player.id.toString(),
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id.toString(),
        },
        user: {
          id: player.user_id.toString(),
          email: player.email,
        },
      };
    });

    return players;
  } finally {
    client.release();
  }
};

export const addPlayerToDB = async (playerData: PlayerType) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id',
      [playerData.user.email, "123456"]
    );

    if (result) {
      await client.query(
        'INSERT INTO "player" (first_name, last_name, date_born, paid, phone, comments, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          playerData.firstName,
          playerData.lastName,
          playerData.dateBorn,
          playerData.paid,
          playerData.phone,
          playerData.comments,
          result.rows[0].id,
          Number(playerData.category.id),
        ]
      );
      return result.rows[0];
    }
  } catch (error: any) {
    return { error: error.detail, status: true };
  } finally {
    client.release();
  }
};

export const editPlayerFromDB = async (playerData: PlayerForm) => {
  console.log("playerData::: ", playerData);
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE "user" SET email = $1 WHERE id = $2',
      [playerData.user.email, Number(playerData.user.id)]
    );
    console.log("result: ", result);

    if (result) {
      await client.query(
        'UPDATE "player" SET first_name = $1, last_name = $2, date_born = $3, paid = $4, phone = $5, comments = $6, user_id = $7, category_id = $8 WHERE id = $9',
        [
          playerData.firstName,
          playerData.lastName,
          playerData.dateBorn,
          playerData.paid,
          playerData.phone,
          playerData.comments,
          Number(playerData.user.id),
          Number(playerData.category.id),
          Number(playerData.id),
        ]
      );

      return result.rows[0];
    }
  } catch (error) {
    console.log("=> error: ", error);
  } finally {
    client.release();
  }
};

export const deletePlayerFromDB = async (id: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [
      Number(id),
    ]);
    return result;
  } catch (error) {
    console.log("=> error: ", error);
  } finally {
    client.release();
  }
};

export const addTournamentToDB = async (
  tournamentData: Partial<TournamentType>
) => {
  const client = await pool.connect();
  console.log("tournamentData: ", tournamentData);

  try {
    const tournamentResult = await client.query(
      'INSERT INTO "tournament" (id, date, location) VALUES ($1, $2, $3) RETURNING *',
      [uuidv4(), null, null]
    );
    const tournamentId = tournamentResult.rows[0].id;

    for (const category of tournamentData.categories || []) {
      await addMatchToDb(
        client,
        category.initialPhase,
        tournamentId,
        category.id
      );
    }

    return tournamentResult.rows[0];
  } catch (error: any) {
    console.log("error: ", error);

    return { error: error.detail, status: true };
  } finally {
    client.release();
  }
};

export const addMatchToDb = async (
  client: any,
  initialPhase: number,
  tournamentId: string,
  categoryId: string
) => {
  try {
    for (let i = 0; i < initialPhase; i++) {
      const result = await client.query(
        'INSERT INTO "match" (id, phase) VALUES ($1, $2) RETURNING id',
        [uuidv4(), initialPhase]
      );
      const matchId = result.rows[0].id;
      await client.query(
        'INSERT INTO "tournament_has_matchs" (id, tournament_id, category_id, match_id, initial_phase) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [uuidv4(), tournamentId, categoryId, matchId, initialPhase]
      );
    }

    if (initialPhase > 1) {
      await addMatchToDb(client, initialPhase / 2, tournamentId, categoryId);
    }
  } catch (error) {
    console.log("=> error: ", error);
  }
};

export const getTournament = async (
  tournamentId: string
): Promise<TournamentType> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT 
        t.id AS tournament_id, 
        t.date AS tournament_date, 
        t.location AS tournament_location, 
        thm.id AS tournament_has_match_id, 
        thm.initial_phase AS tournament_has_match_initial_phase, 
        c.id AS category_id, 
        c.name AS category_name, 
        m.id AS match_id, 
        m.court AS match_court, 
        m.date AS match_date, 
        m.result AS match_result,
        m.phase AS match_phase
      FROM tournament t
      LEFT JOIN tournament_has_matchs thm ON t.id = thm.tournament_id
      LEFT JOIN category c ON thm.category_id = c.id
      LEFT JOIN match m ON thm.match_id = m.id
      WHERE t.id = $1
    `,
      [tournamentId]
    );

    let currentTournament!: TournamentType;

    for (const row of result.rows) {
      if (!currentTournament || currentTournament.id !== row.tournament_id) {
        currentTournament = {
          id: row.tournament_id,
          date: row.tournament_date,
          location: row.tournament_location,
          categories: [] as any,
        };
      }

      if (row.category_id) {
        let category = currentTournament.categories.find(
          (c) => c.id === row.category_id
        );
        if (!category) {
          currentTournament?.categories.push({
            id: row.category_id,
            name: row.category_name,
            initialPhase: row.tournament_has_match_initial_phase,
            stages: [],
          } as any);
          category = currentTournament.categories.find(
            (c) => c.id === row.category_id
          );
        }
        const match: MatchType = {
          id: row.match_id,
          court: row.match_court,
          date: row.match_date,
          result: row.match_result,
          locals: [],
          opponents: [],
          winners: null,
          phase: row.match_phase,
        };

        const stage = category?.stages.find((s) => s.phase === match.phase);

        if (!stage) {
          category?.stages.push({
            id: uuidv4(),
            phase: match.phase,
            matches: [match],
          } as any);
        } else {
          stage.matches.push(match);
        }
      }
    }

    return currentTournament;
  } finally {
    client.release();
  }
};
