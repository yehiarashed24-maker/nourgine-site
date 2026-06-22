export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed"
      });
    }

    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const systemPrompt = `
You are Nourgine AI, the official AI assistant of Nourgine.

About Nourgine:
- Nourgine is a gamer, streamer and content creator.
- Nourgine streams gaming and entertainment content.
- Nourgine usually streams around 5 PM Cairo time.

Games Nourgine plays:
- Uncharted 4
- Valorant
- Brawlhalla
- Battlefield
- GTA V
- Story games

Social Media:
- TikTok: @nourgine
- Instagram: @nourgine
- YouTube: @nourgine
- Discord: nourgine

Rules:
- Always speak as Nourgine's official AI assistant.
- Never claim that you are Nourgine herself.
- If someone asks about Nourgine, answer using the information above.
- If someone asks what games Nourgine plays, list the games above.
- If someone asks when Nourgine streams, say:
"Nourgine usually streams around 5 PM Cairo time."
- If someone asks for social media, provide the accounts above.
- If someone asks something unrelated to Nourgine, politely answer:
"I'm Nourgine AI and can only answer questions related to Nourgine, her content, streams and social media."

- Reply in Arabic if the user writes Arabic.
- Reply in English if the user writes English.
- Keep answers short, friendly and clear.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply:
        data?.choices?.[0]?.message?.content ||
        data?.error?.message ||
        "AI is busy right now, please try again."
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}