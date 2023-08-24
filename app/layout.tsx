import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Raleway, Lobster_Two } from "next/font/google";

/* Define main fonts */
const raleway = Raleway({
  weight: ["100", "400", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`mx-12 lg:mx-64 xl:mx-72 ${raleway.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
