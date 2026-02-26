import json
import os
import shutil
from datetime import datetime

import pandas as pd
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

HISTORY_SRC = "data/history.json"
HISTORY_TMP = "/tmp/history.json"


def load_history():
    # İlk çağrıda repo içindeki history.json → /tmp içine kopyalanır
    if not os.path.exists(HISTORY_TMP):
        shutil.copy(HISTORY_SRC, HISTORY_TMP)

    with open(HISTORY_TMP, "r", encoding="utf-8") as f:
        return json.load(f)


def save_history(data):
    with open(HISTORY_TMP, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def handler(request):
    body = request.json()
    q1_answer = body.get("q1", "")
    q2_answer = body.get("q2", "")
    student_id = body.get("student_id", "anonymous")

    # Load reference dataset
    df = pd.read_csv("public/training_data.csv")
    reference_text = "\n".join(
        [
            f"Q{row.question_id} | A: {row.student_answer} | Score: {row.score}"
            for _, row in df.iterrows()
        ]
    )

    # Prompt
    prompt = f"""
You are an automated scoring model that evaluates short-answer student responses.
You must score ONLY according to the rubric given below and the reference examples.

### RUBRIC (0–3)
0 = Cevap tamamen yanlış.
1 = Kısmen doğru fakat eksik veya yüzeysel.
2 = Genel olarak doğru fakat bazı eksikler içeriyor.
3 = Tam doğru ve eksiksiz.

### REFERENCE DATA
{reference_text}

### STUDENT ANSWERS
Q1: Fotosentez nedir?
A1: {q1_answer}

Q2: Isı ile sıcaklık arasındaki fark nedir?
A2: {q2_answer}

### TASK
Return only JSON:
{{
  "q1": {{
    "score": <0–3>,
    "reason": "<short reason>"
  }},
  "q2": {{
    "score": <0–3>,
    "reason": "<short reason>"
  }}
}}
"""

    completion = client.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}]
    )

    result = completion.choices[0].message.content.strip()
    scores = json.loads(result)

    # Load history
    history = load_history()

    # Add new record
    entry = {
        "student_id": student_id,
        "timestamp": datetime.utcnow().isoformat(),
        "answers": {"q1": q1_answer, "q2": q2_answer},
        "scores": scores,
    }

    history.append(entry)

    save_history(history)

    return {"scores": scores, "history": history[-10:]}
