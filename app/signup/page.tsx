"use client"
import styled from "styled-components";
import { useState } from "react";

export default function SignUp() {
    
    const Join = () => {
        fetch('/api/db/users', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ email : email, password : password }),
        })
    }

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    return(
        <Container>
            <img src={"/imgs/logo-big.png"} width={200} />
            <Input placeholder="닉네임" />
            <Input placeholder="asdf@gmail.com" />
            <Input placeholder="비밀번호"  />
            <Input placeholder="비밀번호 확인"  />
            <JoinBtn onClick={Join}>가입하기</JoinBtn>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2.5vw;
    margin: 5rem 0;
`

const Input = styled.input`
    background: var(--main-color);
    width: 50vw; height: 5vw;
    border-radius: 10px;
    font-size: 2vw;
    padding: 2rem;
`
const JoinBtn = styled.button`
    background: var(--second-color);
    width: 50vw; height: 5vw;
    border-radius: 10px;
    font-size: 2vw;
    color: white;
`