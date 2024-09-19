import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if(!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if(!isCorrectPassword) {
          throw new Error('Invalid credentials');
        } 

        // // Link the account if necessary
        // await prisma.account.upsert({
        //   where: {
        //     provider_providerAccountId: {
        //       provider: 'github',
        //       providerAccountId: user.id
        //     }
        //   },
        //   update: {},
        //   create: {
        //     userId: user.id,
        //     provider: 'github',
        //     providerAccountId: user.id,
        //     type: 'oauth',
        //     token_type: 'bearer',
        //     scope: 'read:user'
        //   }
        // });

        return user;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development', // helps in debugging issues
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // events: {
  //   async linkAccount(message) {
  //     console.log('linkAccount', message);
  //   }
  // }
}

export default NextAuth(authOptions);