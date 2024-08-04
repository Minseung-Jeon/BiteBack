import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit working");

    //alert user if no file is selected
    if (!selectedFile1) {
      alert("Please provide image file of your regular meal");
      return;
    }

    if (!selectedFile2) {
      alert("Please provide image file of your current meal");
      return;
    }

    //create new formdata for file upload
    const formData = new FormData();

    if (selectedFile1 && selectedFile2) {
      formData.append("image1", selectedFile1);
      formData.append("image2", selectedFile2);
    }

    try {
      const response = await axios.post("/api/upload", formData);
      setAnalysisResult(response.data.analysis);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Top Nav Bar*/}
      <header className="w-full py-7 pl-12">
        <h1 className="font-extrabold text-3xl">BiteBack</h1>
      </header>

      {/* Submitting photos */}
      <form onSubmit={handleSubmit} className="">
        <input type="file" onChange={handleFileChange1} />
        <input type="file" onChange={handleFileChange2} />

        <button type="submit">Calculate</button>
      </form>
      {analysisResult && <p>{analysisResult.current_meal.type_of_food}</p>}
    </div>
  );
}
export default App;
