import React from "react";
import { throttledUpdate } from "../utils/fetch";
import { alarm } from "../../../ts/types";


export function ActivateAlarmSwitch({alarm,active,setActive}:{alarm:alarm,active:boolean,setActive:(active:boolean)=>void }) {
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
                    throttledUpdate(alarm);
                }}
            />
            <label className="switch-label bottom" htmlFor={alarm.id}></label>
        </>
    )   
}