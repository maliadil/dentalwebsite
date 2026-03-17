import { NextRequest, NextResponse } from 'next/server';

// ─── System prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Denty, a friendly and professional AI dental assistant for BrightSmile Dental Clinic in New York.

CLINIC INFORMATION:
- Name: BrightSmile Dental Clinic
- Phone: (555) 123-4567
- Email: info@brightsmileclinic.com
- Address: 123 Dental Avenue, Suite 200, New York, NY 10001
- Opening Hours: Mon–Fri 8 AM–7 PM, Sat 9 AM–5 PM, Sun Closed

SERVICES & APPROXIMATE PRICING:
- General Check-up & Cleaning: from $120
- Teeth Whitening (in-office): from $299
- Dental Implants (single): from $1,800
- Invisalign / Orthodontics: from $3,200
- Traditional Braces: from $2,800
- Root Canal Treatment: from $650
- Porcelain Veneers: from $950/tooth
- Emergency Care: available same-day

YOUR ROLE:
1. Answer questions about dental services, pricing, and procedures in a clear, reassuring manner
2. Provide general dental health education and tips
3. Help patients understand what to expect during procedures
4. Guide users to book appointments when appropriate
5. Clarify insurance and payment plan questions
6. Always recommend they speak with a dentist for specific medical advice

