import './App.css';
import React, {useEffect, useState } from 'react';
import { alarm, Day } from '../../ts/data';

const URL = "http://10.0.0.45:3000/alarm";

export default function App() {
    return <AlarmTable />;
}


function AlarmTable() {
    const [alarms, setAlarms] = useState([]);
    
    const fetchAlarmData = () => { 
        fetch(URL)
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
                <div className="alarm-container" style={{marginBottom: '10px'}}>
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
                {alarm.days.map((day) => (
                    <DayButton
                        key={`db ${day.dayOfWeek} ${Math.floor(Math.random() * 100) + 1}`}
                        day={day}
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


function DayButton({ day }:{day:Day}) {
    return (
        <button 
            className="rounded-button blue"
            style={{ opacity: day.active ? 1 : 0.5 }}
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
                    console.log(e.target.checked)
                    alarm.active = e.target.checked;
                    updateAlarm(alarm);
                }}
            />
            <label className="switch-label bottom" htmlFor={alarm.id}></label>
        </>
    )   
}
function updateAlarm(alarm:alarm) {
    fetch(`${URL}/${alarm.id}`, {
        method: 'PUT',
        body: JSON.stringify(alarm),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.status)
    })
    .catch(error => {
        // Handle error
    });
};


