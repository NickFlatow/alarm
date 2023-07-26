import { v4 as uuidv4 } from 'uuid';
import React, {useEffect, useState } from 'react';

import { alarm } from '../../ts/types';
import { fetchURL,throttledCreate } from './utils/fetch';


import { Alarm }  from './components/Alarm';

import './App.css';


export default function App() {
    return <AlarmTable />;
}


function AlarmTable() {
    const a:alarm[] = [];
    const [alarms, setAlarms] = useState(a);
    
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
            <AlarmContainer key={`${Math.floor(Math.random() * 100) + 1}`} 
                alarms={alarms}
                setAlarm={setAlarms}
            />
            <CreateAlarmBtn 
                alarms={alarms}
                setAlarm={setAlarms}
            />
        </div>
    )
}

function AlarmContainer({alarms,setAlarm}:{alarms:alarm[],setAlarm:(alarms:alarm[])=>void}) {
    
    return (
        <div className="alarms">
            {alarms.length && alarms.map((alarm: alarm, index: number) => (
                <Alarm 
                    key={`a ${alarm.id}`}
                    // alarm={alarm}
                    index={index}
                    alarms={alarms}
                    setAlarm={setAlarm}
                />
            ))}
        </div>
    )
}

function CreateAlarmBtn({alarms,setAlarm}:{alarms:alarm[],setAlarm:(alarms:alarm[]) => void}) {
    return (
        <div className="flex-container">
            <div className="picker-strech">
                <button 
                    className="button-container rounded-button yellow"
                >
                    +
                </button>
                <input type="time"
                    onChange={(e) => {
                        const time = e.target.value;
                        const alarm:alarm = {
                            id: uuidv4(),
                            time: time,
                            active: true,
                            days: [
                                { dayOfWeek: "S", active: false },
                                { dayOfWeek: "M", active: false },
                                { dayOfWeek: "T", active: false },
                                { dayOfWeek: "W", active: false },
                                { dayOfWeek: "T", active: false },
                                { dayOfWeek: "F", active: false },
                                { dayOfWeek: "S", active: false }                       
                            ]
                        }
                        const newAlarms = [...alarms,alarm];
                        setAlarm(newAlarms);
                        throttledCreate(alarm);
                    }}
                />
            </div>
        </div>
    )
}





