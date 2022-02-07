import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { IDay } from "./DayList";

export default function CreateWord() {
    const days: IDay[] = useFetch("http://localhost:3002/days");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function onSubmit(e:React.FormEvent){
        e.preventDefault();
        
        if(!isLoading && engRef.current && korRef.current && dayRef.current){
            setIsLoading(!isLoading);
            
            const eng = engRef.current.value;
            const kor = korRef.current.value;
            const day = dayRef.current.value;

            fetch(`http://localhost:3002/words/`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    eng,
                    kor,
                    day,
                    isDone : false,
                }),
            }).then(res => {
                if(res.ok){
                    alert("추가되었습니다 !");
                    setIsLoading(!isLoading);
                    navigate(`/day/${day}`);
                }
            })
        }
    }

    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="english" ref={engRef}/>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="영어" ref={korRef}/>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map( day => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
            style={{
                opacity : isLoading ? 0.3 : 1,
            }}
            >{isLoading ? "Saving..." : "저장"}</button>
        </form>
    )
};
