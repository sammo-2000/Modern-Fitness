import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email / Access Code",
          type: "text",
          placeholder: "email / access code",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials, req) {
        try {
          const User_identifier = credentials.email;
          const password = credentials.password;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ User_identifier, password }),
            },
          );

          if (!response.ok) return null;

          const data = await response.json();

          data.user.password = "";

          cookies().set("token", data.token, {
            expires: Date.now() + 60 * 60 * 24 * 7 * 1000,
          });
          cookies().set("role", data.user.role, {
            expires: Date.now() + 60 * 60 * 24 * 7 * 1000,
          });

          return {
            ...data.user,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

export default options;
