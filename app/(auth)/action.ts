"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin({
  socialMethod,
}: {
  socialMethod: string;
}) {
  await signIn(socialMethod.toLowerCase(), { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doMagicLink(email: string) {
  await signIn("http-email", {
    email,
    redirectTo: "/",
  });
}

export async function doCredentialLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    console.log(email, password);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(response);
    return { message: "Success" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong. Please try again." };
  }
}
