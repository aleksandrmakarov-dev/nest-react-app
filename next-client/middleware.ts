import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, sessionKey } from "./session/session.utils";
import { getSession } from "./session";
import { SessionDto } from "./lib/dto/auth/session.dto";
import { encryptSymmetric } from "./session/encrypt";

export async function middleware(req: NextRequest) {
  const session = await getServerSession(req);

  const res = NextResponse.next();

  if (session) {
    const { ciphertext, iv } = await encryptSymmetric(JSON.stringify(session));
    res.cookies.set(
      sessionKey,
      JSON.stringify({ value: ciphertext, iv: iv }),
      cookieOptions
    );
  }

  const redirectPublicRoute = handlePublicRoute(req, session);
  if (redirectPublicRoute) {
    return redirectPublicRoute;
  }

  const redirectPrivateRoute = handlePrivateRoute(req, session);
  if (redirectPrivateRoute) {
    return redirectPrivateRoute;
  }

  return res;
}

const handlePrivateRoute = (req: NextRequest, session: SessionDto | null) => {
  const foundRoute = privateRoutes.find((pr) =>
    new RegExp(`^${pr.route}$`).test(req.nextUrl.pathname)
  );

  if (!foundRoute) return;

  if (!session) return NextResponse.redirect(new URL("/sign-in", req.url));

  if (foundRoute.roles) {
    const hasRole = foundRoute.roles.includes(session.role);
    if (!hasRole) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }
};

const handlePublicRoute = (req: NextRequest, session: SessionDto | null) => {
  const foundRoute = publicRoutes.find((pr) =>
    new RegExp(`^${pr.route}$`).test(req.nextUrl.pathname)
  );

  if (!foundRoute) return;

  if (session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
};

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

const privateRoutes: Route[] = [
  {
    route: "/dashboard/.*",
    roles: ["ADMIN"],
  },
];

const publicRoutes: Route[] = [
  {
    route: "/sign-in",
  },
  {
    route: "/sign-up",
  },
];

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
