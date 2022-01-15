import React from 'react';
import './SocialButton.scss';

const SocialButton = (props) => {
    function openLink(link) {
        console.log(`openLink`);
        window.open(link, '_blank')
    }

    return (
        <input className="socailbtn" type="image" src={props.button_image} alt={props.alt} onClick={() => openLink(props.link)} />
    );
}

export default SocialButton;