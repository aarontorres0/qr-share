import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  const startScanning = () => {
    if (videoRef.current) {
      setIsScanning(true);
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          stopScanning();
        },
        { returnDetailedScanResult: true }
      );
      qrScanner.start();
      qrScannerRef.current = qrScanner;
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  const rescan = () => {
    stopScanning();
    setScanResult('');
    startScanning();
  };

  useEffect(() => {
    startScanning();

    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="card bg-white shadow-xl p-6 w-full max-w-md rounded-lg">
      <h2 className="text-xl font-bold text-yellow-600 mb-4 text-center">
        QR Code Scanner
      </h2>
      <video ref={videoRef} className="w-full rounded-lg mb-4" />
      <p className="text-sm text-yellow-500 italic mb-4">
        Note: Ensure camera permissions are enabled in your browser for scanning.
      </p>
      {scanResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-center">Scanned Result:</p>
          <p className="font-bold text-center text-green-600">{scanResult}</p>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={() => navigator.clipboard.writeText(scanResult)}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
      {!isScanning && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            onClick={rescan}
          >
            Rescan
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
