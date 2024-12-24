import React from "react";

function ResultCard({
  GeneralAnalysis,
  Suggestion,
  SavedFoodWaste,
  SavedCarbonFootprint,
}) {
  return (
    <div className="w-full h-full rounded-3xl border-2 border-black py-7 px-8 shadow">
      {/* <p>General Analysis: {GeneralAnalysis}</p> */}
      <p>
        <b>Suggestion:</b> {Suggestion}
      </p>
      <p>
        <b>Saved Food Waste:</b> {SavedFoodWaste}
      </p>
      <p>
        <b>Saved Carbon Footprint:</b> {SavedCarbonFootprint}
      </p>
    </div>
  );
}

export default ResultCard;
