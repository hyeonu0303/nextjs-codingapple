import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
declare module "next-auth/jwt"{
  interface JWT{
    accessToken?:Account.accessToken
    accessTokenExpires?:Account.expires_at
    refreshToken?:Account.refresh_token
  }
}

declare module "next-auth"{
  interface Session{
    accessToken?: Account.accessToken;
    user?:User.string
    accessTokenExpires?: Account.expires_at
    error?: Session.error
  }
}