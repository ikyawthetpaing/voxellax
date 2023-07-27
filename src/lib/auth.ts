import { db } from "@/lib/db";
import { env } from "@/env.mjs";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      // Check if the user exists in the database
      let dbUser = await db.user.findFirst({
        where: {
          email: token?.email,
        },
      });

      // If the user does not exist in the database, return the provided token
      if (!dbUser) {
        if (user) {
          token.id = user.id;
          // Check if the provided token's email matches the ADMIN_EMAIL
          if (token?.email === env.ADMIN_EMAIL) {
            token.role = UserRole.Admin;
          }
        }

        return token;
      }

      // Check if the provided token's email matches the ADMIN_EMAIL
      if (token?.email === env.ADMIN_EMAIL) {
        dbUser = await db.user.update({
          where: { id: dbUser?.id },
          data: { role: UserRole.Admin },
        });
      }

      // If the user exists in the database, return the user data along with the user role
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
  },
};
