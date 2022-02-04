import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/useFetch";

export default function CreateWord() {
    const days = useFetch("http://localhost:3002/days");

    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault();
        fetch(`http://localhost:3002/words/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                eng : engRef.current.value,
                kor : korRef.current.value,
                day : dayRef.current.value,
                isDone : false,
            }),
        }).then(res => {
            if(res.ok){
                alert("추가되었습니다 !");
                navigate(`/day/${dayRef.current.value}`);
            }
        })
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

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
            <button>저장</button>
        </form>
    )
};
