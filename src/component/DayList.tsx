import React from 'react'
import {Link} from "react-router-dom";
import useFetch from "../hook/useFetch";

export interface IDay{
    id: number;
    day: number;
}

export default function DayList() {
    const days: IDay[] = useFetch("http://localhost:3002/days")    
    
    if(days.length === 0){
        return <span>Loading...</span>
    }

    return (
        <div>
            <ul className="list_day">
                {days.map(day => (
                    <li key={day.id}>
                        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}