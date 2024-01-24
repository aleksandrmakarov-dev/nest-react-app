import { MarkdownPreview, PageSectionHeader } from "@/shared";
import markdown from "@/markdown/about-me.md";
import { Button } from "@/shared/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function AboutMePage() {
  return (
    <div className="max-w-screen-md">
      <PageSectionHeader preheader="Who is author?" header="About me" />
      <MarkdownPreview content={markdown} />
      <div className="mt-5 text-center">
        <Button size="lg" asChild>
          <a href="https://storage.googleapis.com/vocabulary-app/CV%20Aleksandr%20Makarov.pdf">
            <FontAwesomeIcon icon={faFilePdf} size="xl" className="mr-1.5" />
            <span>Download Resume</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
