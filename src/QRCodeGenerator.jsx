import { useState, useRef } from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    const svgElement = qrCodeRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

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
        <div ref={qrCodeRef} className="flex justify-center p-4 rounded-lg mb-4">
          <QRCode value={text} />
        </div>
      )}
      {text && (
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setText("")}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={downloadQRCode}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
