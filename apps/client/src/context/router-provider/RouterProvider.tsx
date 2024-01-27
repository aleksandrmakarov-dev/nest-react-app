import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { routes } from "@/lib/routing";
import MainLayout from "@/pages/(main)/layout";
import AuthLayout from "@/pages/(auth)/layout";
import DashboardLayout from "@/pages/dashboard/layout";
import { RoutePublicGuard, RouteRoleGuard } from "@/shared";

import ReactGA from "react-ga4";

if (!process.env.MEASUREMENT_ID) {
  console.log("ga4 does not work");
}

ReactGA.initialize(process.env.MEASUREMENT_ID ?? "");

const HomePage = lazy(() => import("@/pages/(main)/home/page"));
const BlogPage = lazy(() => import("@/pages/(main)/blog/page"));
const AboutMePage = lazy(() => import("@/pages/(main)/about-me/page"));
const ArticlePage = lazy(() => import("@/pages/(main)/blog/[id]/page"));
const DashboardArticlesPage = lazy(
  () => import("@/pages/dashboard/articles/page")
);
const DashboardArticlesNewPage = lazy(
  () => import("@/pages/dashboard/articles/new/page")
);
const DashboardArticlesEditPage = lazy(
  () => import("@/pages/dashboard/articles/[id]/page")
);

const DashboardProjectsPage = lazy(
  () => import("@/pages/dashboard/projects/page")
);
const DashboardProjectsNewPage = lazy(
  () => import("@/pages/dashboard/projects/new/page")
);
const DashboardProjectsEditPage = lazy(
  () => import("@/pages/dashboard/projects/[id]/page")
);

const DashboardTagsPage = lazy(() => import("@/pages/dashboard/tags/page"));
const DashboardToolsPage = lazy(() => import("@/pages/dashboard/tools/page"));

const DashboardHomePage = lazy(() => import("@/pages/dashboard/home/page"));

const SignInPage = lazy(() => import("@/pages/(auth)/sign-in/page"));
const SignUpPage = lazy(() => import("@/pages/(auth)/sign-up/page"));
const SignOutPage = lazy(() => import("@/pages/(auth)/sign-out/page"));

const AccessDenied = lazy(() => import("@/pages/access-denied/page"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={routes.root} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.tags.root}>
          <Route path=":tagId">
            <Route index element={<BlogPage />} />
          </Route>
        </Route>
        <Route path={routes.blog.root}>
          <Route index element={<BlogPage />} />
          <Route path=":id">
            <Route index element={<ArticlePage />} />
          </Route>
        </Route>
        <Route path={routes.aboutMe} element={<AboutMePage />} />
      </Route>
      <Route path={routes.root} element={<AuthLayout />}>
        <Route element={<RoutePublicGuard />}>
          <Route path={routes.auth.signIn} element={<SignInPage />} />
          <Route path={routes.auth.signUp} element={<SignUpPage />} />
        </Route>
        <Route path={routes.auth.signOut} element={<SignOutPage />} />
      </Route>
      <Route element={<RouteRoleGuard roles={["ADMIN"]} />}>
        <Route path={routes.dashboard.root} element={<DashboardLayout />}>
          <Route
            path={routes.dashboard.home()}
            element={<DashboardHomePage />}
          />
          <Route path={routes.dashboard.articles.root()}>
            <Route index element={<DashboardArticlesPage />} />
            <Route path="new" element={<DashboardArticlesNewPage />} />
            <Route path=":id" element={<DashboardArticlesEditPage />} />
          </Route>
          <Route path={routes.dashboard.projects.root()}>
            <Route index element={<DashboardProjectsPage />} />
            <Route path="new" element={<DashboardProjectsNewPage />} />
            <Route path=":id" element={<DashboardProjectsEditPage />} />
          </Route>
          <Route path={routes.dashboard.tags()}>
            <Route index element={<DashboardTagsPage />} />
          </Route>
          <Route path={routes.dashboard.tools()}>
            <Route index element={<DashboardToolsPage />} />
          </Route>
        </Route>
      </Route>
      <Route
        path={routes.exceptions.accessDenied()}
        element={<AccessDenied />}
      />
    </>
  )
);

export function Router() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold">Please wait for a while</p>
            <p className="text-gray-700">Loading page...</p>
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
