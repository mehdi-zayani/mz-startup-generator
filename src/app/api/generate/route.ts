import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    const prompt = theme
      ? `Generate a creative startup idea related to "${theme}". Include a short description and potential market.`
      : "Generate a random unique startup idea with a catchy name, short description, and potential audience.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const idea = completion.choices[0]?.message?.content ?? "No idea generated.";

    return NextResponse.json({ idea });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate idea" }, { status: 500 });
  }
}
