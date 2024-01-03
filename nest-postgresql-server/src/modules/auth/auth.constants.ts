import { CookieOptions } from "express";

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const TOKEN_COOKIE = "refreshtokencookiename";

export const TOKEN_COOKIE_OPTIONS: CookieOptions = {
  ...COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const AUTHORIZE_PUBLIC = "authorize:public";
export const AUTHORIZE_OPTIONAL = "authorize:optional";
export const AUTHORIZE_ROLES = "authorize:roles";
