import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI image generation is not configured yet. Add OPENAI_API_KEY to .env.local." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const language = typeof body.language === "string" ? body.language : "Marathi";

    if (prompt.length < 8 || prompt.length > 1200) {
      return NextResponse.json({ error: "Prompt must be between 8 and 1200 characters." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Create a polished vertical 4:5 poster background for an Indian audience. Language preference for visual mood: ${language}. Design brief: ${prompt}. High-quality composition, beautiful lighting, clear central composition, no watermarks, no fake logos. Avoid rendering any text because the user will add editable text in the poster editor.`,
      size: "1024x1536"
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json({ error: "The image service returned no image. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ image: `data:image/png;base64,${b64}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected AI service error.";
    return NextResponse.json({ error: `Image generation failed: ${message}` }, { status: 500 });
  }
}
