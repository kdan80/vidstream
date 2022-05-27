import React, { useState } from "react";
import InputContainer from "../InputContainer";
import data from "./data.json";

const UserField = ({
    user,
    setUser,
    userIsValid,
    setUserIsValid
    }) => {

    const [inputIsDirty, setInputIsDirty] = useState(false);
    const {label, minChars, maxChars} = data;

    const validateUser = user => {
        if (user.length < minChars || user.length > maxChars) return setUserIsValid(false);
        setUserIsValid(true);
    };

    const handleChange = e => {
        if (e.target.value.length >= minChars) setInputIsDirty(true);
        validateUser(e.target.value);
        setUser(e.target.value);
    };

    const handleBlur = () => {
        setInputIsDirty(true);
    };

    return (
        <InputContainer
            label={label}
            isValid={userIsValid}
            alertUser={!userIsValid && inputIsDirty}
            count={user.length}
            maxCount={maxChars}
        >
            <input 
                name="user" 
                value={user} 
                type="text" 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
            />
        
        </InputContainer>
    )
}

export default UserField;
