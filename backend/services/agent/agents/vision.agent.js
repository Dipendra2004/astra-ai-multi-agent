import axios from "axios";
import { getModel } from "../config/llmModels.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");

    const res = await llm.invoke(`
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:

- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}
    `);

    const prompt = res.content.trim();

    console.log("Generated Image Prompt:");
    console.log(prompt);

    // Pollinations image generation URL
    const imageUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux`;

    // Generate image
    const imageRes = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
      },
      timeout: 120000,
    });

    console.log("Image generated successfully");

    // Convert response to Buffer
    const buffer = Buffer.from(imageRes.data);

    // Create unique filename
    const filename = `image-${Date.now()}.png`;

    // Upload image to S3
    await uploadToS3(filename, buffer, "image/png");

    // Generate signed S3 URL
    const downloadUrl = await getFromS3(filename, 10 * 60);

    console.log("S3 URL:", downloadUrl);

    return {
      ...state,

      aiResponse: `
![Generated Image](${downloadUrl})

📥 [Download Image](${downloadUrl})

⏳ Link expires in 10 minutes.
`,
    };
  } catch (error) {
    console.error("Vision Agent Error:", error.response?.data || error.message);

    return {
      ...state,
      aiResponse: `❌ Failed to generate image.

Error: ${error.response?.data?.error?.message || error.message}`,
    };
  }
};
