import axios from "axios";
import { getModel } from "../config/llmModels.js";

export const visionAgent = async (state) => {
  const llm = await getModel("image");
  const res = await llm.invoke(`
        Your are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:

- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful colo palette
- sharp focus
- 8K quality
- Photorealistic
- Depth of field
- professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}

        `);

const prompt = res.content.trim()

const imageUrl = `https://image.pollination.ai/prompt/${encodeURIComponent(prompt)}`
const imageRes = await axios.get(imageUrl,{responseType:"arrayBuffer"})

console.log(imageRes)

};
 