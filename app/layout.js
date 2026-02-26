import "./globals.css";

export const metadata = {
  title: "Makine Öğrenmesi Tabanlı Açık Uçlu Yanıt Değerlendirme Modelinin Fen Eğitiminde Geliştirilmesi ve Öğretmen Puanlamalarıyla Tutarlılığının Karşılaştırmalı Analizi",
  description: "Makine Öğrenmesi Tabanlı Açık Uçlu Yanıt Değerlendirme Modelinin Fen Eğitiminde Geliştirilmesi ve Öğretmen Puanlamalarıyla Tutarlılığının Karşılaştırmalı Analizi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
