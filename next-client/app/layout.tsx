import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import QueryProvider from "@/context/query-provider/QueryProvider";
import { AuthProvider } from "@/context/auth-provider/AuthProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getSession } from "@/session";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider session={session}>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
