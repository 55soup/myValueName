"use client"; // this is a client component 👈🏽
import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import { useCompletion } from 'ai/react'

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

  // chat gpt
  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: '/api'
  })

  return (
    <Container>
      <div>{listening && 'REC'}</div>
      <RecordButton
        onClick={() => {
          clickedToggle();
          !toggle ? listen({ interimResults: true }) : stop();
        }}
        toggle={toggle}
      >
        🎤
      </RecordButton>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="변수명 추천을 받아보세요!"
          style={{width: '25rem', fontSize: '2rem'}}
          // className="w-full max-w-md border border-gray-300 rounded mb-8 shadow-xl p-2"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">제출</button>
      </form>
      <Response>
        <img src="/imgs/chatgpt.png" alt="chat gpt" style={{width: '5rem', height: '5rem'}}/>
          <output style={{fontSize: '2rem'}}>{completion} 어떠세요?</output>
          {/* <button disabled={isLoading} type="submit">
            Send
          </button> */}
      </Response>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  background: white;
`;

const RecordButton = styled.button`
  width: 4vw;
  height: 4vw;
  background-color: ${(props) => (props.toggle ? "red" : "none")};
  border-radius: 5rem;
  border: 0;
  transition: 0.3s;
  border: ${(props) => (props.toggle ? "none" : "solid 3px #d7d7d7")};
`;
const SpeechText = styled.div`
  font-size: 5rem;
`
const Response = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
`
