import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  /* const handleSubmit = () => {
    try {
      axios.get("/api/response").then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

 */

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit working");

    //alert user if no file is selected
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    //create new formdata for file upload
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("/api/upload", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    console.log("formData:", formData);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Top Nav Bar*/}
      <header className="w-full py-7 pl-12">
        <h1 className="font-extrabold text-3xl">BiteBack</h1>
      </header>

      {/* Submitting photos */}
      <form 
        onSubmit={handleSubmit}
        className=""
      >
        <input type="file" />
        <button type="submit">Calculate</button>
      </form>
    </div>
  );

}
export default App;
