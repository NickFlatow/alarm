import React, {useState} from 'react'


export function CollapseButton({deleteDisplays,setDeleteDisplays,index}:{deleteDisplays:string,setDeleteDisplays:(deleteDisplays:string)=>void,index:number}) {
    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
            setIsActive(!isActive);

            const newDeleteDisplays = deleteDisplays === "none" ? "block" : "none";
            setDeleteDisplays(newDeleteDisplays);

            // Reset isClicked state after 500ms
            setTimeout(() => setIsClicked(false), 500); 
        }
    }
    return (
        <button
            className={`rounded-button yellow delete-display-button ${isActive ? "flip-upside-down" : ""}`}
            onClick={() => {
                handleClick();
            }}
            style={{ marginLeft: 'auto', display: 'block'}}
        >
        ˇ
        </button>
    )
}