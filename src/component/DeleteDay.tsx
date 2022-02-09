import React from 'react'
import useFetch from "../hook/useFetch";
import {useNavigate} from "react-router-dom";
import { IDay } from "./DayList";
import { IWord } from "./Word";

export default function DeleteDay() {
    const days: IDay[] = useFetch("http://localhost:3002/days");
    const words: IWord[] = useFetch(`http://localhost:3002/words?day=${days.length}`);

    const navigate = useNavigate();

    const DelWord = () => {
        const wordId = words.map(word => word.id);

        //console.log(wordId.toString());

        return (
            fetch(`http://localhost:3002/words/${wordId.toString()}`, {
                method : 'DELETE',
            })
        )
        
        // return new Promise((resolve) => {
        //     fetch(`http://localhost:3002/words/${wordId}`, {
        //         method : 'DELETE',
        //     }).then((res) => {
        //         resolve(res);
        //     })
        // })
    }

    const DelDay = (day: number) => {
        fetch(`http://localhost:3002/days/${day}`, {
            method : 'DELETE',
        }).then(res => {
            if(res.ok){
                alert("삭제되었습니다 !");
                navigate(`/`);
            }
        })
    }

    function Delete() {
        if(window.confirm("정말 삭제하시겠습니까?(내용도 함께 사라집니다.)")){
            if(words.length === 0){
                DelDay(days.length);
            }
            else{
                DelWord()
                .then(res => {
                    if(res.ok){
                        DelDay(days.length);
                    }
                })
                // words.map(word => (
                //     fetch(`http://localhost:3002/words/${word.id}`, {
                //         method : 'DELETE',
                //     })
                // ))
                // words.forEach(async (word) => await DelWord(word.id));

                // Promise.all([words.map(async (word) => await DelWord(word.id))])
                // .then((res) => {
                //     console.log(res);
                // })

                // fetch(`http://localhost:3002/days/${days.length}`, {
                //     method : 'DELETE',
                // }).then(res => {
                //     if(res.ok){
                //         alert("삭제되었습니다 !");
                //         navigate(`/`);
                //     }
                // })
            }
        }
    }

    return (
        <div>
            <h2>현재일수 : {days.length}일</h2>
            <button className='btn_del' onClick={Delete}>Day 삭제</button>
        </div>
    )
};
