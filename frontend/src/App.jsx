import React, { useState } from "react";
import axios from "axios";

import Card from "./components/card";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    try {
      axios.get("/api/response").then((response) => {
        console.log(response);
      });
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
      <main className="bg-neutral-one border border-t-2 border-b-2 border-black h-[65svh] relative px-12">
        <form 
          onSubmit={handleSubmit}
          className="h-full w-full"
        >
          <div className="flex gap-4 w-full">
           <input type="file" className="w-full"/>
           <input type="file" className="w-full"/>
          </div>
          <button 
            type="submit"
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 accent-button"
            >
            Calculate
        </button>
        </form>
      </main>

      {/* Results Section*/}
      <section className="py-16 px-12 ">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <p><b>Type of Food:</b></p>
            <div>
              <b>Ingredients:</b>
              <ul className="list-disc ml-8 w-full">
                <li>Ingredient Name (XXXcal, XXXkg of CO2)</li>
                <li>Ingredient Name (XXXcal, XXXkg of CO2)</li>
                <li>Ingredient Name (XXXcal, XXXkg of CO2)</li>
              </ul>
            </div>
            <p><b>Approximate Calorie:</b> XXXcal</p>
            <p><b>Approximate CO2: </b> XXXcal</p>
          </Card>
          <Card>
          <p><b>Type of Food:</b></p>
            <div>
              <b>Ingredients:</b>
              <ul className="list-disc ml-8 w-full">
                <li>Ingredient Name (XXXcal, XXXkg of CO2) </li>
                <li>Ingredient Name (XXXcal, XXXkg of CO2)</li>
                <li>Ingredient Name (XXXcal, XXXkg of CO2)</li>
              </ul>
            </div>
            <p><b>Approximate Calorie:</b> XXXcal</p>
            <p><b>Approximate CO2: </b> XXXcal</p>
          </Card>
          <div className="col-span-2">
            <Card>
              <p>You've saved <b>XXcal</b> of food waste with this meal</p>
              <p>You've saved <b>XXXkg</b> of CO2 emissions with this meal</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer at bottom*/}
      <footer className="py-16 px-12 bg-black">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-white text-xl font-semibold">Originally a submission for TerraHacks</p>
          <a href="https://github.com/Minseung-Jeon/BiteBack" target="_blank" className="accent-button">Github</a>
        </div>
      </footer>
    </div>
  );
}

export default App;