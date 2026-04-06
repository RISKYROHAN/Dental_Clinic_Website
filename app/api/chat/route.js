import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

// Keep socket alive during generation
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-3.1-flash-lite-preview'), // Updated to Gemini 3 Flash per user selection
      system: `You are the friendly, helpful AI Receptionist for "Digital Clinic". 
      The clinic is located at: 1, Camac St, Kolkata, West Bengal 700016.
      Operating Hours: Mon - Sat: 9:00 AM - 8:00 PM.
      Contact: contact@digitalclinic.com, +91 98765 43210.
      The lead specialist is Dr. John Smith, a highly acclaimed expert in Endodontics with 15+ years of experience.
      Services offered: General Checkups, Tooth Pain resolution, Cosmetic Dentistry (Tooth Whitening), and more.
      
      Rules for your responses:
      1. Always be welcoming, polite, and enthusiastically professional.
      2. If a user asks a medical question, state clearly that you are an AI assistant and they should book an appointment to see Dr. Smith for physical medical advice.
      3. Encourage users to use the 'Book Your Appointment' form on the website or call the clinic if they want to physically schedule a time.
      4. Try to keep responses concise and easy to read.
      5. Never make up prices or policies.`,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content || (msg.parts ? msg.parts.map(p => p.text).join('') : '') || '.',
      })),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    // Enhanced logging for production troubleshooting
    console.error('Chat API Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return new Response(
      JSON.stringify({ error: 'Chat processing failed', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
