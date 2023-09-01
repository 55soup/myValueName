"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLogOut } from "react-icons/fi"

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
        PROFILE_PHOTO : string,
    }
    
    const [userData, setUserData] = useState<Users>({});
    const [content, setContent]  = useState<Content>();
    const [QCount, setQCount] = useState<Number>();
    const [QAvgMess, setQAvgMess] = useState<String>('');

    const selectList:string[] = ["가나다순", "날짜순"];
    const [selected, setSelected] = useState<String>("날짜순");

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        if(selected !== "가나다순"){
            content?.sort((a:Content, b:Content) => {
                if(a.CONTENT > b.CONTENT) return 1;
                else if(a.CONTENT < b.CONTENT) return -1;
                else return 0;
            })
        }
        else if(selected !== "날짜순"){
            content?.sort((a:Content, b:Content) => {
                return b.Q_ID - a.Q_ID;
            })
        }
    }

    const getAvgMess = (qCount:number, qAvg:number):void => {
        console.log(`qcount: ${qCount}`);
        console.log(`qAvg: ${qAvg}`);
        if(qCount-qAvg > 0){ // 다른 유저들보다 질문을 많이 함.
            setQAvgMess(`${qCount-qAvg}번 더 질문했어요!`);
        }else{
            setQAvgMess(`${qAvg-qCount}번 덜 질문했어요!`);
        }
    }

    useEffect(()=>{
        fetch('/api/db/mypage')
        .then((res) => res.json())
        .then((data) => {setUserData(data[0]);});

        fetch('/api/db')
        .then((res) => res.json())
        .then((data) => setContent(data))

        fetch('/api/db/mypage/count_q')
        .then((res) => res.json())
        .then((QCOUNT) => {
            setQCount(QCOUNT[0].COUNT_QUESTIONS);
            fetch('/api/db/mypage/avg_q')
            .then((res) => res.json())
            .then((QAVG) => {getAvgMess(QCOUNT[0].COUNT_QUESTIONS, QAVG[0].AVG_QUESTIONS)})
        })

        // fetch('/api/db/mypage/avg_q')
        // .then((res) => res.json())
        // .then((data) => {getAvgMess(data[0].AVG_QUESTIONS)})
    }, []);

    const toDetail = (data:Content) => {
        // router.push({pathname: `/detail/${data.Q_ID}`, query : {data:data}})
        router.push(`/detail/${data.Q_ID}`);
    }

    return(
        <>
            <Navbar>
                <FiArrowLeft size={30} onClick={()=>{router.push("/")}}/>
                <FiLogOut style={{marginLeft: 'auto'}} size={30} onClick={()=>{router.push("/login")}}/>
            </Navbar>
            <Container>
                <ProfileCont>
                    <Profile imgUrl={userData.PROFILE_PHOTO}/>
                    <div>
                        <div style={{display: 'flex', gap: '1rem', alignItems: 'baseline'}}>
                            <Nickname>{userData.NICKNAME}</Nickname>
                            <Info>@{userData.USER_ID}</Info>
                        </div>
                        <Info>가입일: {userData.JOIN_DATE}</Info>
                        <br />
                        <AccentInfp>총 <strong>{QCount}번</strong> 질문했어요!</AccentInfp>
                        <AccentInfp>다른 유저들보다 평균 <strong>{QAvgMess}</strong></AccentInfp>
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
                            <DateColumn>
                                {a.DATES}
                            </DateColumn>
                        </QRow>
                    )}
                </QTable>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin: 2rem 20vw;
`;
const ProfileCont = styled.div`
    display: flex;
    gap: 5rem;
`;
const Navbar = styled.div`
    display: flex;
    margin: 2rem 5rem;
`;
const Profile = styled.div<{imgUrl:string}>`
    width: 15vw; height: 15vw;
    border-radius: 20rem;
    background: red;
    background: url(${({imgUrl}) => imgUrl}) no-repeat center/cover;
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
const DateColumn = styled.th`
    color: var(--grey-color);
    font-weight: 400;
    text-align: right;
    padding-right: 2rem;
`
