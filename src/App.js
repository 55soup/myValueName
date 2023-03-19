import "./App.css";
import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

function App() {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });

  return (
    <div>
      <div>{value}</div>
      <button
        onMouseDown={() => listen({ interimResults: true })}
        onMouseUp={stop}
      >
        🎤
      </button>
      {listening && <div>음성인식 활성화 중</div>}
    </div>
  );
}

export default App;
