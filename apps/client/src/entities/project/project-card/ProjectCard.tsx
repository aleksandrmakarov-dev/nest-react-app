import { Button } from "@/shared/ui/button";
import { ProjectResponseDto } from "@/lib/dto/project/project-response.dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routing";

interface ProjectCardProps {
  rtl?: boolean;
  project: ProjectResponseDto;
}

export function ProjectCard(props: ProjectCardProps) {
  const { project, rtl } = props;

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-20">
      <div
        className={cn("flex flex-col justify-center", {
          "lg:order-2": rtl,
        })}
      >
        <div className="flex flex-wrap gap-3 items-center mb-3 lg:mb-5">
          {project.tools?.map((tool) =>
            tool.image ? (
              <img
                key={tool.id}
                className="object-center object-cover"
                alt={tool.name}
                src={tool.image}
                width={48}
                height={48}
              />
            ) : null
          )}
        </div>
        <h6 className="font-semibold text-3xl mb-5">{project.title}</h6>
        <p className="text-gray-600 mb-5">{project.description}</p>
        <div className="flex items-center">
          {project.url && (
            <Button className="mr-3" variant="secondary" asChild>
              <a href={project.url}>
                <FontAwesomeIcon className="mr-1.5" icon={faPlay} />
                <span>{project.label ?? "Demo"}</span>
              </a>
            </Button>
          )}
          {project.articleId && (
            <Button variant="text" asChild>
              <a href={routes.blog.byId(project.articleId)}>
                <span className="mr-1.5">Learn More</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "h-64 sm:h-96 w-full relative shrink-0 rounded-md overflow-clip"
        )}
      >
        {project.image && (
          <img
            className="object-center object-cover w-full h-full"
            alt="project"
            src={project.image}
          />
        )}
      </div>
    </div>
  );
}
