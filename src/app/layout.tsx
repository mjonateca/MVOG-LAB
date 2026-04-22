import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVOG Control Room",
  description: "Planificador interno de ideas, pipeline kanban y control operativo para MVOG.",
  applicationName: "MVOG Lab",
  manifest: "/manifest.webmanifest",
  themeColor: "#48f2a5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MVOG Lab"
  },
  icons: {
    icon: [
      { url: "/icons/brain-icon.png", type: "image/png" },
      { url: "/icons/brain-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/brain-icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
