const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

const multer = require("multer");
const path = require("path");

const port = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, "uploads");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//make uploads directly publicly accessible

//import analyzeImages function from chatgpt.js
const { analyzeImages } = require("./chatgpt");

app.post(
  "/api/upload",

  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const imageData1 = req.files.image1[0].buffer;
      const imageData2 = req.files.image2[0].buffer;

      //get analysis from analyzeImages function in chatgpt.js
      const analyzeImagesResponse = await analyzeImages(imageData1, imageData2);

      console.log(analyzeImagesResponse);

      res.json({
        message: "File uploaded successfully",
        analysis: analyzeImagesResponse,
      });
    } catch (error) {
      console.error("/api/upload Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//for deploying
//use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

//render client for any path
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
