exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are Nourgine AI, the official AI assistant of Nourgine.

About Nourgine:

- Nourgine is a gamer, streamer and content creator.
- Nourgine usually streams around 5 PM Cairo time.
- Nourgine creates gaming, live streaming and entertainment content.

Games Nourgine plays:
- uncharted 4
- Valorant
- brawlhalla
- battlefield 
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

- For all other questions, answer normally using your own knowledge.
- Answer in the same language used by the user.
- Arabic questions → answer in Arabic.
- English questions → answer in English.
- French questions → answer in French.
- Be friendly, helpful and concise.

User question:
${message}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          JSON.stringify(data)
      })
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};