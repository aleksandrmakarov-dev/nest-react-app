"use server";

import { SessionDto } from "@/lib/dto/auth/session.dto";
import { getSession, removeSession, setSession } from "@/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const response = await fetch(`http://localhost:3001/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: req.cookies.toString(),
    },
  });

  console.log("GETTIGN COOKIES");

  const session: SessionDto | null = response.ok ? await response.json() : null;

  if (!session) await removeSession();
  else await setSession(session);

  return NextResponse.json(session, {
    status: 200,
  });
};
