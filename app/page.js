"use client";

import { useState } from "react";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [result, setResult] = useState(null);

  const submitAnswers = async () => {
    const res = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, q1, q2 }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
      <h1>Ark Planı — Değerlendirme + Öğrenci Geçmişi</h1>

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

      {result && (
        <>
          <h2>Sonuç</h2>
          <pre>{JSON.stringify(result.scores, null, 2)}</pre>

          <h2>Öğrenci Geçmişi (Son 10 Kayıt)</h2>
          <pre>{JSON.stringify(result.history, null, 2)}</pre>
        </>
      )}
    </main>
  );
}
