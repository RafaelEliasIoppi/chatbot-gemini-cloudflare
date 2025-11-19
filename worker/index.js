export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      const body = await request.json();
      const userMessage = body.message;

      // Chamada ao Gemini via AI Gateway
      const response = await fetch(
        `https://gateway.ai.cloudflare.com/v1/${env.ACCOUNT_ID}/${env.GATEWAY_ID}/google-ai-studio/v1/models/gemini-pro:generateContent`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.GEMINI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userMessage }] }]
          })
        }
      );

      const result = await response.json();
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Use POST para enviar mensagens.", { status: 405 });
  }
}
