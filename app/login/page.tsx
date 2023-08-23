"use client"
import styled from "styled-components";
import Router from "next/router";

export default function Login() {
    return(
        <form action="/api/db/users" method="post">
            <Container>
                <h1>various-variable : Chat GPT가 지어주는 변수명</h1>
                <Input name="email" placeholder="이메일" required/>
                <Input name="password" type="password" placeholder="비밀번호" required/>
                <LoginBtn>로그인</LoginBtn>
            </Container>
        </form>
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