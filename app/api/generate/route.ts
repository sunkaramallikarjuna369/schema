import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    if (type === 'image') return generateImage(prompt);
    if (type === 'video') return await generateVideo(prompt);
    return NextResponse.json({ error: 'Unknown generation type' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Return the Pollinations URL immediately — the browser loads the image asynchronously.
// Never fetch/probe server-side: Pollinations generates on first request (~15-30s).
function generateImage(prompt: string): NextResponse {
  const cleanPrompt = `Indian government welfare scheme visual: ${prompt}, clean infographic, vibrant colors, informative`;
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}` +
    `?model=flux&width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 9999)}`;
  return NextResponse.json({ type: 'image', url, source: 'pollinations' });
}

async function generateVideo(prompt: string): Promise<NextResponse> {
  const geminiKey = process.env.GEMINI_API_KEY ?? '';

  // Veo 2 requires a Google AI Studio key (AIza... prefix).
  if (geminiKey.startsWith('AIza')) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);

      const initRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-2.0-generate-001:predictLongRunning?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            instances: [{ prompt: `30-second video about Indian government scheme: ${prompt}` }],
            parameters: { aspectRatio: '16:9', sampleCount: 1 },
          }),
        }
      );
      clearTimeout(timer);

      if (initRes.ok) {
        const operation = await initRes.json();
        const operationName = operation.name as string | undefined;

        if (operationName) {
          for (let i = 0; i < 10; i++) {
            await new Promise((r) => setTimeout(r, 5000));
            const pollRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${geminiKey}`
            );
            if (!pollRes.ok) continue;
            const pollData = await pollRes.json();
            if (pollData.done) {
              const videoUri =
                pollData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
              if (videoUri) {
                return NextResponse.json({ type: 'video', url: videoUri, source: 'gemini-veo' });
              }
              break;
            }
          }
        }
      }
    } catch {
      // timed out or API error — fall through to script generation
    }
  }

  return generateVideoScript(prompt);
}

// Builds a 30-second video script using whichever LLM key is available.
// Tries Groq first (fast), falls back to OpenRouter, each with its own timeout.
async function generateVideoScript(prompt: string): Promise<NextResponse> {
  const groqKey = process.env.GROQ_API_KEY;
  const orKey = process.env.OPENROUTER_API_KEY;

  // Single user message (no system role) — more reliable across all endpoints.
  const userPrompt = `Write a 30-second video script for an informational video about this Indian government scheme: "${prompt}".

Use this format:
Scene 1 (0-8s): Visual: [what viewers see]. Narration: "[spoken text]"
Scene 2 (8-16s): Visual: [what viewers see]. Narration: "[spoken text]"
Scene 3 (16-24s): Visual: [what viewers see]. Narration: "[spoken text]"
Scene 4 (24-30s): Visual: [call-to-action]. Narration: "[spoken text]"

Key Message: [one sentence]
Apply at: [official government portal URL]

Keep it clear and encouraging for Indian citizens.`;

  // Try Groq
  if (groqKey) {
    const result = await callLLM(
      'https://api.groq.com/openai/v1/chat/completions',
      groqKey,
      'llama-3.3-70b-versatile',
      userPrompt,
      {}
    );
    if (result) return NextResponse.json({ type: 'video_script', content: result });
  }

  // Try OpenRouter as fallback
  if (orKey) {
    const result = await callLLM(
      'https://openrouter.ai/api/v1/chat/completions',
      orKey,
      'meta-llama/llama-3.3-70b-instruct',
      userPrompt,
      { 'HTTP-Referer': 'https://schemeseva.in', 'X-Title': 'SchemeSeva' }
    );
    if (result) return NextResponse.json({ type: 'video_script', content: result });
  }

  return NextResponse.json(
    { error: 'Video script generation failed. Please try again.' },
    { status: 503 }
  );
}

async function callLLM(
  url: string,
  key: string,
  model: string,
  userPrompt: string,
  extraHeaders: Record<string, string>
): Promise<string | null> {
  try {
    const controller = new AbortController();
    // 20s should be more than enough for a short completion
    const timer = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: userPrompt }],
        max_tokens: 700,
        temperature: 0.7,
      }),
    });

    clearTimeout(timer);

    if (!res.ok) return null;

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    return typeof content === 'string' && content.trim() ? content.trim() : null;
  } catch {
    return null;
  }
}
