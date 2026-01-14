
import { GoogleGenAI } from "@google/genai";

export const getMentorshipAdvice = async (prompt: string, userProfile: any, language: string) => {
  // Use process.env.API_KEY directly as required by the coding guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Correct model selection for simple Q&A tasks
      contents: prompt, // Use direct string for simple text prompts as recommended
      config: {
        systemInstruction: `Vous êtes un mentor expert en business sur la plateforme Skill Up Connect au Cameroun. 
        L'utilisateur est un(e) ${userProfile?.userType || 'utilisateur'}. 
        Aidez-les avec des conseils pratiques sur l'entrepreneuriat, la gestion financière ou le management dans le contexte du marché camerounais.
        Répondez en ${language === 'fr' ? 'français' : 'anglais'}.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Directly access the text property as per guidelines
    return response.text;
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return language === 'fr' 
      ? "Désolé, je ne peux pas générer de conseils pour le moment. Vérifiez votre connexion ou réessayez plus tard." 
      : "I'm sorry, I couldn't generate advice at this moment. Please check your connection or try again later.";
  }
};
