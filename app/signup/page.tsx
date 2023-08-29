"use client"
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    const Join = () => {
        if(password === chkPassword){
            fetch('/api/db/signup', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ nickname : nickname, email : email, join_date : new Date().toDateString(), password : password }),
            })
            .then((res) => {router.push("/login")})
        }else{
            alert("비밀번호가 일치하지 않습니다.");
        }
    }

    const [nickname, setNickname] = useState<String>('');
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [chkPassword, setChkPassword] = useState<String>('');

    return(
        <Container>
            <img src={"/imgs/logo-big.png"} width={200} />
            <Input placeholder="닉네임" value={nickname} onChange={(e)=>{setNickname(e.target.value)}} required/>
            <Input placeholder="asdf@gmail.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            <Input placeholder="비밀번호" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            <Input placeholder="비밀번호 확인" value={chkPassword} onChange={(e)=>{setChkPassword(e.target.value)}} required/>
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