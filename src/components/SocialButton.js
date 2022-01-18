import React from 'react';
import './SocialButton.scss';

const SocialButton = (props) => {
    function openLink(link) {
        console.log(`openLink`);
        window.open(link, '_blank')
    }

    return (
        <div className="socailbtn"  onClick={() => openLink(props.link)} >
            <input className="socailbtn_img" type="image" src={props.button_image} alt={props.alt} />
            <p className="socailbtn_label">{props.socialname}</p>
        </div>
    );
}

export default SocialButton;