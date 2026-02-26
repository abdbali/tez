import "./globals.css";

export const metadata = {
  title: "TEZ - A.BALI",
  description: "A.BALI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
