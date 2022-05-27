import React, { useState, useEffect } from "react";
import "../../styles/css/main.css";

const InputContainer = ({ label, isValid, alertUser, count, maxCount, children }) => {

    const [styles, setStyles] = useState("");

    // When the component is mounted we need to determine what color the border should be using computeStyles()
    // isValid and alertUser are passed in as props from an InputField e.g TagField, and are used to manipulate border color
    // This could be offloaded to a custom hook
    useEffect(() => {
        const computeStyles = () => {
            if (isValid) return "input__container isValid";
            if (alertUser) return "input__container alertUser";
            return "input__container";
        };

        const computedStyles = computeStyles();
        setStyles(computedStyles);
    }, [isValid, alertUser]);
    
    return (
        <div className={styles}>
            <div className="input__label">{label}</div>
            {children}
            <div className="input__counter">{count}/{maxCount}</div>
        </div>
    )
};

export default InputContainer;