import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const apiCall = () => {
    try {
      axios.get("/api/response").then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input type="file" />
      <button onClick={apiCall}>Upload Picture</button>
    </>
  );
}
export default App;
