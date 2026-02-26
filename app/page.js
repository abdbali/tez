"use client";

import { useEffect, useMemo, useState } from "react";

const HISTORY_KEY = "arkplan-history";

function scorePhotosynthesis(answer) {
  const text = answer.toLowerCase();
  const hasBitki = text.includes("bitki");
  const hasIsik = text.includes("ışık") || text.includes("isik") || text.includes("güneş");
  const hasBesin = text.includes("besin") || text.includes("glikoz");
  const hasO2 = text.includes("oksijen");

  const points = [hasBitki, hasIsik, hasBesin, hasO2].filter(Boolean).length;

  if (points >= 4) return { score: 3, reason: "Bitki, ışık, besin üretimi ve oksijen ilişkisi doğru." };
  if (points >= 3) return { score: 2, reason: "Cevap genel olarak doğru ancak bazı bileşenler eksik." };
  if (points >= 1) return { score: 1, reason: "Kısmi doğruluk var fakat açıklama yüzeysel." };
  return { score: 0, reason: "Fotosentezin temel tanımı doğru kurulmamış." };
}

function scoreHeatVsTemperature(answer) {
  const text = answer.toLowerCase();
  const hasIsi = text.includes("ısı") || text.includes("isi");
  const hasSicaklik = text.includes("sıcaklık") || text.includes("sicaklik");
  const hasEnergy = text.includes("enerji") || text.includes("aktar");
  const hasKinetic = text.includes("kinetik") || text.includes("tanecik") || text.includes("ortalama");
  const saysSame = text.includes("aynı") || text.includes("fark yok");

  if (saysSame) {
    return { score: 0, reason: "Isı ve sıcaklık farklı kavramlardır; aynı denmiş." };
  }

  const points = [hasIsi, hasSicaklik, hasEnergy, hasKinetic].filter(Boolean).length;

  if (points >= 4) {
    return { score: 3, reason: "Isı (enerji aktarımı) ve sıcaklık (ortalama kinetik durum) doğru ayrılmış." };
  }
  if (points >= 3) return { score: 2, reason: "Genel ayrım doğru ancak açıklama tam değil." };
  if (points >= 1) return { score: 1, reason: "Kısmi doğruluk var fakat kavramsal eksikler mevcut." };
  return { score: 0, reason: "Kavramların farkı doğru açıklanmamış." };
}

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const lastTenHistory = useMemo(() => history.slice(-10), [history]);

  const submitAnswers = () => {
    const q1Score = scorePhotosynthesis(q1);
    const q2Score = scoreHeatVsTemperature(q2);

    const computedScores = { q1: q1Score, q2: q2Score };
    const entry = {
      student_id: studentId || "anonymous",
      timestamp: new Date().toISOString(),
      answers: { q1, q2 },
      scores: computedScores,
    };

    setScores(computedScores);
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <main style={{ padding: 40, maxWidth: 760, margin: "0 auto" }}>
      <h1>Ark Planı — Değerlendirme (API’siz)</h1>
      <p>Değerlendirme uygulama içinde yapılır, geçmiş tarayıcıda saklanır.</p>

      <label>Öğrenci ID:</label>
      <input
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="örn. ogrenci123"
      />

      <h3>Soru 1: Fotosentez nedir?</h3>
      <textarea value={q1} onChange={(e) => setQ1(e.target.value)} />

      <h3>Soru 2: Isı ile sıcaklık arasındaki fark nedir?</h3>
      <textarea value={q2} onChange={(e) => setQ2(e.target.value)} />

      <button onClick={submitAnswers}>Gönder ve Değerlendir</button>
      <button onClick={clearHistory} style={{ marginTop: -4, background: "#eee" }}>
        Geçmişi Temizle
      </button>

      {scores && (
        <>
          <h2>Sonuç</h2>
          <pre>{JSON.stringify(scores, null, 2)}</pre>
        </>
      )}

      <h2>Öğrenci Geçmişi (Son 10 Kayıt)</h2>
      <pre>{JSON.stringify(lastTenHistory, null, 2)}</pre>
    </main>
  );
}
