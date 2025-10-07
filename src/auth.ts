import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/db";
import User from "@/models/User";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email:    { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (
            !credentials ||
            typeof credentials.email !== "string" ||
            typeof credentials.password !== "string"
          ) {
            return null;
          }

          await dbConnect();

          // IMPORTANT: password has select:false in schema, so include it here
          const user = await User.findOne({ email: credentials.email }).select("+password");
          if (!user || !user.password) return null;

          const ok = await bcrypt.compare(credentials.password, user.password);
          if (!ok) return null;

          // return object becomes session.user
          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (err) {
          console.error("NextAuth authorize() error:", err);
          // Never throw — return null to avoid 500 and show “Invalid email or password”
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
