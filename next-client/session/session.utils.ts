import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const sessionKey = "session";

export const cookieOptions: Partial<ResponseCookie> | undefined = {
  path: "/",
  sameSite: "strict",
  httpOnly: true,
  maxAge: 60 * 15,
};
