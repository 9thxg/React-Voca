import useFetch from "../hook/useFetch";
import {useNavigate} from "react-router-dom";

export default function CreateDay() {
    const days = useFetch("http://localhost:3002/days");

    const navigate = useNavigate();

    function addDay() {
        fetch(`http://localhost:3002/days/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day : days.length + 1,
            }),
        }).then(res => {
            if(res.ok){
                alert("추가되었습니다 !");
                navigate(`/`);
            }
        })
    }

    return (
        <div>
            <h2>현재일수 : {days.length}일</h2>
            <button onClick={addDay}>Day 추가</button>
        </div>
    )
};
