# Tez Çalışması Uygulaması (Vercel Uyumlu)

Bu arayüz, aşağıdaki tez kapsamında açık uçlu yanıt değerlendirme denemesi için hazırlanmıştır:

- **Makine Öğrenmesi Tabanlı Açık Uçlu Yanıt Değerlendirme Modelinin Fen Eğitiminde Geliştirilmesi ve Öğretmen Puanlamalarıyla Tutarlılığının Karşılaştırmalı Analizi**
- **Development of a Machine Learning-Based Open-Ended Response Evaluation Model in Science Education and a Comparative Analysis of Its Consistency with Teacher Scoring**

## Özellikler
- Her soru için rubrik puanı ve geri bildirim gösterimi.
- Soru başlıklarının üzerinde `public/assets/1.png` ve `public/assets/2.png` görsellerinin gösterimi.
- Geçmiş kayıtların tablo olarak tutulması (ana sayfada varsayılan gizli).
- API olmadan istemci tarafında çalışma.

## Çalıştırma
```bash
npm install
npm run dev
```

## Test
```bash
npm test
```

## Soru Görselleri
- Varsayılan binary görseller repodan kaldırıldı.
- Lütfen kendi dosyalarınızı şu yollarla ekleyin:
  - `public/assets/1.png`
  - `public/assets/2.png`
