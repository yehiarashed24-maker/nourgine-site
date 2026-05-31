exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

   const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are Nourgine AI.

Information:
- Creator name: Nourgine
- TikTok: @nourgine
- Instagram: @nourgine
- YouTube: @nourgine
- Discord: nourgine

Answer naturally and briefly.

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

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
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