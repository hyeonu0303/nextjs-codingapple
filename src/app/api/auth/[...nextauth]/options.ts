import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { Account, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
interface ExtendedJWT extends JWT{
  accessTokenExpires?:number,
  accessToken?: string,
  user?:{
    name?:string
    email?:string
  }
}
async function refreshAccessToken(token:JWT){
  try {
    // GitHub OAuth 토큰 갱신 엔드포인트로 요청을 보냅니다.
    const url = 'https://github.com/login/oauth/access_token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        refresh_token: token.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.get("refresh_token"), // 새 리프레시 토큰이 없으면 기존 토큰을 유지
    };
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions:NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    //credentialsProvider() 세션방식안되고 JWT만가능
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials):Promise<any> {
        let db = (await connectDB).db('board');
        let user = await db.collection('user').findOne({email : credentials?.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwCheck = await bcrypt.compare(credentials?.password as string, user.password);
        if (!pwCheck) {
          console.log('비번틀림');
          return null
        }
        if(user)
          return user
        else
          return null
      }
    })
  ],
  jwt : {
    maxAge: 60,
  },
  callbacks: {
    // JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
    async jwt({ token, account, user }) {
      console.log('account', account);
      console.log('user', user);
      console.log('token', token);

      // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
      if (account && user) {
        token.accessToken = account.access_token
        token.accessTokenExpires = account.expires_at
        token.refreshToken = account.refresh_token
        return {
          token,          
          user
        }
      }

      // 2. 남은 시간이 임박한 경우 access token 재발급하기 
      // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
      let 남은시간 = token.accessTokenExpires - Math.round(Date.now() / 1000)
      if (남은시간 < (60 * 60 * 8 - 10) ) {  
        console.log('유효기간 얼마안남음')
        let 새로운JWT = await refreshAccessToken(token) // 3. 깃헙에게 재발급해달라고 조르기 
        console.log('새로운 JWT : ', 새로운JWT)
        return 새로운JWT
      } else {
        return token
      }
    },

    //getServerSession 실행시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정가능 
    async session({ session, token }:{session:Session, token:JWT,user:User}):Promise<Session> {
      if(token){
        session.user = token.user
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
        session.error = token.error
      }
      return session
    },
  },


  secret : process.env.NEXT_AUTH_SECRET,
  adapter : MongoDBAdapter(connectDB)
};
