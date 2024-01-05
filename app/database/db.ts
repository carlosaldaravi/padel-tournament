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
  UserType,
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

export const getUserById = async (id: string): Promise<UserType> => {
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
        id: player.id,
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id,
          name: player.category_name,
        },
        user: {
          id: player.user_id,
          email: player.email,
        },
      };
    });

    return players[0];
  } finally {
    client.release();
  }
};

export const getPlayersByCategoryWithOutCouple = async (
  categoryId: string
): Promise<PlayerType[]> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
        SELECT 
          p.*, u.email
        FROM "player" p
        LEFT JOIN "user" u ON p.user_id = u.id
        WHERE p.category_id = $1
        AND p.couple_id IS NULL;
      `,
      [categoryId]
    );

    const players: PlayerType[] = result.rows.map((player) => {
      return {
        id: player.id,
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id,
          name: player.category_name,
        },
        user: {
          id: player.user_id,
          email: player.email,
        },
      };
    });

    return players;
  } finally {
    client.release();
  }
};

export const getPlayersByCategory = async (categoryId: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT 
        p.*, 
        p2.id AS couple_id,
        p2.first_name AS couple_first_name,
        p2.last_name AS couple_last_name,
        p2.paid AS couple_paid,
        p2.phone AS couple_phone,
        u.email,
        u.id AS user_id 
      FROM "player" p 
      LEFT JOIN "user" u ON p.user_id = u.id
      LEFT JOIN "player" p2 ON p2.id = p.couple_id
      WHERE p.category_id = $1

      `,
      [categoryId]
    );

    const players: PlayerType[] = result.rows.map((player) => {
      return {
        id: player.id,
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id,
        },
        user: {
          id: player.user_id,
          email: player.email,
        },
        couple: {
          id: player.couple_id,
          firstName: player.couple_first_name,
          lastName: player.couple_last_name,
          paid: player.couple_paid,
          phone: player.couple_phone,
        },
      };
    });

    return players;
  } finally {
    client.release();
  }
};
export const getCouplesByCategory = async (categoryId: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT 
        DISTINCT ON (LEAST(p.id, p.couple_id), GREATEST(p.id, p.couple_id)) p.*, 
        p2.id AS couple_id,
        p2.first_name AS couple_first_name,
        p2.last_name AS couple_last_name,
        p2.paid AS couple_paid,
        p2.phone AS couple_phone,
        u.email,
        u.id AS user_id 
      FROM "player" p 
      LEFT JOIN "user" u ON p.user_id = u.id
      LEFT JOIN "player" p2 ON p2.id = p.couple_id
      WHERE p.category_id = $1
      AND NOT EXISTS (
        SELECT 1
        FROM match_players
        WHERE player_id = p.id
      )
      ORDER BY LEAST(p.id, p.couple_id), GREATEST(p.id, p.couple_id), p.id, p.first_name;

      `,
      [categoryId]
    );

    const players: PlayerType[] = result.rows.map((player) => {
      return {
        id: player.id,
        firstName: player.first_name,
        lastName: player.last_name,
        // dateBorn: player.date_born,
        paid: player.paid,
        phone: player.phone,
        comments: player.comments,
        category: {
          id: player.category_id,
        },
        user: {
          id: player.user_id,
          email: player.email,
        },
        couple: {
          id: player.couple_id,
          firstName: player.couple_first_name,
          lastName: player.couple_last_name,
          paid: player.couple_paid,
          phone: player.couple_phone,
        },
      };
    });

    return players;
  } finally {
    client.release();
  }
};

export const addPlayerToDB = async (playerData: PlayerForm) => {
  const client = await pool.connect();

  try {
    const userId = uuidv4();
    const result = await client.query(
      'INSERT INTO "user" (id, email, password) VALUES ($1, $2, $3) RETURNING id',
      [userId, playerData.user!.email, "123456"]
    );

    if (result) {
      const playerId = uuidv4();
      await client.query(
        `
          INSERT 
          INTO "player" (id, first_name, last_name, date_born, paid, phone, comments, user_id, category_id, couple_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `,
        [
          playerId,
          playerData.firstName,
          playerData.lastName,
          playerData.dateBorn,
          playerData.paid,
          playerData.phone,
          playerData.comments,
          userId,
          playerData.category!.id,
          playerData.couple?.id,
        ]
      );
      if (playerData.couple?.id) {
        await client.query(
          `
            UPDATE 
              "player"
            SET couple_id = $1
            WHERE id = $2
          `,
          [playerId, playerData.couple.id]
        );
      }
      return result.rows[0];
    }
  } catch (error: any) {
    return { error: error.detail, status: true };
  } finally {
    client.release();
  }
};

export const editPlayerFromDB = async (playerData: PlayerForm) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE "user" SET email = $1 WHERE id = $2',
      [playerData?.user?.email, playerData?.user?.id]
    );

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
          playerData.user?.id,
          playerData.category?.id,
          playerData.id,
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
    const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
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

  try {
    const tournamentResult = await client.query(
      'INSERT INTO "tournament" (id, club_id) VALUES ($1, $2) RETURNING *',
      [uuidv4(), "7e2c1561-d9ef-4aa9-84bb-59debfe1f668"]
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

export const editMatchFromDB = async (playerData: Partial<MatchType>) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `
        UPDATE 
          "match"
        SET result = $1, court = $2, date = $3, winners = $4
        WHERE id = $5
      `,
      [
        playerData.result,
        playerData.court,
        playerData.date,
        playerData.winners,
        playerData.id,
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.log("=> error: ", error);
  } finally {
    client.release();
  }
};

export const addCoupleToDB = async (
  tournamentId: string,
  categoryId: string,
  player1: string,
  player2: string
) => {
  const client = await pool.connect();
  try {
    const match = await client.query(
      `
      SELECT 
        DISTINCT tournament_has_matchs.match_id,
        CASE 
          WHEN match_players.match_id IS NOT NULL THEN true
          ELSE false
        END AS is_in_match_players
      FROM tournament_has_matchs 
      LEFT JOIN match_players ON tournament_has_matchs.match_id = match_players.match_id
      WHERE tournament_id = $1
      AND category_id = $2
      AND initial_phase = (
        SELECT MAX(initial_phase) 
        FROM tournament_has_matchs 
        WHERE tournament_id = $1
        AND category_id = $2
      )
      AND NOT EXISTS (
        SELECT 1
        FROM match_players
        WHERE match_id = tournament_has_matchs.match_id
        GROUP BY match_id
        HAVING COUNT(*) >= 3
      )
      ORDER BY is_in_match_players DESC;
    `,
      [tournamentId, categoryId]
    );
    const matchId = match.rows[0].match_id;
    const isOpponent = match.rows[0].is_in_match_players;

    const result = await client.query(
      'INSERT INTO "match_players" (id, match_id, player_id, is_opponent) VALUES ($1, $2, $3, $4) RETURNING id',
      [uuidv4(), matchId, player1, isOpponent]
    );
    const result2 = await client.query(
      'INSERT INTO "match_players" (id, match_id, player_id, is_opponent) VALUES ($1, $2, $3, $4) RETURNING id',
      [uuidv4(), matchId, player2, isOpponent]
    );
  } catch (error) {
    console.log("error: ", error);
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
        t.start_at AS tournament_start_at, 
        t.location AS tournament_location, 
        thm.id AS tournament_has_match_id, 
        thm.initial_phase AS tournament_has_match_initial_phase, 
        c.id AS category_id, 
        c.name AS category_name, 
        m.id AS match_id, 
        m.court AS match_court, 
        m.date AS match_date, 
        m.result AS match_result,
        m.phase AS match_phase,
        m.winners AS match_winners,
        p.first_name AS first_name,
        mp.is_opponent AS is_opponent
      FROM tournament t
      INNER JOIN tournament_has_matchs thm ON t.id = thm.tournament_id
      INNER JOIN category c ON thm.category_id = c.id
      INNER JOIN match m ON thm.match_id = m.id
      LEFT JOIN match_players mp ON mp.match_id = m.id
      LEFT JOIN player p ON p.id = mp.player_id
      WHERE t.id = $1
    `,
      [tournamentId]
    );

    let currentTournament!: TournamentType;
    let locals = [];
    let opponents = [];
    for (const row of result.rows) {
      if (!currentTournament || currentTournament.id !== row.tournament_id) {
        currentTournament = {
          id: row.tournament_id,
          startAt: row.tournament_start_at,
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
          winners: row.match_winners,
          phase: row.match_phase,
        };
        if (row.first_name) {
          row.is_opponent
            ? opponents.push({
                categoryId: row.category_id,
                name: row.first_name,
                matchId: row.match_id,
                phase: row.match_phase,
                isOpponent: true,
              })
            : locals.push({
                categoryId: row.category_id,
                name: row.first_name,
                matchId: row.match_id,
                phase: row.match_phase,
                isOpponent: false,
              });
        }
        const stage = category?.stages.find((s) => s.phase === match.phase);

        if (!stage) {
          category?.stages.push({
            id: uuidv4(),
            phase: match.phase,
            matches: [match],
          } as any);
        } else {
          if (!stage.matches.find((m) => m.id === match.id)) {
            stage.matches.push(match);
          }
        }
      }
    }
    locals.forEach((local: any) => {
      currentTournament.categories
        .find((c) => c.id === local.categoryId)
        ?.stages.find((s) => s.phase === local.phase)
        ?.matches.find((m) => m.id === local.matchId)
        ?.locals.push(local.name);
    });
    opponents.forEach((local: any) => {
      currentTournament.categories
        .find((c) => c.id === local.categoryId)
        ?.stages.find((s) => s.phase === local.phase)
        ?.matches.find((m) => m.id === local.matchId)
        ?.opponents.push(local.name);
    });

    currentTournament.categories.forEach((c) => {
      c.stages.sort((b, a) => a.phase - b.phase);
    });

    return currentTournament;
  } finally {
    client.release();
  }
};
