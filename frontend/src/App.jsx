import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { SiDevpost } from "react-icons/si";

import axios from "axios";

//import components
import Card from "./components/card";
import ResultCard from "./components/ResultCard";

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
      <header className="w-full py-7 pl-12 flex items-center">
        <img src="BiteBackLogo.jpeg" alt="BiteBack Logo" className="h-20 w-auto mr-4"/>
        {/* <h1 className="font-extrabold text-3xl">BiteBack</h1> */}
      </header>

      {/* Submitting photos */}
      <main className="bg-neutral-two border border-t-2 border-b-2 border-black h-[65svh] relative px-12">
        <form onSubmit={handleSubmit} className="h-full w-full">
          <div className="grid grid-cols-2 gap-4 w-full h-full pt-6 pb-16">
            <input
              onChange={handleFileChange1}
              placeholder="Regular Meal"
              type="file"
              id="file2"
              className="file-input"
            />
            <input
              onChange={handleFileChange2}
              placeholder="Current Meal"
              type="file"
              id="file2"
              className="file-input"
            />
          </div>
          <button
            type="submit"
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 accent-button shadow"
          >
            Calculate
          </button>
        </form>
      </main>

      {/* Results Section*/}
      {analysisResult && (
        <section className="py-16 px-12 ">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <p>
                <b>Type of Food: {analysisResult.regular_meal.type_of_food}</b>
              </p>
              <div>
                <b>Ingredients:</b>
                <ul className="list-disc ml-8 w-full">
                  {analysisResult.regular_meal.ingredients.map(
                    (ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} ({ingredient.estimated_calories}cal,
                        {ingredient.carbon_footprint}kg of CO2)
                      </li>
                    )
                  )}
                </ul>
              </div>
              <p>
                <b>Approximate Calorie: </b>{" "}
                {analysisResult.regular_meal.estimated_calories}
              </p>
              <p>
                <b>Approximate CO2: </b>{" "}
                {analysisResult.regular_meal.carbon_footprint}
              </p>
            </Card>
            <Card>
              <p>
                <b>Type of Food: {analysisResult.current_meal.type_of_food}</b>
              </p>
              <div>
                <b>Ingredients:</b>
                <ul className="list-disc ml-8 w-full">
                  {analysisResult.current_meal.ingredients.map(
                    (ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} ({ingredient.estimated_calories}cal,
                        {ingredient.carbon_footprint}kg of CO2)
                      </li>
                    )
                  )}
                </ul>
              </div>
              <p>
                <b>Approximate Calorie: </b>{" "}
                {analysisResult.current_meal.estimated_calories}
              </p>
              <p>
                <b>Approximate CO2: </b>{" "}
                {analysisResult.current_meal.carbon_footprint}
              </p>
            </Card>
            <div className="col-span-2">
              <ResultCard
                GeneralAnalysis={analysisResult.comparison.analysis}
                Suggestion={analysisResult.comparison.suggestion}
                SavedFoodWaste={
                  analysisResult.comparison.potential_food_waste_saved
                }
                SavedCarbonFootprint={
                  analysisResult.comparison.potential_carbon_footprint_saved
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer at bottom*/}
      <footer className="py-16 px-12 bg-black">
        <div className="flex gap-2 justify-between items-center">
          <a
            href="https://terrahacks.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg font-semibold hover:underline"
          >
            Originally a submission for TerraHacks
          </a>
          <div className="">
            <a
              href="https://github.com/Minseung-Jeon/BiteBack"
              target="_blank"
              className="accent-button block"
            >
              <span>
                <FiGithub
                  className="inline-block align-middle mr-1"
                  size={30}
                />
              </span>{" "}
              Github
            </a>
            <a
              href="https://terrahacks.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Submissions+open"
              target="_blank"
              className="accent-button block mt-4"
            >
              <span>
                <SiDevpost
                  className="inline-block align-middle mr-1"
                  size={30}
                />
              </span>{" "}
              Devpost
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
