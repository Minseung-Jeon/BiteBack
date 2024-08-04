require("dotenv").config();

//for chatgpt
const openai = require("openai");
const apiKey = process.env.OPENAI_API_KEY;
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
  } catch (error) {
    console.error(error);
  }
}

const ANALYSIS_PROMPT = `Analyze the following two images. The first image represents a "regular meal" and the second represents a "current meal". 
                If one of the picture is non-food picture, return "put food picture" in all of json keys.
              Please provide the analysis in JSON format with these keys:

              {
                "regular_meal": {
                  "type_of_food": "",
                  "ingredients": [
                    {
                      "name": "",
                      "estimated_calories": "",
                      "carbon_footprint": ""
                    }
                    // ... more ingredients as needed
                  ],
                  "estimated_calories": "",
                  "carbon_footprint": ""
                },
                "current_meal": {
                  // Same structure as "regular_meal"
                },
                "comparison": {
                  "analysis": "", //give general analysis
                  "suggestion: "", //if user is eating more calories than regular meal, suggest to drop food items. Let them know its more than there usual consumption and they will likely not able to finish it
                 
                  "potential_food_waste_saved": "", //if user drops the food items, inform them how much food waste can be saved
                  "potential_carbon_footprint_saved": ""  //if user drops the food items, inform how much carbon footprint can be saved
                }
              }
                `;

async function analyzeImages(imagePath1, imagePath2) {
  try {
    const imageBuffer1 = await sharp(imagePath1).toFormat("jpeg").toBuffer();
    const imageBuffer2 = await sharp(imagePath2).toFormat("jpeg").toBuffer();

    const imageData1 = imageBuffer1.toString("base64");
    const imageData2 = imageBuffer2.toString("base64");

    const payload = {
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },

      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: ANALYSIS_PROMPT,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64, ${imageData1}`,
              },
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64, ${imageData2}`,
              },
            },
          ],
        },
      ],
    };
    const response = await openaiClient.chat.completions.create(payload);
    const description = response.choices[0].message.content;

    //convert string response to json object
    const jsonObject = JSON.parse(description);

    return jsonObject;
  } catch (error) {
    console.error("GPT error: ", error);
  }
}

//analyzeImages("uploads/steak.jpg", "uploads/feast.jpg");
module.exports = { analyzeImages };
