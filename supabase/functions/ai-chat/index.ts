import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, chatHistory = [] } = await req.json();

    if (!message || !sessionId) {
      throw new Error('Message and session ID are required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build conversation context
    const systemPrompt = `You are a helpful AI assistant for PromptlyCoach, a company that provides AI consulting and automation services. 

About PromptlyCoach:
- We specialize in AI consulting, automation solutions, and digital transformation
- We help businesses implement AI tools like chatbots, automation workflows, and data analysis
- We offer free consultations and custom AI solutions
- Our services include: AI strategy consulting, custom AI development, automation implementation, training and support
- We work with businesses of all sizes to implement practical AI solutions that save time and money

Your role:
- Answer questions about our services, pricing, and capabilities
- Help visitors understand how AI can benefit their business
- Guide them towards booking a free consultation if they're interested
- Be conversational, helpful, and professional
- If you don't know something specific, offer to connect them with our team

Common FAQs:
- What services do you offer? (AI consulting, automation, custom development)
- How much does it cost? (Varies by project, free consultation available)
- How long does implementation take? (Depends on complexity, typically 2-8 weeks)
- Do you provide ongoing support? (Yes, we offer maintenance and support packages)
- What industries do you work with? (All industries, especially SMBs looking to automate)

Keep responses helpful, concise, and focused on solving the customer's needs.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Store the AI response in the database using the actual session ID (database ID)
    const { error: insertError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId, // This should be the database session ID
        message: aiResponse,
        sender_type: 'bot',
        sender_name: 'PromptlyCoach AI',
      });

    if (insertError) {
      console.error('Error storing AI response:', insertError);
    } else {
      console.log('AI response stored successfully');
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        success: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});