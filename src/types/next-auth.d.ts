// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
// import { User } from './../../node_modules/next-auth/core/types.d';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

    interface User {
        user: {
        "name": sting,
        "email": string,
        "role": string
    },
    "token": string
    }

  interface Session {
    user: User.User;
  }
}