import { Button } from "@/components/shared/ui/button";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ArticleShareProps {
  url?: string;
}

const shareItems = [
  {
    icon: faLink,
    url: (articleUrl: string) => articleUrl,
  },
  {
    icon: faTwitter,
    url: (articleUrl: string) => `http://twitter.com/share?${articleUrl}`,
  },
  {
    icon: faLinkedin,
    url: (articleUrl: string) => `http://twitter.com/share?${articleUrl}`,
  },
  {
    icon: faFacebook,
    url: (articleUrl: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
  },
];

export function ArticleShare(props: ArticleShareProps) {
  return (
    <ul className="flex flex-wrap gap-x-3">
      {shareItems.map((item, i) => (
        <li key={i}>
          <Button variant="secondary" size="icon" asChild>
            <Link target="_blank" href={item.url("/")}>
              <FontAwesomeIcon size="lg" icon={item.icon} />
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
