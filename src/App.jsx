import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import QRCodeScanner from "./QRCodeScanner";
import SunIcon from "./assets/sun-icon.svg";
import MoonIcon from "./assets/moon-icon.svg";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      } space-y-6 px-4 py-8`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-2 py-1 ${
            darkMode ? "bg-white" : "bg-black"
          } rounded`}
        >
          <img
            src={darkMode ? SunIcon : MoonIcon}
            alt={darkMode ? "Light Mode" : "Dark Mode"}
            className="w-6 h-6"
          />
        </button>
      </div>
      
      <QRCodeGenerator />
      <QRCodeScanner />
    </div>
  );
};

export default App;
