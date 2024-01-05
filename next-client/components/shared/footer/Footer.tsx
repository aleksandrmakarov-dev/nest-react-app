import { socialMediaLinks } from "@/lib/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full">
      <div className="bg-gray-100">
        <div className="max-w-screen-2xl w-full px-10 py-5 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2023 Aleksandr Makarov. All rights reserved.
          </p>
          <div className="space-x-3">
            {socialMediaLinks.map((item) => (
              <Link
                className="text-muted-foreground hover:text-muted-foreground/80"
                key={item.route}
                href={item.route}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
