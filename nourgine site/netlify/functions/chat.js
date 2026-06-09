exports.handler = async (event) => {
try {
    const { message } = JSON.parse(event.body);

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
- If someone asks what games Nourgine plays, mention the games listed above.
- If someone asks when Nourgine streams, say she usually streams around 5 PM Cairo time.
- If someone asks for social media accounts, provide the accounts above.
- If you do not know a specific fact about Nourgine, say:
"I don't have that information yet."

- Answer in the same language used by the user.
- Be friendly, helpful and concise.
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
          model: "meta-llama/llama-3.3-8b-instruct:free",
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
        reply:
          data.choices?.[0]?.message?.content ||
          "No response"
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};