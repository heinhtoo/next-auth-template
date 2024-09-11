import React from "react";
import LoginForm from "./_components/LoginForm";
import { auth } from "@/auth";
import SignOutBtn from "./_components/SignOutBtn";

async function AuthPage() {
  const session = await auth();
  return session && session.user ? (
    <div>
      <p>{JSON.stringify(session)}</p>
      <SignOutBtn />
    </div>
  ) : (
    <LoginForm />
  );
}

export default AuthPage;
