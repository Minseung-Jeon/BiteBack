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

app.get("/api/response", async (req, res) => {
  try {
    res.json({ message: "API call successful" });
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    console.log(req.file);
    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
