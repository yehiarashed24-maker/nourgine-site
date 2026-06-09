exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const body = JSON.parse(event.body || "{}");
    const message = body.message;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Message is required"
        })
      };
    }

    const systemPrompt = `
You are Nourgine AI, the official AI assistant of Nourgine.

About Nourgine:
- Nourgine is a gamer, streamer and content creator.
- Nourgine usually streams around 5 PM Cairo time.
- Nourgine creates gaming, live streaming and entertainment content.

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

Instructions:
- If someone asks who Nourgine is, explain that she is a gamer, streamer and content creator.
- If someone asks what games Nourgine plays, mention the games above.
- If someone asks when Nourgine streams, say she usually streams around 5 PM Cairo time.
- If someone asks for social media accounts, provide the accounts above.
- If you don't know something specific about Nourgine, say:
"I don't have that information yet."

- Answer in the same language as the user.
- Be friendly and concise.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

return {
  statusCode: 200,
  body: JSON.stringify({
    debug: data,
    reply:
      data?.choices?.[0]?.message?.content ||
      "No response"
  })
};

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};