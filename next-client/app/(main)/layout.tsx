import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 p-10 w-full max-w-screen-2xl mx-auto">
        {props.children}
      </div>
      <Footer />
    </main>
  );
}