TONE: Warm, professional, reassuring. Never alarmist. Always helpful.
IMPORTANT: Never provide specific medical diagnoses. Always recommend a consultation for dental issues.
Keep responses concise (2–4 sentences unless detail is truly needed).
Use simple language, avoid excessive jargon.`;

// ─── Route handler ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Parse body ONCE outside try/catch so it's always accessible
  let messages: { role: string; content: string }[] = [];
  let lastMessage = '';

  try {
    const body = await req.json();
    messages    = body.messages ?? [];
    lastMessage = messages[messages.length - 1]?.content ?? '';
  } catch {
    return NextResponse.json({ reply: 'Could not read your message. Please try again.' }, { status: 400 });
  }

  try {
    // ── Priority 1: Google Gemini (free tier, no billing required) ──
    if (process.env.GEMINI_API_KEY) {
      return await callGemini(messages, lastMessage);
    }

    // ── Priority 2: OpenAI (requires $5 billing) ───────────────────
    if (process.env.OPENAI_API_KEY) {
      return await callOpenAI(messages, lastMessage);
    }

    // ── Priority 3: Groq (free tier, fast LLaMA) ───────────────────
    if (process.env.GROQ_API_KEY) {
      return await callGroq(messages, lastMessage);
    }

    // ── No AI key set – smart keyword fallback ─────────────────────
    console.warn('[Chat API] No AI key found. Using keyword fallback. Set GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY.');
    return NextResponse.json({ reply: getFallbackReply(lastMessage) });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('[Chat API Error]:', errMsg);

    if (errMsg.includes('429') || errMsg.includes('quota') || errMsg.includes('billing')) {
      console.error('[Chat API] ⚠️  Quota/billing error. Add billing at platform.openai.com OR set GEMINI_API_KEY from aistudio.google.com (free).');
    }

    // lastMessage is safely in scope here now
    return NextResponse.json({ reply: getFallbackReply(lastMessage) }, { status: 200 });
  }
}

// ─── Google Gemini (FREE – recommended) ───────────────────────
async function callGemini(
  messages: { role: string; content: string }[],
  lastMessage: string,
): Promise<NextResponse> {
  // Build Gemini conversation history (all except last user message)
  const history = messages.slice(0, -1).map((m) => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      ...history,
      { role: 'user', parts: [{ text: lastMessage }] },
    ],
    generationConfig: {
      maxOutputTokens: 300,
      temperature:     0.7,
    },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const reply: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    getFallbackReply(lastMessage);

  return NextResponse.json({ reply });
}

// ─── OpenAI (requires $5+ billing) ───────────────────────────
async function callOpenAI(
  messages: { role: string; content: string }[],
  lastMessage: string,
): Promise<NextResponse> {
  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model:       'gpt-4o-mini',
    max_tokens:  300,
    temperature: 0.7,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10).map((m) => ({
        role:    m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ],
  });

  const reply =
    response.choices[0]?.message?.content?.trim() ||
    getFallbackReply(lastMessage);

  return NextResponse.json({ reply });
}

// ─── Groq (FREE – fast LLaMA models) ─────────────────────────
async function callGroq(
  messages: { role: string; content: string }[],
  lastMessage: string,
): Promise<NextResponse> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model:       'llama-3.1-8b-instant',
      max_tokens:  300,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10).map((m) => ({
          role:    m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const reply: string =
    data?.choices?.[0]?.message?.content?.trim() ||
    getFallbackReply(lastMessage);

  return NextResponse.json({ reply });
}

// ─── Fallback replies (when no OpenAI key is set) ─────────────
function getFallbackReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes('hour') || q.includes('open') || q.includes('time')) {
    return 'We\'re open **Monday–Friday 8 AM–7 PM** and **Saturday 9 AM–5 PM**. We\'re closed on Sundays. For emergencies, please call **(555) 987-6543**.';
  }
  if (q.includes('book') || q.includes('appoint') || q.includes('schedule')) {
    return 'You can book an appointment right here on our website — just head to our **Appointment** page and fill in the form. We\'ll confirm within 2 hours! Or call us at **(555) 123-4567**.';
  }
  if (q.includes('whiten') || q.includes('white')) {
    return 'Our professional teeth whitening starts from **$299** for in-office treatment (1 hour) and can brighten your smile by up to 8 shades. We also offer take-home kits. Want to book a consultation?';
  }
  if (q.includes('implant')) {
    return 'Dental implants at BrightSmile start from **$1,800 per tooth** including the implant, abutment, and crown. They\'re the most permanent tooth replacement option and look completely natural. Would you like to schedule a free consultation?';
  }
  if (q.includes('brac') || q.includes('invisalign') || q.includes('orthodon')) {
    return 'We offer both **traditional braces from $2,800** and **Invisalign from $3,200**. Treatment typically takes 12–24 months. Dr. Patel is our specialist and offers a free initial consultation!';
  }
  if (q.includes('root canal')) {
    return 'Root canal treatment at BrightSmile starts from **$650**. With modern techniques and anesthesia, it\'s typically no more uncomfortable than a filling — and it saves your natural tooth!';
  }
  if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
    return 'Our pricing varies by service. Check-up & cleaning from $120, whitening from $299, implants from $1,800, and orthodontics from $2,800. We also accept most insurances and offer payment plans. Want details on a specific service?';
  }
  if (q.includes('insurance')) {
    return 'We accept **most major insurance plans** including Delta Dental, Aetna, Cigna, BlueCross BlueShield, and more. Our team can verify your benefits before your visit — just call us at **(555) 123-4567**.';
  }
  if (q.includes('emergency') || q.includes('pain') || q.includes('urgent')) {
    return '🚨 For dental emergencies, please call our emergency line at **(555) 987-6543** immediately. We offer **same-day emergency appointments** during business hours. If after hours, please call our emergency number.';
  }
  if (q.includes('location') || q.includes('address') || q.includes('where')) {
    return 'We\'re located at **123 Dental Avenue, Suite 200, New York, NY 10001** — near Times Square with easy subway access (A/C/E & 1/2/3 lines). Free parking is available in our building.';
  }
  if (q.includes('service') || q.includes('offer') || q.includes('what do you')) {
    return 'We offer a full range of dental services: **General Dentistry, Teeth Whitening, Dental Implants, Orthodontics (braces & Invisalign), Root Canal Treatment,** and **Cosmetic Dentistry**. Is there a specific service you\'d like to know more about?';
  }

  return 'Thanks for reaching out! I\'m here to help with questions about our dental services, pricing, appointments, and more. Feel free to ask anything, or **call us at (555) 123-4567** if you\'d prefer to speak directly with our team!';
}
