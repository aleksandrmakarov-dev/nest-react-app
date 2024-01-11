import { SectionHeader, SectionQuestion } from "@/components/shared";
import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { routes } from "@/lib/routing";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="w-full max-w-screen-md mx-auto text-secondary-foreground">
        <div className="mb-3 flex justify-center">
          <Badge variant="outline" className="pl-0.5 space-x-2">
            <Badge variant="text">Looking for a job</Badge>
            <span>Would like me to join your team?</span>
          </Badge>
        </div>
        <h1 className="font-medium text-5xl text-center mb-5">
          Creating stylish, functional and memorable software
        </h1>
        <p className="text-center mb-10 text-lg">
          - I am a full stack software developer how specialise in web
          development
        </p>
        <div className="grid grid-cols-2 space-x-3 max-w-md mx-auto mb-5">
          <Button className="h-12" variant="outline" asChild>
            <Link href={routes.root}>See projects</Link>
          </Button>
          <Button className="h-12" variant="default" asChild>
            <Link href={routes.root}> Contact me</Link>
          </Button>
        </div>
      </div>
      <div className="w-full h-72 bg-blue-100 rounded-md mb-10" />
      <div className="mb-10">
        <SectionQuestion>Who is author?</SectionQuestion>
        <div className="grid grid-cols-2 gap-x-10">
          <div>
            <SectionHeader>
              Maecenas a finibus urna. Praesent cursus risus et nunc ultrices
              tristique.
            </SectionHeader>
            <p className="mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              hendrerit erat eget arcu tincidunt, nec lobortis eros ullamcorper.
              Vivamus sed augue sapien. Sed at tincidunt justo, at eleifend
              libero. Mauris rhoncus vehicula neque, sed eleifend urna cursus
              sed. Pellentesque vehicula diam nunc, in ornare nibh dictum ac.
              Praesent pharetra purus dolor, at maximus neque sagittis ac. Nunc
              a arcu tempus, euismod ante eleifend, ultricies augue.
            </p>
            <p>
              Aliquam tempor odio vitae tincidunt finibus. Proin venenatis
              mauris semper nisi luctus, ac malesuada arcu condimentum. Nulla et
              vestibulum augue. Etiam at maximus urna, ut elementum ex.
              Phasellus lacinia felis a metus iaculis, ac aliquam ex semper.
              Phasellus vel nisl est. Nam euismod est vitae dolor feugiat
              placerat.
            </p>
          </div>
          <div className="relative">
            <Image
              alt="img"
              src="/image-1.jpg"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
