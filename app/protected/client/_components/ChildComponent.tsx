"use client";
import { useSession } from "next-auth/react";
import React from "react";

function ChildComponent() {
  const { data } = useSession();
  return <div>{JSON.stringify(data)}</div>;
}

export default ChildComponent;
