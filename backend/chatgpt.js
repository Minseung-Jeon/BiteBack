require("dotenv").config();

//for chatgpt
const openai = require("openai");
const apiKey = process.env.CHATGPT_API_KEY;
const openaiClient = new openai.OpenAI({ apiKey });

//interact with file system on computer
const fs = require("fs");

//to convert image file to jpg
const sharp = require("sharp");

async function chatGPT() {
  try {
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "how are you doing?" }],
      max_tokens: 50,
    });
    console.log(response);
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
  }
}

async function analyzeImageFromPath(imagePath, instruction) {
  try {
    const imageBuffer = await sharp(imagePath).toFormat("jpeg").toBuffer();
    console.log("imageBuffer:", imageBuffer);
    const imageData = imageBuffer.toString("base64");

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze the following image and provide information in a JSON object with these keys:

                {
                "type_of_food": "",
                "ingrediants": [
                {
                 "name":"",
                 "estimated_calories": "",
                 "carbon_footprint": "",
                }
                ],
                "estimated_calories": "",
                "carbon_footprint": ""

                }`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64, ${imageData}`,
              },
            },
          ],
        },
      ],
    };
    const response = await openaiClient.chat.completions.create(payload);
    const description = response.choices[0].message.content;
    console.log(response);
    console.log(description);
  } catch (error) {
    console.error(error);
  }
}

analyzeImageFromPath("uploads/steak.jpg", "write");
