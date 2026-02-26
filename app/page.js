"use client";

import { useEffect, useMemo, useState } from "react";
import { gradeAnswers, HISTORY_KEY } from "../lib/scoring.mjs";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setHistory(parsed);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const lastTenHistory = useMemo(() => history.slice(-10), [history]);

  const submitAnswers = () => {
    setError("");
    if (!q1.trim() || !q2.trim()) {
      setError("Lütfen iki soruyu da cevaplayın.");
      return;
    }

    const entry = gradeAnswers({ studentId, q1, q2 });

    setScores(entry.scores);
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => {
    setHistory([]);
    setScores(null);
    window.localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <main style={{ padding: 40, maxWidth: 760, margin: "0 auto" }}>
      <h1>Ark Planı — Değerlendirme (Vercel Uyumlu)</h1>
      <p>Bu sürüm API gerektirmez; tüm puanlama tarayıcıda çalışır.</p>

      <label htmlFor="studentId">Öğrenci ID</label>
      <input
        id="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="örn. ogrenci123"
      />

      <h3>Soru 1: Fotosentez nedir?</h3>
      <textarea value={q1} onChange={(e) => setQ1(e.target.value)} />

      <h3>Soru 2: Isı ile sıcaklık arasındaki fark nedir?</h3>
      <textarea value={q2} onChange={(e) => setQ2(e.target.value)} />

      {error ? <p style={{ color: "#b00020", fontWeight: 600 }}>{error}</p> : null}

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
