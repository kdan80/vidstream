import React, { useState } from "react";
//import "../InputFields.css";
import InputContainer from "../InputContainer";
import data from "./data.json";

const TitleField = ({title, setTitle, titleIsValid, setTitleIsValid}) => {

    const [inputIsDirty, setInputIsDirty] = useState(false);
    const {label, minChars, maxChars} = data;

    const validateTitle = title => {
        if (title.length < minChars || title.length > maxChars) return setTitleIsValid(false)
        return setTitleIsValid(true);
    }

    const handleChange = e => {
        if (e.target.value.length >= minChars) setInputIsDirty(true);
        validateTitle(e.target.value);
        setTitle(e.target.value);
    };

    const handleBlur = () => {
        setInputIsDirty(true);
    };

    return (
        <InputContainer
            label={label}
            isValid={titleIsValid}
            alertUser={!titleIsValid && inputIsDirty}
            count={title.length}
            maxCount={maxChars}
        >

            <input 
                name="title" 
                value={title} 
                type="text" 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
            />
        
        </InputContainer>
    )
};

export default TitleField;
