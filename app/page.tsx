"use client"; // this is a client component 👈🏽

import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";

export default function Home() {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: any) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });

  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div>{value}</div>
      <RecordButton
        onClick={() => {
          clickedToggle();
          !toggle ? listen({ interimResults: true }) : stop();
        }}
        toggle={toggle}
      >
        🎤
      </RecordButton>
      {listening && <div>음성인식 활성화 중</div>}
    </div>
  );
}

const RecordButton = styled.button`
  width: 4vw;
  height: 4vw;
  background-color: ${(props) => (props.toggle ? "red" : "none")};
  border-radius: 5rem;
  border: 0;
`;
