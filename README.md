# Arkplan Rubric AI

Bu sürümde uygulama **API olmadan** çalışır:
- Cevap puanlama doğrudan `app/page.js` içinde yapılır.
- Geçmiş kayıtları tarayıcı `localStorage` içinde saklanır.
- Son 10 kayıt ekranda gösterilir.

## Neden 404 çözülür?

Bu repoya Next.js'in deploy edilebilmesi için gereken temel dosyalar eklendi:
- `package.json` (framework/scrips tanımı)
- `app/layout.js` (App Router için zorunlu root layout)

## Çalıştırma

```bash
npm install
npm run dev
```
