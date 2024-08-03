import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  /* const apiCall = () => {
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
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Picture</button>
      </form>
    </>
  );
}
export default App;
