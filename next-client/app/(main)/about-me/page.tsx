import path from "path";
import fs from "fs";
import { MarkdownPreview, PageSectionHeader } from "@/components/shared";

const filePath = path.join(process.cwd(), "public", "markdown", "about-me.md");

export default function AboutMePage() {
  const markdown = fs.readFileSync(filePath, "utf8");
  return (
    <div className="max-w-screen-md">
      <PageSectionHeader preheader="Who is author?" header="About me" />
      <MarkdownPreview content={markdown} />
    </div>
  );
}
