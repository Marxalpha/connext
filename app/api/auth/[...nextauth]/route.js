import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
// import {connectToDB} from '/utils/database';
// import User from 'models/user';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          name: credentials.username,
          password: credentials.password,
        };
        if (user.name === "admin" && user.password === "admin") {
          return user;
        } else {
          alert("Invalid Credentials");
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // const sessionUser = await User.findOne({
      //     email:session.user.email
      // })
      // session.user.id=sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("hii");
        console.log(profile);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
