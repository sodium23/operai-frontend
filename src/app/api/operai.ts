export async function generateBlueprint(inputText: string, questionCount: number = 0) {
  const response = await fetch("https://operai.onrender.com/operai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input_text: inputText,
      question_count: questionCount,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
