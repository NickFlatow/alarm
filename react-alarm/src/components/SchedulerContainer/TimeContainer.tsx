import React, {useState} from 'react';
import { alarm } from '../../../../ts/types'
import { throttledUpdate } from '../../utils/fetch';


export function TimeContainer({alarm}:{alarm:alarm}) {
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