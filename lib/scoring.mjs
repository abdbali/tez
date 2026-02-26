export const HISTORY_KEY = "arkplan-history";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const includesAny = (text, words) => words.some((word) => text.includes(word));

export function scoreQ1EclipsePhaseTime(answer = "") {
  const text = normalize(answer);

  const hasNewMoon = includesAny(text, ["yeni ay", "yeniyay", "new moon"]);
  const hasDaytime = includesAny(text, ["gunduz", "gun icinde", "gun isig", "gunes gokyuzunde", "sabah", "ogle"]);
  const wrongNight = includesAny(text, ["gece", "yarisi", "aksam", "dolunay", "ilk dordun", "son dordun"]);

  let score = 0;
  const feedback = [];

  if (hasNewMoon) {
    feedback.push("Ay evresi için yeni ay bilgisi doğru.");
  } else {
    feedback.push("Güneş tutulması için doğru evre yeni aydır; cevapta net değil veya yanlış.");
  }

  if (hasDaytime) {
    feedback.push("Günün zamanı için gündüz ifadesi doğru.");
  } else {
    feedback.push("Güneş tutulması Güneş görünürken, yani gündüz gözlenir.");
  }

  if (hasNewMoon && hasDaytime) score = 3;
  else if ((hasNewMoon && !hasDaytime) || (!hasNewMoon && hasDaytime)) score = 2;
  else if (!hasNewMoon && !hasDaytime && !wrongNight && text.length > 0) score = 1;
  else score = 0;

  if (wrongNight && score > 0) {
    score -= 1;
    feedback.push("Cevapta gece/dolunay gibi yanlış bir ifade geçtiği için puan kırıldı.");
  }

  return { score, feedback };
}

export function scoreQ2ShadowBodies(answer = "") {
  const text = normalize(answer);

  const hasSolarContext = includesAny(text, ["gunes tutulmasi", "gunes tutulmasinda"]);
  const hasLunarContext = includesAny(text, ["ay tutulmasi", "ay tutulmasinda"]);

  const hasMoonShadow = text.includes("ay") && text.includes("golge");
  const hasEarthShadow = text.includes("dunya") && text.includes("golge");

  const hasMoonToEarth = hasSolarContext && hasMoonShadow && text.includes("dunya");
  const hasEarthToMoon = hasLunarContext && hasEarthShadow && text.includes("ay");

  const partialSolar = hasMoonShadow && text.includes("dunya");
  const partialLunar = hasEarthShadow && text.includes("ay");

  const wrongClaims = includesAny(text, ["gunesin golgesi", "rastgele", "golge olmaz"]);

  let score = 0;
  const feedback = [];

  if (hasMoonToEarth) {
    feedback.push("Güneş tutulması kısmında Ay gölgesinin Dünya'ya düştüğü doğru belirtilmiş.");
  } else {
    feedback.push("Güneş tutulmasında doğru ifade: Ay'ın gölgesi Dünya'nın üzerine düşer.");
  }

  if (hasEarthToMoon) {
    feedback.push("Ay tutulması kısmında Dünya gölgesinin Ay'a düştüğü doğru belirtilmiş.");
  } else {
    feedback.push("Ay tutulmasında doğru ifade: Dünya'nın gölgesi Ay'ın üzerine düşer.");
  }

  if (hasSolarContext && hasLunarContext && hasMoonToEarth && hasEarthToMoon) {
    score = 3;
  } else if ((partialSolar && partialLunar) || (hasSolarContext && partialSolar) || (hasLunarContext && partialLunar)) {
    score = 2;
  } else if (hasMoonShadow || hasEarthShadow) {
    score = 1;
  } else {
    score = 0;
  }

  if (wrongClaims && score > 0) {
    score -= 1;
    feedback.push("Yanlış/çelişkili ifade bulunduğu için puan düşürüldü.");
  }

  return { score, feedback };
}

export function gradeAnswers({ studentId = "", q1 = "", q2 = "" }) {
  const scores = {
    q1: scoreQ1EclipsePhaseTime(q1),
    q2: scoreQ2ShadowBodies(q2),
  };

  const totalScore = scores.q1.score + scores.q2.score;

  return {
    student_id: studentId.trim() || "anonymous",
    timestamp: new Date().toISOString(),
    answers: { q1, q2 },
    scores,
    totalScore,
  };
}
