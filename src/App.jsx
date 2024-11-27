import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import QrScanner from 'qr-scanner';

function App() {
  const [text, setText] = useState('');
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  const startScanning = () => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          qrScanner.stop();
        },
        { returnDetailedScanResult: true }
      );
      qrScanner.start();
      qrScannerRef.current = qrScanner;
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  const rescan = () => {
    stopScanning(); // Stop any existing scan
    setScanResult(''); // Clear the previous scan result
    startScanning(); // Restart scanning
  };

  useEffect(() => {
    startScanning();

    return () => {
      stopScanning(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      {/* QR Code Generator */}
      <div className="card bg-white shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-6">QR Code Generator</h1>
        <textarea
          className="textarea textarea-bordered w-full mb-4 h-32"
          placeholder="Enter text to generate a QR code..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text ? (
          <div className="flex justify-center bg-gray-100 p-4 rounded mb-4">
            <QRCode value={text} />
          </div>
        ) : (
          <div className="text-center text-gray-500 italic mb-4">
            Enter some text to see your QR code here
          </div>
        )}
        <button
          className="btn btn-primary w-full"
          onClick={() => setText('')}
        >
          Clear
        </button>
      </div>

      {/* QR Code Scanner */}
      <div className="card bg-white shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-secondary mb-4">QR Code Scanner</h2>
        <video ref={videoRef} className="w-full rounded mb-4" />
        {scanResult ? (
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-center">Scanned Result:</p>
            <p className="font-bold text-center text-green-600">{scanResult}</p>
            <button
              className="btn btn-secondary mt-4 w-full"
              onClick={() => navigator.clipboard.writeText(scanResult)}
            >
              Copy to Clipboard
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 italic mb-4">No result yet...</p>
        )}
        <button className="btn btn-primary w-full mt-4" onClick={rescan}>
          Rescan
        </button>
      </div>
    </div>
  );
}

export default App;
