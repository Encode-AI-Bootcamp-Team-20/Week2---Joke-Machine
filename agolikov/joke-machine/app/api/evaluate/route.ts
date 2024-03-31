import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
    const { topic, tone, type, joke } = await req.json();

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [{
            role: 'user',
            content: `Evaluate a joke about ${topic}, in ${tone} tone and ${type} type:
            Topic Relevance: Does the joke align with the specified topic?
            Tone: Does the joke align with the specified tone?
            Type:  Does the joke match the requested type? 
            Explanation: The joke is the following: ${joke}. Group results in JSON format. Provide explanation for every property in separate fields in response.`,
        }],
        temperature: 1,
        max_tokens: 500,
    });

    return new Response(JSON.stringify({ evaluation: response.choices[0].message.content }));
}