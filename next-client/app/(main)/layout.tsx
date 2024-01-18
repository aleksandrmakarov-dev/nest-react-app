import { Footer, Navbar } from "@/components/shared";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="min-h-screen">
      <Navbar className="sticky top-0 left-0 z-10" />
      <div className="flex-1 p-10 w-full max-w-screen-2xl mx-auto">
        {props.children}
      </div>
      <Footer />
    </main>
  );
}
