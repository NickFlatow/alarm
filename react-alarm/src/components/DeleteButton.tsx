import React from 'react'

import { alarm } from '../../../ts/types' 
import { throttledDelete } from '../utils/fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


export function DeleteButton({alarm,alarms,setAlarms,displayType}:{alarm:alarm,alarms:alarm[],setAlarms:(alarms:alarm[])=>void,displayType:string}) {
    // const [activeDay,setActiveDay] = useState(day.active);
    return (
        <button 
            // className="rounded-button yellow"
            onClick= {_ => {
                throttledDelete(alarm);
                //filter alarm out by id
                const updatedAlarms = alarms.filter((a:alarm) => a.id !== alarm.id);
                setAlarms(updatedAlarms);
            }}
            style={{
                display:displayType,
                backgroundColor:"transparent",
                border:'none',
                marginLeft: '10px'
            }}
        >
        <FontAwesomeIcon icon={faTrashCan} size='2x' />
        </button>
    )
}