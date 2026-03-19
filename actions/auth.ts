"use server";

import { signIn, signOut } from "@/auth";

export async function signInWithGoogle(redirectTo = "/dashboard") {
  await signIn("google", { redirectTo });
}

export async function signInToDashboard() {
  await signInWithGoogle("/dashboard");
}

export async function signOutToHome() {
  await signOut({ redirectTo: "/" });
}
