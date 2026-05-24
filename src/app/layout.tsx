import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./sync.css";
import "./atom-theme.css";

export const metadata: Metadata = {
  title: "MVOG Control Room",
  description: "Planificador interno de ideas, pipeline kanban y control operativo para MVOG.",
  applicationName: "MVOG Lab",
  manifest: "/manifest.webmanifest",
  themeColor: "#6aa8ff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MVOG Lab"
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
