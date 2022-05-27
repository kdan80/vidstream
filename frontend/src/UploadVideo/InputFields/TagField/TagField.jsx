import React, { useState } from "react";
import "../../../styles/css/main.css";
import InputContainer from "../InputContainer";
import { MdClose } from "react-icons/md";
import data from "./data.json";

const TagField = ({
    tags,
    setTags,
    tagsIsValid,
    setTagsIsValid
    }) => {
    
    const [value, setValue] = useState("");
    const [inputIsDirty, setInputIsDirty] = useState(false);
    const {label, minTags, maxTags} = data;

    const validateTags = newTags => {
        if (newTags.length < minTags || newTags.length > maxTags) return setTagsIsValid(false);
        return setTagsIsValid(true);
    };

    const handleChange = e => {
        setValue(e.target.value);
    };

    // Keycodes 9 = tab, 13 = enter, 66 = next (android)
    const handleKeyDown = e => {
        if (!value || tags.includes(value)) return;
        if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 66){
            addTag(value);
            setValue("");
            setInputIsDirty(true);
        }
    };

    const handleBlur = () => {
        if (!tags.length) return setInputIsDirty(true);
    };

    const addTag = tag => {
        const newTags = [...tags, tag];
        setTags(
            newTags
        );
        validateTags(newTags);
    };

    const deleteTag = indexToRemove => {
        const newTags = [...tags.filter((_, index) => index !== indexToRemove)];
        setTags(
            newTags
        );
        validateTags(newTags);
    };

    return (
        <InputContainer
            label={label}
            isValid={tagsIsValid}
            alertUser={!tagsIsValid && inputIsDirty}
            count={tags.length}
            maxCount={maxTags}
            isTagField={true}
        >
            
            <ul className="taglist">

                {
                        tags.map((tag, index) => {
                            return (
                                <li key={index} className="tag">
                                    <span className="tag__text">{tag}</span>
                                    <MdClose className="btn__closeTag" onClick={() => deleteTag(index)} />
                                </li>
                            )
                        })
                }

            </ul>

            <input
                name="tags" 
                enterKeyHint="enter"
                value={value} 
                type="text" 
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            
        </InputContainer>
    )
}

export default TagField;
