"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import { useCompletion } from "ai/react"
import { RxHamburgerMenu } from "react-icons/rx"; 
import { AiOutlineUser } from "react-icons/ai";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import Link from 'next/link'
import Loading from "./loading";

export default function Home() {
  
    // chat gpt
    const {
      completion,
      input,
      isLoading,
      handleInputChange,
      handleSubmit,
      setInput // input 조작
    } = useCompletion({
      api: '/api'
    })

  const [isOpen, setIsOpen] = useState(false); // 햄버거 메뉴바 state

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: any) => {
      // 음성인식 결과가 input 상태값으로 할당됩니다.
      setInput(result);
    },
  });

  // toggle버튼 관리
  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  // db연동
  const [dbdatas, setDBDatas] = useState([]);

  useEffect(()=>{
    fetch('/api/db')
    .then((res) => res.json())
    .then((data) => {setDBDatas(data)});
  }, [dbdatas]);

  const insertData = () => {
    if(completion!=''){
      fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ user_id:2, content: input, answer: completion, dates: new Date().toDateString() }),
      })
      .then((res) => res.json())
    }
  }

  const updateData = (content:string, q_id:number) => {
    let new_content = prompt('수정할 내용을 입력해주세요.', content);
    fetch('/api/db', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ content : new_content, q_id : q_id }),
    })
    .then((res) => res.json())
  }

  const deleteData = (q_id:number) => {
    fetch('/api/db', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ q_id : q_id }),
    })
    .then((res) => res.json())
  }
  /////////////////////////////////

  const [listClick , setListClick] = useState(null); // 답변 저장 list 클릭시 저장된 결과가 나옴

  return (
    <Container>
      <LeftSidebar isOpen={isOpen}>
      {dbdatas.map((dbdata:any, i:number) => {
          return(
            <List key={i}>
              <div onClick={() => {setListClick(dbdata); console.log(dbdata.Q_ID)}}>
                {dbdata.CONTENT.length > 20 ? `${dbdata.CONTENT.substring(0, 20)}...` : dbdata.CONTENT}
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button onClick={() => {updateData(dbdata.CONTENT, dbdata.Q_ID)}}><BsPencil /></button>
                <button onClick={() => {deleteData(dbdata.Q_ID)}}><BsTrash3 /></button>
              </div>
            </List>
          );
        })}
      </LeftSidebar>
      <HamburgerBtn onClick={()=>{setIsOpen(isOpen ? false : true)}}><RxHamburgerMenu size={30}/></HamburgerBtn>
      <Link href="/login"><AiOutlineUser size={30} style={{position: 'relative', float: 'right', margin: '2vw 4vw'}} /></Link>
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
          <button type="submit" onClick={insertData}>제출</button>
        </form>
        <Response>
          <img src="/imgs/chatgpt.png" alt="chat gpt" style={{width: '5rem', height: '5rem'}}/>
            <output style={{fontSize: '2rem'}}>{completion} 어떠세요?</output> 
            {/* 변수명 클릭시 클립보드로 복사 */}
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
  position: relative;
  cursor: pointer;
`;
