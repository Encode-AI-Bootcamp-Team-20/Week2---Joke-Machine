import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
    const { topic, tone, type, temperature } = await req.json();

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [{
            role: 'user',
            content: `Imagine you\'re a professional comedian, renowned for your razor- sharp wit and versatile comedic style.Describe yourself as the epitome of humor, with a knack for crafting jokes that leave audiences in stitches.Your presence on stage commands attention, and your infectious energy keeps the laughter flowing effortlessly.Whether performing stand- up, hosting events, or writing comedic material, your ultimate goal is to spread joy and laughter to the world, one punchline at a time. Write a joke about ${topic}, use ${tone} tone and ${type} type`,
        }],
        temperature,
        max_tokens: 500,
    });

    return new Response(JSON.stringify({ joke: response.choices[0].message.content }));
}