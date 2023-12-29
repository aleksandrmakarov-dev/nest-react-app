import { Button } from "@/components/shared/ui/button";
import { ChevronLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="px-5 sm:px-10 py-5 w-full">
        <Button variant="secondary">
          <ChevronLeft />
          Back
        </Button>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        {props.children}
      </div>
    </main>
  );
}
