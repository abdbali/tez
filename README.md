# Arkplan Rubric AI

Vercel üzerinde çalışan, **API gerektirmeyen** Next.js uygulaması.

## Özellikler
- İki kısa cevap sorusu için istemci tarafında rubric puanlama.
- Sonuçların ve öğrenci geçmişinin tarayıcı `localStorage` içinde saklanması.
- Son 10 kaydın ekranda gösterimi.

## Proje Yapısı
- `app/layout.js`: Next.js App Router root layout.
- `app/page.js`: Form + skor gösterimi + geçmiş.
- `lib/scoring.mjs`: Rubric puanlama fonksiyonları.
- `tests/scoring.test.mjs`: Saf JS birim testleri (Node test runner).

## Lokal Çalıştırma
```bash
npm install
npm run dev
```

## Test
```bash
npm test
```

## Vercel Deploy
Bu repo doğrudan Vercel'e bağlandığında Next.js olarak algılanır ve deploy edilir.
