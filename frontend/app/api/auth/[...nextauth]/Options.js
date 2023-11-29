import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
//import User from "../../../../../backend/models/User_Model";
const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("github profile", profile);
        //i'm going to fetch all the email in the database where their role == "trainer"
        //will apply the same approciate to other types of users
        //if the email the user log in with is not present in the database the user role will be marked as "guest user"
        let userRole = "GitHub User";
        if (profile?.email == "c1032994@hallam.shu.ac.uk") {
          userRole = "trainer";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    // Google provider
    GoogleProvider({
      async profile(profile) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/users`,
          );
          const members = await res.json();
          const memberList = members.users.filter(
            (user) => user.role === "member",
          );

          let userRole = "Google User";
          let firstName = "";
          let lastName = "";

          const userWithEmail = memberList.find(
            (user) => user.email === profile?.email,
          );

          if (userWithEmail) {
            userRole = "Member";
            firstName = userWithEmail.first_name;
            lastName = userWithEmail.last_name;
            console.log(`Found user: ${firstName} ${lastName}`);
          } else if (profile?.email === "sulaimonahmed08@gmail.com") {
            userRole = "trainer";
            console.log(userRole);
          } else {
            console.log("Unknown User");
          }

          return {
            ...profile,
            id: profile.sub,
            role: userRole,
            first_name: firstName,
            last_name: lastName,
          };
        } catch (error) {
          console.error(error);

          return profile;
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          console.log("--------------------------------------")
          const User_identifier = credentials.email;
          const password = credentials.password;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ User_identifier, password })
            },
          );

          if (!response.ok) return null;

          const data = await response.json();

          data.user.password = "";

          console.log(data.token);
          cookies().set("token", data.token);
          cookies().set("role", data.user.role);

          return data.user;
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
