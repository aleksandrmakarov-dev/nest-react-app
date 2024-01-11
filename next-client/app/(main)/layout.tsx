import { Footer, Navbar } from "@/components/shared";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="flex-1 p-10 w-full max-w-screen-2xl mx-auto">
        {props.children}
      </div>
      <Footer />
    </main>
  );
}
