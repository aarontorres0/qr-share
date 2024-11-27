import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [text, setText] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
    </div>
  );
}

export default App;
