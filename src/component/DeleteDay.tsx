import React from 'react'
import useFetch from "../hook/useFetch";
import {useNavigate} from "react-router-dom";
import { IDay } from "./DayList";

export default function DeleteDay() {
    const days: IDay[] = useFetch("http://localhost:3002/days");

    const navigate = useNavigate();

    function DelDay() {
        if(window.confirm("정말 삭제하시겠습니까?(내용도 함께 사라집니다.)")){
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

    return (
        <div>
            <h2>현재일수 : {days.length}일</h2>
            <button className='btn_del' onClick={DelDay}>Day 삭제</button>
        </div>
    )
};
