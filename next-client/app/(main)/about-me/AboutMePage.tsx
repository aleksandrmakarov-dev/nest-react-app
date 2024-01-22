import { filePath } from "./page";

export default function AboutMePage() {
  const markdown = fs.readFileSync(filePath, "utf8");
  return <div>Me</div>;
}
