import {
  IconDefinition,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export const Routing = {
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
  },
  aboutMe: "/about-me",
};

interface NavLink {
  name: string;
  route: string;
}

export const navLinks: NavLink[] = [
  {
    name: "Home",
    route: Routing.root,
  },
  {
    name: "Blog",
    route: Routing.blog.root,
  },
  {
    name: "About me",
    route: Routing.aboutMe,
  },
];

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
