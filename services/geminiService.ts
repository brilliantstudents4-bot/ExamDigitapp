
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { OCRResult } from "../types";

export const performOCR = async (base64Data: string, mimeType: string): Promise<OCRResult> => {
  try {
    // Fixed: Initializing GoogleGenAI according to guidelines using process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using Gemini 3 Flash Preview for a good balance of speed and high-fidelity layout preservation
    const prompt = `
      You are an expert OCR and document digitizer. 
      Analyze the attached image of an exam paper and extract ALL text with 100% accuracy.
      
      CRITICAL RULES:
      1. Preserve the exact layout of the exam.
      2. Keep question numbers (e.g., Q1, 1., أ، ب، ج) exactly as they appear.
      3. Maintain headers, titles, and sub-titles.
      4. Maintain all paragraph structures and spacing.
      5. Preserve punctuation and mathematical symbols exactly.
      6. Support Arabic language perfectly, ensuring RTL text flows correctly.
      7. Output the result in clean Markdown format to preserve structure (headers, lists, tables if any).
      8. Do NOT add any introductory text, comments, or summaries. ONLY output the extracted content.
      9. If you see handwriting, digitize it as clearly as possible.
      10. Maintain blank lines or placeholders (like ........ or ______) where they appear.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          { text: prompt },
        ],
      },
    });

    const extractedText = response.text || '';
    
    if (!extractedText) {
      return { success: false, text: '', error: 'لم يتم العثور على نص في الصورة.' };
    }

    return { success: true, text: extractedText };
  } catch (error: any) {
    console.error('OCR Error:', error);
    return { 
      success: false, 
      text: '', 
      error: error.message || 'حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.' 
    };
  }
};
