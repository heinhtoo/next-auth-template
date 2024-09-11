"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { doLogout } from "../action";

function SignOutBtn() {
  return (
    <Button
      onClick={async () => {
        await doLogout();
      }}
    >
      Signout
    </Button>
  );
}

export default SignOutBtn;
