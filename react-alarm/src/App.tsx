import { v4 as uuidv4 } from 'uuid';
import React, {useEffect, useState } from 'react';

import { alarm, Day } from '../../ts/types';
import { fetchURL,throttledUpdate,throttledCreate,throttledDelete } from './utils/fetch';

import  {ActivateAlarmSwitch } from './components/ActivateAlarmSwitch'

import './App.css';


export default function App() {
    return <AlarmTable />;
}

//TODO COMPONENT KEYS

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
    // const [alarmsState, setAlarmsState] = useState(alarms);
    const [activeAlarms, setActiveAlarms] = useState(alarms.map(alarm => alarm.active));
    
    //set the visibility of the delete button hiden by default
    const [deleteDisplays, setDeleteDisplays] = useState(alarms.map(_ => "none"));
    return (
        <div className="alarms">
            {alarms.length && alarms.map((alarm: alarm, index: number) => (
                <div className="alarm-container">

                    <CollapseButton 
                        deleteDisplays={deleteDisplays}
                        setDeleteDisplays={setDeleteDisplays}
                        index={index}

                    />
                    <TimeContainer key={`tc ${alarm.id}`} alarm={alarm} />

                    <SchedulerContainer 
                        key={`sc ${alarm.id}`} 
                        alarm={alarm}
                        activeAlarm={activeAlarms[index]}
                        setActiveAlarm={(value: boolean) => {
                            const newActiveAlarms = [...activeAlarms];
                            newActiveAlarms[index] = value;
                            setActiveAlarms(newActiveAlarms);
                        }}
                    />
                    <DeleteButton
                        alarm={alarm}
                        alarms={alarms}
                        setAlarms={setAlarm}
                        displayType={deleteDisplays[index]}

                    />
                </div>
            ))}
        </div>
    )
}
function CollapseButton({deleteDisplays,setDeleteDisplays,index}:{deleteDisplays:string[],setDeleteDisplays:(deleteDisplays:string[])=>void,index:number}) {
    //set debouce on buton
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
        if (!isClicked) {
            console.log("click");
            setIsClicked(true);
            const newDeleteDisplays = [...deleteDisplays];
            newDeleteDisplays[index] = deleteDisplays[index] === "none" ? "block" : "none";
            setDeleteDisplays(newDeleteDisplays);

            // Reset isClicked state after 500ms
            setTimeout(() => setIsClicked(false), 2000); 
        }
    }
    return (
        <button
            className="rounded-button yellow delete-display-button"
            onClick={() => {
                
                // setIsClicked(true);
                handleClick();
            }}
            style={{ marginLeft: 'auto', display: 'block'}}
        >
        ˇ
        </button>
    )



    // return (
    //     <button
    //         className="rounded-button yellow delete-display-button"
    //         onClick= {_ => {
    //             //toggle the visibility of the delete button
                // const newDeleteDisplays = [...deleteDisplays];
                // newDeleteDisplays[index] = deleteDisplays[index] === "none" ? "block" : "none";
                // setDeleteDisplays(newDeleteDisplays);
    //     }}
    //     // style={{ marginLeft: 'auto', display: 'block', padding: '0px',border:'none'}}
    //     style={{ marginLeft: 'auto', display: 'block'}}
    // >
    //  ˇ
    // </button>
    // )

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
function TimePicker({alarm,setTime}:{alarm:alarm,setTime:(time:string) => void}) {
    return (
        <input type="time"
            onChange={(e) => {
                const updatedTime = e.target.value
                setTime(updatedTime);
                alarm.time = updatedTime;
                alarm.active = true;
                throttledUpdate(alarm);
            }}
        />
    ) 
}
function TimeContainer({alarm}:{alarm:alarm}) {
    const [time, setTime] = useState(alarm.time);
    return (
        <div className="time-container picker-strech"
            // onClick= {() => {
            //     //TODO FIX CLICK WINDOW SIZE ON NON MOBILE devices
            //     const timePicker = document.querySelector<HTMLInputElement>('input[type="time"]');
            //     // const timePicker = document.getElementById("myTimePicker");
            //     timePicker?.focus();
            // }}
        >

            <TimePicker 
                alarm={alarm} 
                setTime={setTime} 
            />
            {/* TODO FIX opacity bug: cannot set time when opacity is .1 */}
            <h1 
                className="time orange"
                style={{ opacity: alarm.active ? 1 : .1 }}
            >
                {time}
            </h1>
        </div>
    );
}
function SchedulerContainer({alarm,activeAlarm,setActiveAlarm}:{alarm:alarm,activeAlarm:boolean,setActiveAlarm:(active:boolean)=>void}) {
    return (
        <div className="schedule-container">
            {/* 
                div to group all button together
                remove div to fit the width of the screen
            */}
            <div>
                {alarm.days.map((day:Day,index:number) => (
                    <ActivateDayButton
                        key={`db ${day.dayOfWeek} ${Math.floor(Math.random() * 100) + 1}`}
                        day={day}
                        alarm={alarm}
                        index={index}
                        enableSwitch={activeAlarm}
                    />
                ))}
            </div>
            <ActivateAlarmSwitch 
                key={`es ${alarm.id}`}
                alarm={alarm} 
                active={activeAlarm}
                setActive={setActiveAlarm}
            />
        </div>
    )
}


function ActivateDayButton({day,alarm,index,enableSwitch}:{day:Day,alarm:alarm,index:number,enableSwitch:boolean}) {
    const [activeDay,setActiveDay] = useState(day.active);
    return (
        <button 
            className="rounded-button blue"
            // dim the lights and disable the button is enableSwitch is false
            style={{ opacity: enableSwitch ? (activeDay ? 1 : 0.5) : 0.1 }}
            // disabled={!enableSwitch}
            onClick= {_ => {
                const updatedState = !day.active;
                setActiveDay(updatedState);
                alarm.days[index].active = updatedState;
                throttledUpdate(alarm);
            }}
        >
        {day.dayOfWeek}
        </button>
    )
}

function DeleteButton({alarm,alarms,setAlarms,displayType}:{alarm:alarm,alarms:alarm[],setAlarms:(alarms:alarm[])=>void,displayType:string}) {
    // const [activeDay,setActiveDay] = useState(day.active);
    return (
        <button 
            className="rounded-button yellow"
            onClick= {_ => {
                throttledDelete(alarm);
                //filter alarm out by id
                const updatedAlarms = alarms.filter((a:alarm) => a.id !== alarm.id);
                setAlarms(updatedAlarms);
            }}
            style={{display:displayType}}
        >
        Delete
        </button>
    )
}


