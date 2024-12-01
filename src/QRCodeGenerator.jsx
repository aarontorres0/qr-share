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
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
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
    <div className="card bg-base-100 shadow-xl w-full max-w-md">
      <div className="card-body">
        <h1 className="card-title text-primary">QR Code Generator</h1>
        <textarea
          className="textarea textarea-bordered textarea-primary w-full"
          placeholder="Enter text here to generate a QR code..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <div
            ref={qrCodeRef}
            className="flex justify-center my-4 bg-white p-4 rounded-box"
          >
            <QRCode value={text} />
          </div>
        )}
        <div className="card-actions justify-center">
          {text && (
            <>
              <button className="btn btn-error text-white" onClick={() => setText("")}>
                Clear
              </button>
              <button className="btn btn-primary text-white" onClick={downloadQRCode}>
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
