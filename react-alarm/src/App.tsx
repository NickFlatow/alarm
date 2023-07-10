import './App.css';
import React, {useEffect, useState } from 'react';
import { alarm, Day } from '../../ts/types';
import { fetchURL,throttledFetch } from './fetch';

export default function App() {
    return <AlarmTable />;
}

//TODO COMPONENT KEYS

function AlarmTable() {
    const [alarms, setAlarms] = useState([]);
    
    const fetchAlarmData = () => { 
        fetch(fetchURL)
        .then(response => response.json())
        .then(alarms => {
            setAlarms(alarms);
        });
    }

    useEffect(() => {
        fetchAlarmData()
    }, []);

    return (
        <div className="card" style={{marginTop:'10px'}}>
            <AlarmContainer key={`${Math.floor(Math.random() * 100) + 1}`} alarms={alarms}/>
            <button className="rounded-button yellow">+</button>
        </div>
    )
}
function AlarmContainer({alarms}:{alarms:alarm[]}) {
    return (
        <div className="alarms">
            {alarms.length && alarms.map((alarm: alarm) => (
                <div className="alarm-container">
                    <TimeContainer key={`tc ${alarm.id}`} alarm={alarm} />
                    <SchedulerContainer key={`sc ${alarm.id}`} alarm={alarm} />
                </div>
            ))}
        </div>
    )
}
function TimeContainer({alarm}:{alarm:alarm}) {
    return (
        <div className="time-container">
            <h1 className="time">{alarm.time}</h1>
        </div>
    )
}
function SchedulerContainer({alarm}:{alarm:alarm}) {
    const [active,setActive ] = useState(alarm.active);
    
    return (
        <div className="schedule-container">
            {/* 
                div to group all button together
                remove div to fit the width of the screen
            */}
            <div>
                {alarm.days.map((day,index) => (
                    <DayButton
                        key={`db ${day.dayOfWeek} ${Math.floor(Math.random() * 100) + 1}`}
                        day={day}
                        alarm={alarm}
                        index={index}
                    />
                ))}
            </div>
            <EnableSwitch 
                key={`es ${alarm.id}`}
                alarm={alarm} 
                active={active}
                setActive={setActive}
            />
        </div>
    )
}


function DayButton({day,alarm,index}:{day:Day,alarm:alarm,index:number}) {
    const [activeDay,setActiveDay] = useState(day.active);
    return (
        <button 
            className="rounded-button blue"
            style={{ opacity: activeDay ? 1 : 0.5 }}
            onClick= {_ => {
                const updatedState = !day.active;
                setActiveDay(updatedState);
                alarm.days[index].active = updatedState;
                throttledFetch(alarm);
            }}
        >
        {day.dayOfWeek}
        </button>
    )
}
function EnableSwitch({alarm,active,setActive}:{alarm:alarm,active:boolean,setActive:(active:boolean)=>void }) {
    return (
        <>
            <input 
                type="checkbox" 
                className="switch-checkbox"
                id={alarm.id} 
                checked={active}
                onChange={(e) =>{
                    setActive(e.target.checked)
                    alarm.active = e.target.checked;
                    throttledFetch(alarm);
                }}
            />
            <label className="switch-label bottom" htmlFor={alarm.id}></label>
        </>
    )   
}


