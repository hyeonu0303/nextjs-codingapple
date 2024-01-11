'use client'
import { Session } from "next-auth";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
interface LoginStatusProps{
  session:Session | null
}
const LoginStatus = ({session}:LoginStatusProps) => {
  return(
    <>
      {
        session == null?
          <LoginBtn/>:
          <>
            <span>{session.user?.name}</span>
            <LogoutBtn/>
          </>
      }
    </>
  )
}

export default LoginStatus;