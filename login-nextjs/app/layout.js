import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "800"] });

export const metadata = {
  title: "Entrar | Portal de Estudos",
  description: "Acesse seus cursos na plataforma de estudos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
