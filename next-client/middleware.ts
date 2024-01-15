import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, sessionKey } from "./session/session.utils";
import { getSession } from "./session";
import { SessionDto } from "./lib/dto/auth/session.dto";
import { encryptSymmetric } from "./session/encrypt";

export async function middleware(req: NextRequest) {
  const session = await getServerSession(req);

  const foundRoute = protect.find((pr) =>
    new RegExp(`^${pr.route}$`).test(req.nextUrl.pathname)
  );

  const response = NextResponse.next();

  if (session) {
    const { ciphertext, iv } = await encryptSymmetric(JSON.stringify(session));
    response.cookies.set(
      sessionKey,
      JSON.stringify({ value: ciphertext, iv: iv }),
      cookieOptions
    );
  }

  if (!foundRoute) return response;

  if (!session) return NextResponse.redirect(new URL("/sign-in", req.url));

  if (foundRoute.roles) {
    const hasRole = foundRoute.roles.includes(session.role);
    if (!hasRole) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  return response;
}

const getServerSession = async (req: NextRequest) => {
  const session = await getSession();

  if (session) {
    return session;
  } else {
    const response = await fetch(
      "http://localhost:3001/api/auth/refresh-token",
      {
        method: "POST",
        headers: {
          Cookie: req.cookies.toString(),
        },
      }
    );

    if (response.ok) {
      const newSession = await response.json();
      return newSession as SessionDto;
    } else {
      console.log(await response.json());
      return null;
    }
  }
};

interface Route {
  route: string;
  roles?: string[];
}

const protect: Route[] = [
  {
    route: "/dashboard/.*",
    roles: ["ADMIN"],
  },
];

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
