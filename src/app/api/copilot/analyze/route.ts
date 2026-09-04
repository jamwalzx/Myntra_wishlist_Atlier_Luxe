import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: Request) {
  try {
    // Instantiate Groq inside the handler to prevent build-time errors if env vars are missing
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'missing-key',
    });
    const { products, intent } = await request.json();

    if (!products || products.length < 2) {
      return NextResponse.json({ error: 'At least 2 products required for comparison.' }, { status: 400 });
    }

    // Construct a strict system prompt enforcing the constraints
    const systemPrompt = `You are the Atelier Luxe AI Shopping Copilot.
Your job is to act as an expert personal stylist and help the user choose the best fashion item from a provided shortlist based on their specific intent.

CRITICAL CONSTRAINTS:
1. You must ONLY recommend one of the exact products provided in the "PRODUCTS_DATA" below. Do not hallucinate or suggest external items.
2. Rely strictly on the attributes provided (price, rating, material, occasion_tags, etc.). Do not hallucinate product details.
3. You must output your response STRICTLY as a valid JSON object. No markdown wrapping, no extra text.

JSON OUTPUT FORMAT:
{
  "best_match": "The EXACT string ID of the recommended product",
  "confidence": "High | Medium | Low",
  "reasons": [
    "Brief, punchy reason 1 for why this fits the intent",
    "Brief, punchy reason 2",
    "Brief, punchy reason 3"
  ],
  "uncertainties": [
    "Any potential fit/style warning about the recommended item, e.g., 'Fabric might be too heavy for summer'"
  ],
  "comparison_matrix": {
    "product_id_1": { "occasion_fit": "High | Med | Low", "size_confidence": "High | Med | Low" },
    "product_id_2": { "occasion_fit": "High | Med | Low", "size_confidence": "High | Med | Low" }
  }
}`;

    const userPrompt = `
USER INTENT:
Occasion: ${intent.occasion || 'Not specified'}
Custom Request: ${intent.customText || 'Not specified'}
Preferences:
- Ease over Structure: ${intent.preferences.easeOverStructure ? 'Yes' : 'No'}
- Natural Fibers: ${intent.preferences.naturalFibers ? 'Yes' : 'No'}

PRODUCTS_DATA:
${JSON.stringify(products, null, 2)}

Analyze the products against the user intent and provide the JSON response.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      // Use a fast and capable model from Groq
      model: 'qwen/qwen3.8-27b',
      temperature: 0.1, // low temp for deterministic structured output
      response_format: { type: 'json_object' }
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from Groq");
    }

    const result = JSON.parse(content);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error in Groq API route:', error);
    return NextResponse.json({ error: 'Failed to analyze products' }, { status: 500 });
  }
}
