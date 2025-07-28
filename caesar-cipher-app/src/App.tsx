import React, { useState, useMemo } from 'react';

interface CipherResult {
  text: string;
  stats: {
    originalLength: number;
    processedLength: number;
    lettersShifted: number;
    charactersPreserved: number;
  };
}

const caesarEncrypt = (text: string, shift: number): CipherResult => {
  let processedText = '';
  let lettersShifted = 0;
  let charactersPreserved = 0;

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const base = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      const shiftedChar = String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
      processedText += shiftedChar;
      lettersShifted++;
    } else {
      processedText += char;
      charactersPreserved++;
    }
  }

  return {
    text: processedText,
    stats: {
      originalLength: text.length,
      processedLength: processedText.length,
      lettersShifted,
      charactersPreserved,
    },
  };
};

export default function App() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const result = useMemo(() => caesarEncrypt(inputText, shift), [inputText, shift]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Caesar Cipher Encryptor</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to encrypt"
        className="w-full p-4 text-black rounded mb-4"
        rows={4}
      />
      <input
        type="range"
        min={1}
        max={25}
        value={shift}
        onChange={(e) => setShift(parseInt(e.target.value))}
        className="w-full mb-2"
      />
      <div className="mb-4">Shift: {shift}</div>
      <div className="bg-gray-800 p-4 rounded">
        <strong>Encrypted Text:</strong>
        <p className="mt-2 text-green-400 break-words">{result.text}</p>
        <div className="mt-4 text-sm text-gray-300">
          <p>Original Length: {result.stats.originalLength}</p>
          <p>Processed Length: {result.stats.processedLength}</p>
          <p>Letters Shifted: {result.stats.lettersShifted}</p>
          <p>Characters Preserved: {result.stats.charactersPreserved}</p>
        </div>
      </div>
    </div>
  );
}
