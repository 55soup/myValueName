"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import { useCompletion } from "ai/react"
import { BsMenuApp } from "react-icons/bs";
import Loading from "./loading";

export default function Home() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 햄버거 메뉴바 state

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: any) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  }

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

  // db연동
  const [dbdatas, setDBDatas] = useState([]);

  useEffect(()=>{
    fetch('/api/db')
    .then((res) => res.json())
    .then((data) => {setDBDatas(data)});
  }, []);
  /////////////////////////////////

  const [listClick , setListClick] = useState(null);

  return (
    <Container>
      <LeftSidebar isOpen={isOpen}>
      {dbdatas.map((a, i) => {
          return(
            <List key={i} onClick={() => {setListClick(a)}}>
              <div>{a.CONTENT}</div>
            </List>
          );
        })}
      </LeftSidebar>
      <HamburgerBtn onClick={()=>{setIsOpen(isOpen ? false : true)}}><BsMenuApp size={30}/></HamburgerBtn>
      <RightSidebar isOpen={isOpen}>
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
            style={{width: '50rem', fontSize: '2rem', textAlign: 'center'}}
            // className="w-full max-w-md border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit">제출</button>
        </form>
        <Response>
          <img src="/imgs/chatgpt.png" alt="chat gpt" style={{width: '5rem', height: '5rem'}}/>
            <output style={{fontSize: '2rem'}}>{completion} 어떠세요?</output>
        </Response>
        { listClick && 
          <>
            <div>{listClick.CONTENT}</div>
            <div>{listClick.ANSWER}</div>
          </>
        }
      </RightSidebar>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  background: white;
`
const RightSidebar = styled.div`
  display: flex;
  width: ${props => props.isOpen ? '70%' : '50%' };
  height: 100vh;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  background: white;
  transition: ease  0.2s
`;
const HamburgerBtn = styled.button`
  border: 0;
  position: absolute;
  left: 2rem;
  top: 2rem;
`
const LeftSidebar = styled.div`
  float: left;
  width: 20%; height: 100vh;
  padding: 7rem 0 0 2rem;
  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-50rem')});
  transition: ease 0.2s;
  // display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;
const RecordButton = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: ${(props) => (props.toggle ? "red" : "none")};
  border-radius: 5rem;
  border: 0;
  transition: 0.2s;
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
const List = styled.div`
  margin: 1rem 0;
  cursor: pointer;
`;
