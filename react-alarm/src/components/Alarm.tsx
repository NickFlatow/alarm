import React, {useState} from 'react';
import { alarm } from '../../../ts/types'
// import { TimeContainer,SchedulerContainer} from '../App'
import { DeleteButton } from './DeleteButton';
import { CollapseButton } from './CollapseButton';
import { SchedulerContainer } from './SchedulerContainer/SchedulerContainer';



/**
 * Contianer to hold all alarm components
 * 
 */
// export function Alarm({alarm,index,alarms,setAlarm}:{alarm:alarm,index:number,alarms:alarm[],setAlarm:(alarms:alarm[])=>void}) {
export function Alarm({index,alarms,setAlarm}:{index:number,alarms:alarm[],setAlarm:(alarms:alarm[])=>void}) {
    //set the visibility of the delete button hiden by default
    const [collapseDisplay, setCollapseDisplay] = useState("none");
    return (
        <div className="alarm-container">
            <CollapseButton 
                deleteDisplays={collapseDisplay}
                setDeleteDisplays={setCollapseDisplay}
                index={index}

            />
            {/* <TimeContainer 
                alarm={alarms[index]} 
            /> */}

            <SchedulerContainer 
                alarm={alarms[index]}
            />
            <DeleteButton
                alarm={alarms[index]}
                alarms={alarms}
                setAlarms={setAlarm}
                displayType={collapseDisplay}
            />
        </div>
    )

}