import "./globals.css";

export const metadata = {
  title:
    "Makine Öğrenmesi Tabanlı Açık Uçlu Yanıt Değerlendirme Modelinin Fen Eğitiminde Geliştirilmesi",
  description:
    "Development of a Machine Learning-Based Open-Ended Response Evaluation Model in Science Education and a Comparative Analysis of Its Consistency with Teacher Scoring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
