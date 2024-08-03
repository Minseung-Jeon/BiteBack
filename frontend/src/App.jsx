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
  
  const handleSubmit = () => {
    return ;
  }

  return (
    <div className="bg-red-500 min-h-screen w-full">
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button onClick={apiCall}>
          Upload Picture
        </button>
      </form>
    </div>
  );

}
export default App;
