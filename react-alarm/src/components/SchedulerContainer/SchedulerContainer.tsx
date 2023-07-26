import React, { useState } from 'react';
import { alarm} from '../../../../ts/types'
import { Day } from '../../../../ts/types'
import { TimeContainer } from './TimeContainer';
import { ActivateAlarmSwitch } from './ActivateAlarmSwitch';
import { ActivateDayButton } from './ActivateDayButton';

import './SchedulerContainer.scss';


export function SchedulerContainer({alarm}:{alarm:alarm}) {
    const [activeAlarm, setActiveAlarm] = useState(alarm.active);
    return (
        <div>
            <TimeContainer 
                alarm={alarm} 
            />
            <div className="schedule-container">
                {/* 
                    div to group all button together
                    remove div to fit the width of the screen
                */}
                <div>
    
                    {alarm.days.map((day:Day,index:number) => (
                        <ActivateDayButton
                            // key={`db ${day.dayOfWeek} ${Math.floor(Math.random() * 100) + 1}`}
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
        </div>
    )
}