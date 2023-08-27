"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams();
    console.log(params);
    // useEffect(()=>{
    //     fetch('/api/db/mypage')
    //     .then((res) => res.json())
    //     .then((data) => {setUserData(data[0]); setContent(data);});
    // }, []);

    return(
        <Container>
            <div>detail page</div>
        </Container>
    )
}

const Container = styled.div`
    margin: 2rem 20vw;
`;