import { useState, useEffect } from "react";
import useSpeechToText from "./hooks/useSpeechToText/useSpeechToText";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState("");
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText();

  useEffect(() => {
    // Update textInput whenever transcript changes and listening stops
    if (!isListening && transcript) {
      setTextInput((prev) => prev + " " + transcript);
    }
  }, [isListening, transcript]);

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    stopListening();
  };

  return (
    <div className="App">
      <textarea
        disabled={isListening}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>

      <button
        style={{ backgroundColor: isListening ? "red" : "green" }}
        onClick={startStopListening}
        className="btn-speak"
      >
        {isListening ? "Stop" : "Speak"}
      </button>
    </div>
  );
}

export default App;
