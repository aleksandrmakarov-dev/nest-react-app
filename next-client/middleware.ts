import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session";

export async function middleware(req: NextRequest) {
  let session = await getSession();

  let setCookieHeader: string[] = [];

  if (!session) {
    console.log("fetching new session...");
    const response = await fetch(
      "http://localhost:3000/api/auth/refresh-token",
      {
        method: "POST",
        headers: {
          Cookie: req.cookies.toString(),
        },
      }
    );

    if (response.ok) {
      session = await response.json();
      setCookieHeader = response.headers.getSetCookie();
    } else {
      console.log(await response.json());
    }
  }

  const foundRoute = protect.find((pr) =>
    new RegExp(`^${pr.route}$`).test(req.nextUrl.pathname)
  );

  if (!foundRoute) return NextResponse.next();

  if (!session) return NextResponse.redirect(new URL("/sign-in", req.url));

  if (foundRoute.roles) {
    const hasRole = foundRoute.roles.includes(session.role);
    if (!hasRole) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }

  return NextResponse.next({
    headers: {
      "set-cookie": setCookieHeader.toString(),
    },
  });
}

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
