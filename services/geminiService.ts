
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const convertToColoringPage = async (base64Image: string, thickness: number): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Extract base64 data and mime type
  const match = base64Image.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image format");
  
  const mimeType = match[1];
  const data = match[2];

  const thicknessMap: Record<number, string> = {
    1: "very thin and delicate",
    2: "thin",
    3: "standard medium thickness",
    4: "bold and thick",
    5: "very thick and heavy"
  };

  const thicknessDesc = thicknessMap[thickness] || "standard medium thickness";

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: data,
            mimeType: mimeType,
          },
        },
        {
          text: `Transform this image into a clean coloring book page. Create sharp, clear black outlines that are ${thicknessDesc}. The entire background and all internal areas should be pure white. Remove all shading, textures, and colors. Just keep the essential black outlines for coloring. Ensure the lines are solid and consistent.`,
        },
      ],
    },
    config: {
        imageConfig: {
            aspectRatio: "1:1"
        }
    }
  });

  if (!response.candidates?.[0]?.content?.parts) {
      return null;
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return null;
};
