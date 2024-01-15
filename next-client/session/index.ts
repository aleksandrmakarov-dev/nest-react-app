"use server";

import { cookies } from "next/headers";
import { SessionDto } from "@/lib/dto/auth/session.dto";

const key = "session";

export const getSession = (): SessionDto | null => {
  const cookieStore = cookies();
  const session = cookieStore.get(key);

  if (session?.value) {
    return JSON.parse(session.value) as SessionDto;
  }

  return null;
};

export const setSession = (session: SessionDto) => {
  const cookieStore = cookies();
  cookieStore.set(key, JSON.stringify(session), {
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
};

export const removeSession = () => {
  const cookieStore = cookies();
  cookieStore.delete(key);
};
