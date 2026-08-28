import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "NutriSaaS - Gestão para Nutricionistas",
  description: "Plataforma completa de gestão e dietas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body 
        className="min-h-screen transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white" 
        suppressHydrationWarning
      >
        {/* O ThemeProvider embrulha todo o site aqui */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}