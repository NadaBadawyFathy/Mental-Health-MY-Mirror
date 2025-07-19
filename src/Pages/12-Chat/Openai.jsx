const sendMsgGroq = async (message) => {
  const apiKey = "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";

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: "كلمني باللغة العربية فقط. " + message
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error.message || "حدث خطأ أثناء الاتصال بـ Groq");
  }

  const data = await res.json();
  return data.choices[0].message.content;
};
