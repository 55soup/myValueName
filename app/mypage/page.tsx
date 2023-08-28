"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    interface Users{
        USER_ID : number,
        EMAIL : string,
        JOIN_DATE : string,
        NICKNAME : string,
        PROFILE_PHOTO : string
    }
    interface Content{
        USER_ID : number,
        Q_ID: number,
        CONTENT: string,
        ANSWER: string,
        DATES: string,
        EMAIL : string,
        JOIN_DATE : string,
        NICKNAME : string,
        PROFILE_PHOTO : string
    }
    
    const [userData, setUserData] = useState<Users>({});
    const [content, setContent]  = useState();
    const [QCount, setQCount] = useState();
    const selectList = ["가나다순", "날짜순"];
    const [selected, setSelected] = useState<string>("가나다순");

    const handleSelect = (e) => {
        setSelected(e.target.value);
        if(selected !== "가나다순"){
            content?.sort((a:any, b:any) => {
                if(a.CONTENT > b.CONTENT) return 1;
                else if(a.CONTENT < b.CONTENT) return -1;
                else return 0;
            })
        }
        else if(selected !== "날짜순"){
            content?.sort((a:any, b:any) => {
                return a.Q_ID - b.Q_ID;
            })
        }
    }

    useEffect(()=>{
        console.log(sessionStorage.getItem("user_id"));
        fetch('/api/db/mypage')
        .then((res) => res.json())
        .then((data) => {setUserData(data[0]); setContent(data);});

        fetch('/api/db/mypage/count_q')
        .then((res) => res.json())
        .then((data) => {setQCount(data[0].COUNT_QUESTIONS)});
    }, []);

    const toDetail = (data:any) => {
        // router.push({pathname: `/detail/${data.Q_ID}`, query : {data:data}})
        router.push(`/detail/${data.Q_ID}`);
    }

    return(
        <Container>
            <ProfileCont>
                <Profile />
                <div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'baseline'}}>
                        <Nickname>{userData.NICKNAME}</Nickname>
                        <Info>@{userData.USER_ID}</Info>
                    </div>
                    <Info>가입일: {userData.JOIN_DATE}</Info>
                    <br />
                    <AccentInfp>총 <strong>{QCount}번</strong> 질문했어요!</AccentInfp>
                    <AccentInfp>다른 유저들보다 평균 <strong>2번</strong> 더 질문했어요!</AccentInfp>
                </div>
            </ProfileCont>
            <MenuNavbar>
                <div style={{fontWeight: 'bold', fontSize: '1.2vw', marginTop: '5rem' }}>내가 지은 변수명들</div>
                <div style={{marginLeft: 'auto'}}>
                    <label>질문 정렬: </label> 
                    <select onChange={handleSelect} value={selected} name="dog-names" id="dog-names">
                        {selectList.map((item) => 
                            <option value={item}>{item}</option> 
                        )}
                    </select>
                </div>
            </MenuNavbar>
            <QTable>
                {content && content.map((a:any, i:number) => 
                    <QRow key={i}>
                        <th onClick={()=>{toDetail(a)}} style={{paddingLeft: '2rem', fontWeight: '400'}}>
                            {a.CONTENT}
                        </th>
                    </QRow>
                )}
            </QTable>
        </Container>
    )
}

const Container = styled.div`
    margin: 2rem 20vw;
`;
const ProfileCont = styled.div`
    display: flex;
    gap: 5rem;
`
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
const MenuNavbar = styled.div`
    display: flex;
    align-items: baseline;
    margin: 1rem 0;
`
const QTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border: 1.15px solid rgb(232,232,232);
    border-radius: 0.5rem;
    box-shadow: 18px 8px 30px -11px rgba(173,173,173,0.75);
`
const QRow = styled.tr`
    height: 3rem;
    border-collapse: separate;
    border: 1px solid black;
    &{
        text-align: left;
        border-radius: 1.2rem;
        cursor: pointer;
    }
    &:nth-child(2n){
        background: var(--main-color);
    }
`