import './App.css';
import React, {useEffect, useState } from 'react';
import { alarm, Day } from '../../ts/data';

// export interface alarm {
//     id: string;
//     time:string;
//     days: string[];
//     active: boolean;
// }


export default function App() {
    return <AlarmTable />;
}


function AlarmTable() {
    // const rows:ReactElement[] = [];
    const [alarms, setAlarms] = useState([]);
    
    const fetchAlarmData = () => { 
        fetch("http://10.0.0.45:3000/alarm")
        .then(response => response.json())
        .then(alarms => {
            setAlarms(alarms);
        });
    }

    useEffect(() => {
        fetchAlarmData()
    }, []);

    return (
        <div className="card">
            {alarms.length > 0 && (
                <div className="alarms">
                    {alarms.map((alarm: alarm) => (
                        <div className="alarm-container">
                            <div className="time-container">
                                <h1 className="time">{alarm.time}</h1>
                            </div>
                            <div className="enabled-days-container">
                                {/* <h1 className="days">{alarm.days}</h1> */}
                                <div>
                                    {alarm.days.map((day) => (
                                        <EnableDay
                                            key={day.dayOfWeek}
                                            day={day}
                                        />
                                    ))}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="switch-checkbox"
                                    id={alarm.id} 
                                    checked={alarm.active}/>
                                <label className="switch-label bottom" htmlFor={alarm.id}></label>
                            </div>
                        </div>
                    ))}
                    <button className="rounded-button yellow">+</button>
                </div>
            )}
        </div>
    )
    // return (
    //     <div>
    //       {alarms.length > 0 && (
    //         <ul>
    //             {alarms.map((alarm: alarm) => (
    //                 <React.Fragment key={alarm.id}>
    //                     <li><b>id:     </b> {alarm.id}</li>
    //                     <li><b>time:   </b> {alarm.time}</li>
    //                     <li><b>days:   </b></li>
    //                             <ul>
    //                                 {alarm.days.length > 0 && 
                                
    //                                 (alarm.days.map( (day:string) => (
    //                                     <li>{day}</li>
    //                                     )))
    //                                 }
    //                             </ul>
    //                     <li><b>active: </b> {alarm.active.toString()}</li>
    //                     <br />
    //                 </React.Fragment>
    //             ))}
    //         </ul>
    //       )}
    //     </div>
    // );

}

function EnableDay({ day }:{day:Day}) {
    // console.log(day)
    return (
        <button 
            className="rounded-button blue"
            style={{ opacity: day.active ? 1 : 0.5 }}
        >
        {day.dayOfWeek}
        </button>
    )
}

