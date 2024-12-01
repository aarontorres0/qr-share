import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  const startScanning = async () => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          stopScanning(); // Stop after a successful scan
        },
        { returnDetailedScanResult: true }
      );
      qrScannerRef.current = qrScanner;

      try {
        await qrScanner.start(); // Start the camera
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  const toggleCamera = () => {
    setCameraEnabled((prev) => !prev);
  };

  const rescan = async () => {
    stopScanning();
    setScanResult('');
    await startScanning();
  };

  useEffect(() => {
    if (cameraEnabled) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning(); // Cleanup on unmount
    };
  }, [cameraEnabled]);

  return (
    <div className="card shadow-xl w-full max-w-md">
      <div className="card-body">
        <h2 className="card-title text-yellow-600">QR Code Scanner</h2>
        {cameraEnabled ? (
          <video ref={videoRef} className="rounded-lg mb-4" />
        ) : (
          <p className="text-gray-500 italic mb-4">
            Camera is off. Click "Enable Camera" to start scanning.
          </p>
        )}
        <p className="text-yellow-500 italic mb-4">
          Note: Ensure camera permissions are enabled in your browser for
          scanning.
        </p>
        {scanResult && (
          <div className="alert alert-success text-white">
            <span className="font-bold">Scanned Result:</span> {scanResult}
          </div>
        )}
        <div className="card-actions justify-center mt-4 space-x-4">
        {!scanResult && (
            <button
              className={`btn ${
                cameraEnabled ? "btn-error" : "btn-primary"
              } text-white`}
              onClick={toggleCamera}
            >
              {cameraEnabled ? "Disable Camera" : "Enable Camera"}
            </button>
          )}
          {scanResult && (
            <>
              <button
                className="btn btn-secondary text-white"
                onClick={() => navigator.clipboard.writeText(scanResult)}
              >
                Copy to Clipboard
              </button>
              <button className="btn btn-warning text-white" onClick={rescan}>
                Rescan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
