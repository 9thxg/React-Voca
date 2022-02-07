import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../hook/useFetch";
import { IDay } from './DayList';
import Word, { IWord } from "./Word";

export default function Day() {
    const { day } = useParams<{ day: string }>();
    const days: IDay[] = useFetch("http://localhost:3002/days")    
    const words: IWord[] = useFetch(`http://localhost:3002/words?day=${day}`);

    const [prevLock, setPrevLock] = useState(false);
    const [nextLock, setNextLock] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(Number(day) === 1){
            setPrevLock(true);
        }
        else{
            setPrevLock(false);
        }
        if(Number(day) === days.length){
            setNextLock(true);
        }
        else{
            setNextLock(false);
        }
    }, [day, days])

    function prev(){
        if(!prevLock){
            navigate(`/day/${Number(day)-1}`);
        }
    }

    function next(){
        if(!nextLock){
            navigate(`/day/${Number(day)+1}`);
        }
    }

    return(
        <>
            <div className='word_head'>
                <button className='page_btn' onClick={prev}
                style={{ opacity : prevLock ? 0.3 : 1}}> &lt; </button>
                <h2>Day {day}</h2>
                <button className='page_btn' onClick={next}
                style={{ opacity : nextLock ? 0.3 : 1}}> &gt; </button>
            </div>
            {words.length === 0 && <span>Loading...</span>}
            <table>
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id}/>
                    ))}
                </tbody>
            </table>
        </>
    )
    
}