import { MarkdownPreview, PageSectionHeader } from "@/shared";
import { Button } from "@/shared/ui/button";
import { LatestArticleList } from "@/widgets/article";
import { FeaturedProjectList } from "@/widgets/project";
import { routes } from "@/lib/routing";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import markdown from "@/markdown/about-me-short.md";

const contacts = [
  {
    icon: faLinkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aleksandr-makarov-397547252",
  },
  {
    icon: faGithub,
    name: "Github",
    url: "https://github.com/aleksandrmakarov-dev",
  },
  {
    icon: faFacebook,
    name: "Facebook",
    url: "/",
  },

  {
    icon: faEnvelope,
    name: "Email",
    url: "/",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="mx-auto max-w-screen-lg text-center">
          <h1 className="font-medium text-5xl sm:text-6xl mb-5">
            Hello, I&apos;m{" "}
            <span className="text-primary">Aleksandr Makarov</span>.
            <br />
            I&apos;m a software developer
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600 mb-10">
            Powerful, self-serve team engagement tools and analytics.
            Supercharge your managers & keep employees engaged from anywhere.
          </p>
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <span className="mr-2">Continue</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <div className="mb-14">
        <div className="flex flex-col-reverse gap-y-8 lg:grid lg:grid-cols-2 gap-x-14">
          <div className="text-lg">
            <PageSectionHeader
              id="about"
              className="mb-5 max-w-md"
              preheader="Who is author?"
              header="Find out more about him"
            />
            <MarkdownPreview className="mb-5" value={markdown} />
            <Button size="lg" asChild>
              <a href={routes.aboutMe}>Read more</a>
            </Button>
          </div>
          <div className="block relative min-h-96 w-full h-full">
            <img
              className="rounded-sm object-cover object-center"
              src="https://placekitten.com/800/637"
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="mb-14 bg-gray-50 py-14">
        <p className="font-medium text-lg text-center text-gray-600 mb-5">
          You can contact me here
        </p>
        <div className="flex items-center flex-wrap gap-7 justify-center">
          {contacts.map(({ icon, name, url }, i) => (
            <a
              target="_blank"
              className="text-2xl hover:text-primary"
              key={i}
              href={url}
            >
              <FontAwesomeIcon className="mr-2" icon={icon} />
              <span>{name}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="mb-14">
        <PageSectionHeader
          className="mb-10"
          preheader="What is he working on?"
          header="Featured projects"
          subheader={
            <>
              Need help with software development? Reach out to me{" "}
              <a
                target="_blank"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
                href={contacts[0].url}
              >
                here
              </a>
              .
            </>
          }
        />
        <FeaturedProjectList />
        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <a href="/">View all projects</a>
          </Button>
        </div>
      </div>
      <div>
        <PageSectionHeader
          className="mb-10"
          preheader="My blog"
          header="Latest blog posts"
          subheader="Tool and strategies modern teams need to help their companies grow."
        />
        <LatestArticleList />
        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <a href={routes.blog.root}>View all posts</a>
          </Button>
        </div>
      </div>
    </>
  );
}
