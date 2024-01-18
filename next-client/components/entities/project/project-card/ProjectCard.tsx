import { Button } from "@/components/shared/ui/button";
import { ProjectResponseDto } from "@/lib/dto/project/project-response.dto";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";

interface ProjectCardProps {
  project: ProjectResponseDto;
}

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d2/C_Sharp_Logo_2023.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
];

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <div className="h-48 w-full sm:w-48 bg-gray-200 relative shrink-0 rounded-md overflow-clip">
        {project.image && <Image alt="project" src={project.image} fill />}
      </div>
      <div>
        <h6 className="font-medium text-2xl mb-3">{project.title}</h6>
        <p className="text-gray-600 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-3 items-center mb-5">
          {Array(Math.round(Math.random() * 4 + 1))
            .fill(1)
            .map((i) => (
              <img
                key={i}
                src={urls[Math.round(Math.random() * (urls.length - 1))]}
                alt="language"
                width={36}
                height={36}
              />
            ))}
        </div>
        <div className="flex items-center">
          {project.url && (
            <Button className="mr-3" variant="secondary" asChild>
              <Link href={project.url}>
                <FontAwesomeIcon className="mr-1.5" icon={faPlay} />
                <span>Demo</span>
              </Link>
            </Button>
          )}
          {project.articleId && (
            <Button variant="text" asChild>
              <Link href={project.articleId}>
                <span className="mr-1.5">Learn More</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
