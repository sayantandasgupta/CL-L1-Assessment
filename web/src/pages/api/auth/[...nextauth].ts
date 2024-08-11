import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { _fetchUserById } from "@/services/user.services";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id: { label: 'User ID', type: 'text' },
                role: { label: 'User Role', type: 'text' },
            },
            async authorize(credentials, req) {
                const { id, role } = credentials as { id: string, role: string };

                const user = _fetchUserById(id);

                if (!user) return Promise.resolve(null);

                const roleMatch = role === user.role;

                if (roleMatch) return Promise.resolve(user);
                else return Promise.resolve(null);
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    }
}

export default NextAuth(authOptions);