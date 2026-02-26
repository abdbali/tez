"use client";

import { useEffect, useMemo, useState } from "react";
import { gradeAnswers, HISTORY_KEY } from "../lib/scoring.mjs";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);

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

  const historyRows = useMemo(() => [...history].reverse(), [history]);

  const submitAnswers = () => {
    setError("");
    if (!q1.trim() || !q2.trim()) {
      setError("Lütfen iki soruyu da cevaplayın.");
      return;
    }

    const entry = gradeAnswers({ studentId, q1, q2 });
    setResult(entry);
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
    window.localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <main style={{ padding: 40, maxWidth: 980, margin: "0 auto" }}>
      <h1>Tez Çalışması: Açık Uçlu Yanıt Değerlendirme Modeli</h1>
      <p>
        Makine Öğrenmesi Tabanlı Açık Uçlu Yanıt Değerlendirme Modelinin Fen Eğitiminde Geliştirilmesi ve
        Öğretmen Puanlamalarıyla Tutarlılığının Karşılaştırmalı Analizi
      </p>
      <p>
        Development of a Machine Learning-Based Open-Ended Response Evaluation Model in Science Education and
        a Comparative Analysis of Its Consistency with Teacher Scoring
      </p>

      <label htmlFor="studentId">Öğrenci ID</label>
      <input
        id="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="örn. ogrenci123"
      />

      <h3>1. Soru</h3>
      <img src="/assets/1.png" alt="Soru 1 görseli" className="question-image" />
      <p>Güneş tutulması, Ay hangi evredeyken ve günün hangi zamanında görülebilir?</p>
      <textarea value={q1} onChange={(e) => setQ1(e.target.value)} />

      <h3>2. Soru</h3>
      <img src="/assets/2.png" alt="Soru 2 görseli" className="question-image" />
      <p>Tutulma olayları sırasında hangi gök cisminin gölgesi hangi gök cisminin üzerine düşer?</p>
      <textarea value={q2} onChange={(e) => setQ2(e.target.value)} />

      {error ? <p style={{ color: "#b00020", fontWeight: 600 }}>{error}</p> : null}

      <button onClick={submitAnswers}>Gönder ve Değerlendir</button>
      <button onClick={clearHistory} style={{ marginTop: -4, background: "#eee" }}>
        Geçmişi Temizle
      </button>

      {result && (
        <section>
          <h2>Sonuç</h2>
          <p>
            <strong>Toplam Rubrik Puanı:</strong> {result.totalScore} / 6
          </p>

          <h3>Soru 1 Puanı: {result.scores.q1.score} / 3</h3>
          <ul>
            {result.scores.q1.feedback.map((item, idx) => (
              <li key={`q1-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>Soru 2 Puanı: {result.scores.q2.score} / 3</h3>
          <ul>
            {result.scores.q2.feedback.map((item, idx) => (
              <li key={`q2-${idx}`}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section style={{ marginTop: 24 }}>
        <button onClick={() => setShowHistory((s) => !s)}>
          {showHistory ? "Geçmiş Tablosunu Gizle" : "Geçmiş Tablosunu Göster"}
        </button>

        {showHistory ? (
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Öğrenci</th>
                  <th>Tarih</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Toplam</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.map((row, idx) => (
                  <tr key={`${row.timestamp}-${idx}`}>
                    <td>{row.student_id}</td>
                    <td>{new Date(row.timestamp).toLocaleString("tr-TR")}</td>
                    <td>{row.scores.q1.score}</td>
                    <td>{row.scores.q2.score}</td>
                    <td>{row.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  );
}
