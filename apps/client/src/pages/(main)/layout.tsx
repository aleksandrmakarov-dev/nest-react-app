import { Footer, Navbar } from "@/shared";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar className="sticky top-0 left-0 z-10" />
      <div className="flex-1 p-10 w-full max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
