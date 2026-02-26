import test from "node:test";
import assert from "node:assert/strict";
import { scorePhotosynthesis, scoreHeatVsTemperature, gradeAnswers } from "../lib/scoring.mjs";

test("scorePhotosynthesis gives high score for complete answer", () => {
  const result = scorePhotosynthesis(
    "Bitkiler ışık kullanarak karbondioksit ve suyla besin üretir, oksijen açığa çıkarır.",
  );
  assert.equal(result.score, 3);
});

test("scoreHeatVsTemperature returns 0 when concepts are said to be same", () => {
  const result = scoreHeatVsTemperature("Isı ve sıcaklık aynı şeydir.");
  assert.equal(result.score, 0);
});

test("gradeAnswers returns expected envelope", () => {
  const entry = gradeAnswers({ studentId: "ogrenci1", q1: "bitki ışık besin", q2: "ısı enerji sıcaklık" });
  assert.equal(entry.student_id, "ogrenci1");
  assert.ok(entry.timestamp);
  assert.ok(entry.scores.q1);
  assert.ok(entry.scores.q2);
});
