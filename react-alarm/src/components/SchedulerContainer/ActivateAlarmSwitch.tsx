import React, {useState} from "react";

import { throttledUpdate } from "../../utils/fetch";
import { alarm } from "../../../../ts/types";


export function ActivateAlarmSwitch({alarm,active,setActive}:{alarm:alarm,active:boolean,setActive:(active:boolean)=>void }) {
    //set debouce on toggleSwitch
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isClicked) {
            console.log("click");
            setIsClicked(true);
            
            setActive(e.target.checked)
            alarm.active = e.target.checked;
            throttledUpdate(alarm);

            // Reset isClicked state after 750ms
            setTimeout(() => setIsClicked(false), 500); 
        }
    }
    return (
        <>
            <input 
                type="checkbox" 
                className="switch-checkbox"
                id={alarm.id} 
                checked={active}
                onChange={(e) =>{
                    handleClick(e);
                }}
            />
            <label className="switch-label bottom" htmlFor={alarm.id}></label>
        </>
    )   
}