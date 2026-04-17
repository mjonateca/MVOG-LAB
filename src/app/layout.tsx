import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVOG Control Room",
  description: "Planificador interno de ideas, pipeline kanban y control operativo para MVOG."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
