export const HISTORY_KEY = "arkplan-history";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function scorePhotosynthesis(answer = "") {
  const text = normalize(answer);

  const hasPlant = text.includes("bitki");
  const hasLight = text.includes("isik") || text.includes("gunes");
  const hasFood = text.includes("besin") || text.includes("glikoz");
  const hasOxygen = text.includes("oksijen");
  const hasCo2 = text.includes("karbondioksit") || text.includes("co2");

  const points = [hasPlant, hasLight, hasFood, hasOxygen || hasCo2].filter(Boolean).length;

  if (points >= 3) {
    return { score: 3, reason: "Fotosentezin temel bileşenleri büyük ölçüde doğru verilmiş." };
  }
  if (points === 2) {
    return { score: 2, reason: "Açıklama genel olarak doğru, ancak bazı bileşenler eksik." };
  }
  if (points >= 1) {
    return { score: 1, reason: "Kısmi doğruluk var; cevap sınırlı ve yüzeysel." };
  }
  return { score: 0, reason: "Fotosentez tanımı rubriğe göre yetersiz veya yanlış." };
}

export function scoreHeatVsTemperature(answer = "") {
  const text = normalize(answer);

  const saysSame = text.includes("ayni") || text.includes("fark yok") || text.includes("esit");
  if (saysSame) {
    return { score: 0, reason: "Isı ve sıcaklık farklı kavramlardır; aynı oldukları belirtilmiş." };
  }

  const hasHeat = text.includes("isi");
  const hasTemp = text.includes("sicaklik");
  const hasTransfer = text.includes("enerji") || text.includes("aktar");
  const hasKinetic = text.includes("kinetik") || text.includes("tanecik") || text.includes("ortalama");

  const points = [hasHeat, hasTemp, hasTransfer, hasKinetic].filter(Boolean).length;

  if (points >= 4) {
    return { score: 3, reason: "Isı ve sıcaklık farkı doğru ve eksiksiz açıklanmış." };
  }
  if (points === 3) {
    return { score: 2, reason: "Ayrım doğru, fakat açıklamada küçük eksikler var." };
  }
  if (points >= 1) {
    return { score: 1, reason: "Kısmi doğru ifade var, kavramsal netlik düşük." };
  }
  return { score: 0, reason: "Isı–sıcaklık farkı rubriğe uygun şekilde açıklanmamış." };
}

export function gradeAnswers({ studentId = "", q1 = "", q2 = "" }) {
  const scores = {
    q1: scorePhotosynthesis(q1),
    q2: scoreHeatVsTemperature(q2),
  };

  return {
    student_id: studentId.trim() || "anonymous",
    timestamp: new Date().toISOString(),
    answers: { q1, q2 },
    scores,
  };
}
