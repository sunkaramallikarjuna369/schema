import { NextRequest } from 'next/server';

function buildSystemPrompt(): string {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  });
  return `You are SchemeSeva's expert Scheme Assistant — a knowledgeable, helpful guide for Indian citizens seeking information about government welfare schemes.

Today's date: ${today} (IST)

You have deep expertise in:
- Central government schemes: PM-KISAN, PMAY, PMJAY/Ayushman Bharat, PM MUDRA Yojana, PM Scholarship Scheme, Stand-Up India, PM Jan Dhan Yojana, Beti Bachao Beti Padhao, PM Ujjwala Yojana, Skill India, PMEGP, PMSBY (Pradhan Mantri Suraksha Bima Yojana), PMJJBY, PM Fasal Bima Yojana, National Pension Scheme, Sukanya Samriddhi Yojana, Atal Pension Yojana, PM SVANidhi, PMAY-Gramin, PMUY, PM Kaushal Vikas Yojana, Start-Up India, Make in India, Digital India, and 1200+ more.
- State-specific schemes for all 28 states and 8 union territories in India.
- Eligibility criteria: income limits, age ranges, caste/category requirements (SC/ST/OBC/General/EWS), occupation requirements, marital status conditions, disability status.
- Required documents for each scheme: Aadhaar, income certificate, caste certificate, land records, bank passbook, residence proof, passport photo, etc.
- Step-by-step online and offline application processes.
- Important deadlines, financial assistance amounts, and benefit details.
- Official government portal links (pmkisan.gov.in, pmjay.gov.in, pmaymis.gov.in, mudra.org.in, etc.)

Response Guidelines:
1. Always answer in simple, clear language that any Indian citizen can understand.
2. If the user writes in Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, or Malayalam — respond fully in that language.
3. Break down eligibility criteria point-by-point.
4. List required documents in a numbered format.
5. Always include the official website for applications.
6. For financial questions, give exact amounts in Indian Rupees (₹).
7. When comparing schemes, use a clear side-by-side format.
8. Be warm, encouraging, and patient — many users may be first-time beneficiaries.
9. If a scheme deadline has passed, mention the next application window if known.
10. Always recommend cross-verifying details on official government portals before applying.

Special Instructions:
- When asked about image generation (e.g. "generate image", "create infographic", "show me a picture"), acknowledge you are generating it.
- When asked about video generation, acknowledge you are creating the video.
- Never make up scheme names or benefits — only provide accurate information.
- For ambiguous profiles, ask 1-2 clarifying questions (age, state, income) before recommending schemes.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const orKey = process.env.OPENROUTER_API_KEY;

    const requestBody = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...messages,
      ],
      stream: true,
      max_tokens: 1500,
      temperature: 0.7,
    };

    if (groqKey) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (groqRes.ok) {
        return new Response(groqRes.body, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }
    }

    // Fallback to OpenRouter
    if (orKey) {
      const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${orKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://schemeseva.in',
          'X-Title': 'SchemeSeva',
        },
        body: JSON.stringify({
          ...requestBody,
          model: 'meta-llama/llama-3.3-70b-instruct',
        }),
      });

      if (orRes.ok) {
        return new Response(orRes.body, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'No API key available or all providers failed' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
