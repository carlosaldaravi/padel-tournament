"use server";
import { Pool } from "pg";
import {
  Category,
  Club,
  Player,
  PlayerForm,
  User,
  UserCredentials,
} from "@/app/lib/definitions";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const getClub = async (): Promise<Club> => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM club");

    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getCategories = async (): Promise<Category[]> => {
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
): Promise<UserCredentials> => {
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

export const getPlayerById = async (id: string): Promise<Player> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT p.*, u.email FROM "player" p LEFT JOIN "user" u ON p.user_id = u.id WHERE p.id = $1',
      [id]
    );

    const players: Player[] = result.rows.map((player) => {
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

    const players: Player[] = result.rows.map((player) => {
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

export const addPlayerToDB = async (playerData: Player) => {
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
