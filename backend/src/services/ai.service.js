const { GoogleGenAI } = require("@google/genai")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
   
});

async function generate_caption(base64ImageFile){
    const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
  
];

const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: contents,
  config: {
      systemInstruction: `you are an expert in generating captions for images.
                        you generate single caption for image.
                        your caption should be short and concise.
                        you use hashtags and emojis in the caption.
                        generate capion in tapori language.
                        create aesthetic caption.
                        the caption should be in dark humor.
                        generate caption in hindi or english alternatively`,
    }
})
    return response.text;
}

module.exports = generate_caption