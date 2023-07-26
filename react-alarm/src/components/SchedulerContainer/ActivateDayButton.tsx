import React, { useState } from 'react';
import { alarm,Day} from '../../../../ts/types';
import { throttledUpdate } from '../../utils/fetch';

export function ActivateDayButton({day,alarm,index,enableSwitch}:{day:Day,alarm:alarm,index:number,enableSwitch:boolean}) {
    const [activeDay,setActiveDay] = useState(day.active);
    return (
        <button 
            className="rounded-button blue"
            // dim the lights and disable the button is enableSwitch is false
            style={{ opacity: enableSwitch ? (activeDay ? 1 : 0.5) : 0.1 }}
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