import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User, UserCredentialsType } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "./app/database/db";
import * as bcrypt from "bcrypt";

async function getUser(email: string): Promise<UserCredentialsType | undefined> {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          // if (passwordsMatch) return user;
          if (password === user.password) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
