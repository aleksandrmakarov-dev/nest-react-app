import { ProjectCard } from "@/components/entities/project";
import { Button } from "@/components/shared/ui/button";
import { FeaturedProjectList } from "@/components/widgets/project";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const contacts = [
  {
    icon: faLinkedin,
    name: "LinkedIn",
    url: "/",
  },
  {
    icon: faGithub,
    name: "Github",
    url: "/",
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
    <div className="mx-auto max-w-screen-xl">
      <div className="min-h-screen flex items-center mb-14">
        <div className="mx-auto max-w-screen-lg text-center">
          <h1 className="font-medium text-5xl sm:text-6xl mb-5">
            Hello, I'm <span className="text-primary">Aleksandr Makarov</span>.
            <br />
            I'm a software developer
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600 mb-10">
            Powerful, self-serve team engagement tools and analytics.
            Supercharge your managers & keep employees engaged from anywhere.
          </p>
          <Button variant="secondary" size="lg">
            <span className="mr-2">View my work</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <div className="mb-14">
        <div className="flex flex-col-reverse gap-y-8 lg:grid lg:grid-cols-2 gap-x-14">
          <div className="text-lg">
            <div className="w-full">
              <p className="text-primary font-medium mb-2">Who is author?</p>
              <h2 id="about" className="text-4xl font-medium mb-5">
                Find out more about him
              </h2>
            </div>
            <p className="text-gray-600 mb-5">
              Yevgeniy (Jim) Brikman loves programming, writing, speaking,
              traveling, and lifting heavy things. He does not love talking
              about himself in the 3rd person. He is the co-founder of
              Gruntwork, a company that provides DevOps as a Service. He's also
              the author of two books published by O'Reilly Media: Hello,
              Startup and Terraform: Up & Running. Previously, he spent more
              than a decade building infrastructure and products that served
              hundreds of millions of users while working as a software engineer
              at LinkedIn, TripAdvisor, Cisco Systems, and Thomson Financial.
              For more info, check out his writing, speaking, projects, and
              photos.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Read more</Link>
            </Button>
          </div>
          <div className="hidden sm:block relative min-h-96 w-full h-full">
            <Image
              className="rounded-sm object-cover object-center"
              src="https://placekitten.com/800/637"
              alt="img"
              fill
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
            <Link className="text-2xl hover:text-primary" key={i} href={url}>
              <FontAwesomeIcon className="mr-2" icon={icon} />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-14">
        <div className="w-full max-w-xl mb-10">
          <p className="text-primary font-medium mb-2">
            What is he working on?
          </p>
          <h2 id="about" className="text-4xl font-medium mb-3">
            Featured projects
          </h2>
          <p className="text-gray-600 text-lg">
            Need help with software development? Reach out to me{" "}
            <Link
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              href="/"
            >
              here
            </Link>
            .
          </p>
        </div>
        <FeaturedProjectList />
        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link href="/">See more projects</Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="w-full max-w-xl mb-10">
          <p className="text-primary font-medium mb-2">Events</p>
          <h2 id="events" className="text-4xl font-medium mb-3">
            There are some events happend
          </h2>
          <p className="text-gray-600 text-lg">
            We’ve already helped over 4,000 companies achieve remarkable
            results.
          </p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-14 gap-y-5">
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
          <div className="p-5 border-l-4 border-indigo-400">
            <h5 className="font-medium text-lg">Share team inboxes</h5>
            <p className="text-gray-600">
              Whether you have a team of 2 or 200, our shared team inboxes keep
              everyone on the same page and in the loop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
