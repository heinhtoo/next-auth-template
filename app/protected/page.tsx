import { auth } from "@/auth";
import React from "react";
import SignOutBtn from "../(auth)/_components/SignOutBtn";

async function ProtectedPage() {
  const session = await auth();

  return (
    <div>
      <div>
        <p>{JSON.stringify(session)}</p>
        <SignOutBtn />
      </div>
    </div>
  );
}

export default ProtectedPage;
