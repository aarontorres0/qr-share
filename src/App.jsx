import React, { useEffect, useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import QRCodeScanner from "./QRCodeScanner";
import MoonIcon from "./assets/moon-icon.svg";
import SunIcon from "./assets/sun-icon.svg";

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center space-y-6 px-4 py-8">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`btn btn-circle ${
            theme === "light" ? "btn-neutral" : "btn-warning"
          }`}
        >
          <img
            src={theme === "light" ? MoonIcon : SunIcon}
            alt={theme === "light" ? "Dark Mode" : "Light Mode"}
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
