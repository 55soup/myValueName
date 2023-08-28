"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams();
    // console.log(router.query.data);

    const [data, setData] = useState();

    useEffect(()=>{
        fetch('/api/db/mypage')
        .then((res) => res.json())
        .then((datas) => {
            datas.forEach((data:any) => {
                if(data.Q_ID == params.id){
                    setData(data);
                }
            });
        });
    }, []);

    return(
        <>
            <HalfCont bakColor="white">
                <Font>{data && data.CONTENT}</Font>
            </HalfCont>
            <HalfCont bakColor="var(--main-color)">
                <img src="/imgs/chatgpt.png" alt="chat gpt" style={{width: '5rem', height: '5rem'}}/>
                <Font>{data && data.ANSWER}</Font>
            </HalfCont>
        </>
    )
}

const HalfCont = styled.div<{ bakColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    background: ${(props) => props.bakColor};
    gap: 2rem;
`

const Font = styled.div`
    font-size: 2rem;
`