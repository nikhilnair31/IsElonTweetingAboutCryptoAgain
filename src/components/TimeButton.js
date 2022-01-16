import React from 'react';
import './TimeButton.scss';

const TimeButton = (props) => {
    function setTimeSpan() {
        console.log(`setTimeSpan`);
        props.settimespanChanged(true);
        if(props.button_text === "1 W")
            props.setTimeSpan(7);
        else if(props.button_text === "1 M")
            props.setTimeSpan(30);
        else if(props.button_text === "1 Y")
            props.setTimeSpan(1*365);
        else if(props.button_text === "3 Y")
            props.setTimeSpan(3*365);
        else if(props.button_text === "5 Y")
            props.setTimeSpan(365*5);
    }

    return (
        <button className="timebutton" onClick={()=>setTimeSpan()}>{props.button_text}</button>
    );
}

export default TimeButton;