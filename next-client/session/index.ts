"use server";

import { cookies } from "next/headers";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { cookieOptions, sessionKey } from "./session.utils";
import { decryptSymmetric } from "./encrypt";

export const getSession = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get(sessionKey);

  if (session?.value) {
    try {
      const { value, iv } = JSON.parse(session.value);
      const decrypted = await decryptSymmetric(value, iv);
      return JSON.parse(decrypted) as SessionDto;
    } catch (e) {
      console.log("decrypting error:", e);
    }
  }

  return null;
};

export const setSession = (session: SessionDto) => {
  const cookieStore = cookies();
  cookieStore.set(sessionKey, JSON.stringify(session), cookieOptions);
};

export const removeSession = () => {
  const cookieStore = cookies();
  cookieStore.delete(sessionKey);
};
