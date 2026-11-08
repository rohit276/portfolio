import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohit Gupta | AI/ML Engineer & Backend Developer",
  description:
    "Portfolio of Rohit Gupta, M.Tech AI student at Jain University. Computer vision, LLM integration and FastAPI backends.",
  openGraph: {
    title: "Rohit Gupta | AI/ML Engineer & Backend Developer",
    description: "Computer vision, LLM integration and FastAPI backends.",
    images: ["/rohit.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
