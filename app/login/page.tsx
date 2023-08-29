"use client"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const router = useRouter();

    interface resMess {
        status: number,
        user_id: number,
        header: Object,
        statusMessage: string
    }

    const toMain = (res:resMess) => {
        console.log(res);
        if(res.status === 200){
            router.push('/mypage');
        }
        else
            alert(`로그인에 실패하였습니다. ${res.statusMessage}`);
    }

    const loginSubmit = () => {
        fetch('/api/db/users', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ email : email.trim(), password : password.trim() }),
          })
          .then((res) => 
            res.json()
            .then((res) => 
                toMain(res) // 상태코드가 200인 경우 메인페이지로           )
          )
    )}


    return(
        <Container>
            {/* <h1>various-variable : Chat GPT가 지어주는 변수명</h1> */}
            <img src={"/imgs/logo-big.png"} width={200} />
            <Input name="email" placeholder="이메일" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            <Input name="password" type="password" placeholder="비밀번호" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            <LoginBtn onClick={loginSubmit}>로그인</LoginBtn>
            <h2 style={{cursor: 'pointer'}} onClick={()=>{router.push('/signup')}}>회원가입 하기</h2>
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