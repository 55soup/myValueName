"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Home() {
    interface Users{
        USER_ID : number,
        EMAIL : string,
        JOIN_DATE : string,
        NICKNAME : string,
        PROFILE_PHOTO : string
    }
    
    const [userData, setUserData] = useState<Users>({});

    useEffect(()=>{
        fetch('/api/db/mypage')
        .then((res) => res.json())
        .then((data) => {setUserData(data[0]); console.log(userData)});
    }, []);

    return(
        <Container>
            <Profile />
            <div>
                <Nickname>{userData.NICKNAME}</Nickname>
                <Info>가입일: {userData.JOIN_DATE}</Info>
                <Info>@{userData.USER_ID}</Info>
                <AccentInfp>총 4번 질문했어요!</AccentInfp>
                <AccentInfp>다른 유저들보다 평균 2번 더 질문했어요!</AccentInfp>
            </div>
            <div style={{fontWeight: 'bold', fontSize: '1.2vw', marginTop: '5rem' }}>내가 지은 변수명들</div>
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
            </ul>
            <QTable>
                <QRow>asdf</QRow>
            </QTable>
        </Container>
    )
}

const Container = styled.div`
    margin: 2rem 20vw;
`;
const Profile = styled.div`
    width: 15vw; height: 15vw;
    border-radius: 20rem;
    background: red;
    `
const Nickname = styled.div`
    font-size: 4vw;
    font-weight: bold;
`
const Info = styled.div`
    color: var(--grey-color);
`
const AccentInfp = styled.div`
    font-size: 1.2vw;
`
const QTable = styled.table`
    width: 100%;
    padding: 2rem;
    border-collapse: separate;
    border: 1px solid black;
    border-radius: 1.2rem;
    `
const QRow = styled.tr`
    border-collapse: separate;
    padding: 1rem;
    border: 1px solid black;
`