import React, { useState } from "react";
import InputContainer from "../InputContainer";
import data from "./data.json";

const DescriptionField = ({
    description, 
    setDescription, 
    descriptionIsValid, 
    setDescriptionIsValid
    }) => {

    // isDirty booleans are used throughout this app to detect if the user has focused & unfocused the input
    // before providing a valid value. It is used to draw an alert around the input
    const [textareaIsDirty, setTextAreaIsDirty] = useState(false);
    const { label, minChars, maxChars } = data;

    const validateDescription = description => {
        if (description.length < minChars || description.length > maxChars) return setDescriptionIsValid(false);
        return setDescriptionIsValid(true);
    };

    const handleChange = e => {
        if (e.target.value.length >= minChars) setTextAreaIsDirty(true);
        validateDescription(e.target.value);
        setDescription(e.target.value);
    };

    const handleBlur = () => {
        setTextAreaIsDirty(true);
    };

    return (
        <InputContainer
            label={label}
            isValid={descriptionIsValid}
            alertUser={!descriptionIsValid && textareaIsDirty}
            count={description.length}
            maxCount={maxChars}
        >
            <textarea 
                name="description" 
                value={description} 
                type="text" 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
            />
        
        </InputContainer>
    )
};

export default DescriptionField;
