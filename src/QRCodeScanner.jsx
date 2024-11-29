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
<div className="card shadow-xl w-full max-w-md">
  <div className="card-body">
    <h2 className="card-title text-yellow-600">QR Code Scanner</h2>
    <video ref={videoRef} className="rounded-lg mb-4" />
    <p className="text-yellow-500 italic mb-4">
      Note: Ensure camera permissions are enabled in your browser for scanning.
    </p>
    {scanResult && (
      <div className="alert alert-success text-white">
        <span className="font-bold">Scanned Result:</span> {scanResult}
      </div>
    )}
    <div className="card-actions justify-center mt-4">
      {scanResult && (
        <button
          className="btn btn-primary text-white"
          onClick={() => navigator.clipboard.writeText(scanResult)}
        >
          Copy to Clipboard
        </button>
      )}
      <button className="btn btn-warning text-white" onClick={rescan}>
        Rescan
      </button>
    </div>
  </div>
</div>

  );
};

export default QRCodeScanner;
