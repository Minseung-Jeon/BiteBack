const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//for file upload multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

//make uploads directly publicly accessible
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//import analyzeImages function from chatgpt.js
const { analyzeImages } = require("./chatgpt");

/* app.get("/api/response", async (req, res) => {
  try {
    res.json({ message: "API call successful" });
  } catch (error) {
    console.error(error);
  }
}); */

app.post(
  "/api/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      //get analysis from analyzeImages function in chatgpt.js
      const analyzeImagesResponse = await analyzeImages(
        `uploads/${req.files.image1[0].filename}`,
        `uploads/${req.files.image2[0].filename}`
      );

      console.log(analyzeImagesResponse);

      res.json({
        message: "File uploaded successfully",
        analysis: analyzeImagesResponse,
      });
    } catch (error) {
      console.error("/api/upload Error: ", error);
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
