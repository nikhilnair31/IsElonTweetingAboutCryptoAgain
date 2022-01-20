import React from 'react';
import './TimeButton.scss';

const TimeButton = (props) => {
    function setTimeSpan() {
        console.log(`setTimeSpan`);
        if(props.button_text === "1 M"){
            props.setTimeSpan(30);
            props.setinterval('daily');
            props.setpointRadius(8);
        }
        if(props.button_text === "6 M"){
            props.setTimeSpan(30*6);
            props.setinterval('daily');
            props.setpointRadius(6);
        }
        else if(props.button_text === "1 Y"){
            props.setTimeSpan(1*365);
            props.setinterval('daily');
            props.setpointRadius(3);
        }
    }

    return (
        <button className="timebutton" onClick={()=>setTimeSpan()}>{props.button_text}</button>
    );
}

export default TimeButton;