import {
  IconDefinition,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export const routes = {
  root: "/",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    signOut: "/sign-out",
    forgotPassword: "/forgot-password",
    checkEmail: (email?: string) =>
      `/check-email${email ? `?email=${email}` : ""}`,
    verifyEmail: (email?: string) =>
      `/verify-email${email ? `?email=${email}` : ""}`,
  },
  blog: {
    root: "/blog",
    byId: (id: string) => route(routes.blog.root, id),
  },
  dashboard: {
    root: "/dashboard",
    home: () => route(routes.dashboard.root, "home"),
    articles: {
      root: () => route(routes.dashboard.root, "articles"),
      byId: (id: string) => route(routes.dashboard.articles.root(), id),
      new: () => route(routes.dashboard.articles.root(), "new"),
    },
    tags: () => route(routes.dashboard.root, "tags"),
    users: () => route(routes.dashboard.root, "users"),
    settings: {
      root: () => route(routes.dashboard.root, "settings"),
      profile: () => route(routes.dashboard.settings.root(), "profile"),
    },
  },
  aboutMe: "/about-me",
};

function route(...routes: string[]) {
  return routes.join("/");
}

export interface NavLink {
  name: string;
  route: string;
  icon?: IconDefinition;
}

interface SocialMediaLink {
  icon: IconDefinition;
  route: string;
}

export const socialMediaLinks: SocialMediaLink[] = [
  {
    icon: faGithub,
    route: "https://github.com",
  },
  {
    icon: faLinkedin,
    route: "https://linkedin.com",
  },
];
