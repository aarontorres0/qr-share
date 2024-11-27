import { useState } from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div className="card bg-white shadow-xl p-6 w-full max-w-md rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        QR Code Generator
      </h1>
      <textarea
        className="textarea textarea-bordered border-gray-300 bg-gray-100 px-2 w-full mb-4 h-16 rounded-lg"
        placeholder="Enter text here to generate a QR code..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <div className="flex justify-center p-4 rounded-lg mb-4">
          <QRCode value={text} />
        </div>
      )}
      {text && (
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setText("")}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
