import fetch from "node-fetch";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export async function getChatGPTResponse(req, res) {
  try {
    const prompt = req.body.prompt;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log("response", response.choices[0].message.content);
    return res
      .status(200)
      .json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Failed to get ChatGPT response:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}
