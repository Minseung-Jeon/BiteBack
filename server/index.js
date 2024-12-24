const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();

const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT;
const UPLOADS_DIR = path.join(__dirname, "uploads");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

//for file upload multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
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
      const imagePath1 = path.join(UPLOADS_DIR, req.files.image1[0].filename);

      const imagePath2 = path.join(UPLOADS_DIR, req.files.image2[0].filename);

      if (!fs.existsSync(imagePath1) || !fs.existsSync(imagePath2)) {
        return res.json({ error: "one or both file not found" });
      }

      //get analysis from analyzeImages function in chatgpt.js
      const analyzeImagesResponse = await analyzeImages(imagePath1, imagePath2);

      console.log(analyzeImagesResponse);

      res.json({
        message: "File uploaded successfully",
        analysis: analyzeImagesResponse,
      });
    } catch (error) {
      console.error("/api/upload Error: ", error);
      res.json({ error: "Internal Server Error" });
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
