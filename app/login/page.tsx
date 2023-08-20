"use client"
import styled from "styled-components";

export default function Login() {
    return(
        <Container>
            <h1>various-variable : Chat GPT가 지어주는 변수명</h1>
            <Input placeholder="닉네임"/>
            <Input type="password" placeholder="비밀번호"/>
            <LoginBtn>로그인</LoginBtn>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3.5vw;
    margin: 5rem 0;
`
const Input = styled.input`
    background: var(--main-color);
    width: 50vw; height: 5vw;
    border-radius: 10px;
    font-size: 2vw;
    padding: 2rem;
`
const LoginBtn = styled.button`
    background: var(--second-color);
    width: 50vw; height: 5vw;
    border-radius: 10px;
    font-size: 2vw;
    color: white;

`