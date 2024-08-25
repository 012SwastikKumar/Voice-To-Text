import { useEffect, useRef, useState } from "react";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!(window && "webkitSpeechRecognition" in window)) {
      console.log("Browser not supported");
      return;
    }
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punctuation> = . | , | ? | ! | : ;";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.log("Speech Recognition Error: ", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      // No need to clear the transcript here, as it should persist
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return { isListening, transcript, startListening, stopListening };
};

export default useSpeechToText;
