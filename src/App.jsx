import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import QRCodeScanner from './QRCodeScanner';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 px-4 py-8">
      <QRCodeGenerator />
      <QRCodeScanner />
    </div>
  );
};

export default App;
