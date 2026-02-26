import "./globals.css";

export const metadata = {
  title: "Arkplan Rubric AI",
  description: "API'siz öğrenci yanıt değerlendirme uygulaması",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
