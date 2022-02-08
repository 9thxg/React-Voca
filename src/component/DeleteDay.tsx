import React, { useState } from 'react'
import useFetch from "../hook/useFetch";
import {useNavigate} from "react-router-dom";
import { IDay } from "./DayList";
import { IWord } from "./Word";

export default function DeleteDay() {
    const days: IDay[] = useFetch("http://localhost:3002/days");
    const words: IWord[] = useFetch(`http://localhost:3002/words?day=${days.length}`);
    
    console.log(words);

    const navigate = useNavigate();

    const DelWord = (word: number) => {
        return new Promise((resolve) => {
            fetch(`http://localhost:3002/words/${word}`, {
                method : 'DELETE',
            }).then((res) => {
                resolve(res);
            })
        })
    }

    function DelDay() {
        if(window.confirm("정말 삭제하시겠습니까?(내용도 함께 사라집니다.)")){
            if(words.length === 0){
                fetch(`http://localhost:3002/days/${days.length}`, {
                    method : 'DELETE',
                }).then(res => {
                    if(res.ok){
                        alert("삭제되었습니다 !");
                        navigate(`/`);
                    }
                })
            }
            else{
                // words.map(word => (
                //     fetch(`http://localhost:3002/words/${word.id}`, {
                //         method : 'DELETE',
                //     })
                // ))
                words.forEach(async (word) => await DelWord(word.id));

                fetch(`http://localhost:3002/days/${days.length}`, {
                    method : 'DELETE',
                }).then(res => {
                    if(res.ok){
                        alert("삭제되었습니다 !");
                        navigate(`/`);
                    }
                })
            }
        }
    }

    return (
        <div>
            <h2>현재일수 : {days.length}일</h2>
            <button className='btn_del' onClick={DelDay}>Day 삭제</button>
        </div>
    )
};
