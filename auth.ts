import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import { User, UserType } from "./models/User/user";

const credentialsError = (code: string) => {
  const credError = new CredentialsSignin();
  credError.code = code;
  return credError;
};
await dbConnect();
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email as string | undefined;
        const password = creds?.password as string | undefined;
        if (!email || !password) throw credentialsError("missing-credentials");

        const existingUser = (await User.findOne({ email }).select(
          "+password",
        )) as UserType;
        if (!existingUser) throw credentialsError("invalid-credentials");

        const ok = await bcrypt.compare(password, existingUser.password);
        if (!ok) throw credentialsError("invalid-credentials");

        return {
          id: existingUser._id as unknown as string,
          email: existingUser.email,
          name: existingUser.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) return false;

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) return false;
      return true;
    },
    async jwt({ token }) {
      const existingUser = await User.findOne({ email: token.email });
      if (existingUser) {
        token.sub = existingUser._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
