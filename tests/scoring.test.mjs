import test from "node:test";
import assert from "node:assert/strict";
import { scoreQ1EclipsePhaseTime, scoreQ2ShadowBodies, gradeAnswers } from "../lib/scoring.mjs";

test("q1 full correct answer gets 3", () => {
  const result = scoreQ1EclipsePhaseTime("Güneş tutulması yeni ay evresinde ve gündüz görülür.");
  assert.equal(result.score, 3);
  assert.ok(Array.isArray(result.feedback));
});

test("q1 wrong night answer gets 0", () => {
  const result = scoreQ1EclipsePhaseTime("Dolunayda gece olur.");
  assert.equal(result.score, 0);
});

test("q2 full correct mapping gets 3", () => {
  const result = scoreQ2ShadowBodies(
    "Güneş tutulmasında Ay'ın gölgesi Dünya'ya, Ay tutulmasında Dünya'nın gölgesi Ay'a düşer.",
  );
  assert.equal(result.score, 3);
});

test("q2 partial answer gets 1-2 band", () => {
  const result = scoreQ2ShadowBodies("Ay'ın gölgesi Dünya'ya düşer.");
  assert.ok(result.score >= 1 && result.score <= 2);
});

test("gradeAnswers includes totalScore", () => {
  const entry = gradeAnswers({
    studentId: "ogrenci1",
    q1: "yeni ay ve gündüz",
    q2: "Ay gölgesi Dünya'ya, Dünya gölgesi Ay'a",
  });
  assert.equal(entry.student_id, "ogrenci1");
  assert.equal(typeof entry.totalScore, "number");
  assert.ok(entry.totalScore >= 0 && entry.totalScore <= 6);
});
