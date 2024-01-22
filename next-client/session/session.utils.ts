import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const sessionKey = "session";

export const cookieOptions: Partial<ResponseCookie> | undefined = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 60 * 15,
};
