# Tutulma Rubrik Uygulaması (Vercel Uyumlu)

Bu proje Next.js ile **API olmadan** çalışır ve iki soruyu rubriğe göre puanlar:
1. Güneş tutulması hangi ay evresinde ve günün hangi zamanında görülür?
2. Tutulma olaylarında hangi cismin gölgesi hangi cismin üzerine düşer?

## Özellikler
- Sonuç bölümünde her soru için **rubrik puanı** ve **feedback** listesi gösterilir.
- Geçmiş kayıtlar tablo olarak tutulur ancak ana sayfada varsayılan olarak gizlidir (butonla açılır).
- Geçmiş tablosu sınırsızdır ve tablo hücrelerinde border yoktur.
- Eğitim örnekleri `public/training_data.csv` dosyasında yer alır.

## Çalıştırma
```bash
npm install
npm run dev
```

## Test
```bash
npm test
```
