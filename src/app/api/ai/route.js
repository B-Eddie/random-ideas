import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API, // Ensure this environment variable is set correctly
});

export async function POST(request) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Generate funny but stupid website ideas that nobody would take seriously but would be entertaining. Do not include an idea of the link.",
        },
        {
          role: "user",
          content: "Give me some funny and ridiculous website ideas.",
        },
      ],
      max_tokens: 150,
      temperature: 0.9,
    });

    const messageContent = response.choices[0].message?.content;
    console.log(messageContent)
    console.log(typeof messageContent)
    const ideas = {message: messageContent.toString()}

    return new Response(JSON.stringify({ ideas }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
