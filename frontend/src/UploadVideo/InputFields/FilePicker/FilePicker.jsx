import React, { useState, useRef } from "react";
import "../../../styles/css/main.css";

const FilePicker = ({setFile, file}) => {

    const inputRef = useRef(null);
    const [invalidFile, setInvalidFile] = useState(false);

    // Pass the Button click event to the Input/File Selector thereby opening a file upload dialog
    const handleClick = () => {
        if(inputRef && inputRef.current) {
            inputRef.current.click();
        }
    };

    const fileHandler = file => {
        // If no file was selected exit
        if(!file) return;

        // If the selected file is not a video warn the user and exit
        if(!file.type.includes("video/mp4")) return setInvalidFile(true);

        // Otherwise we have a valid video file and should update the state
        setFile(file);
        setInvalidFile(false);
    };

    const handleChange = e => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) return;
        fileHandler(e.target.files[0]);
    };

    return (
        <div className="filePicker__container">
            <input 
                name="file"
                type="file"
                ref={inputRef}
                onChange={handleChange}
                style={{display: "none"}}
            />
            <button 
                type="button"
                onClick={handleClick}
                className="btn">
                Browse...
            </button>
            
                {
                    // nested ternary operators!!
                    invalidFile
                        ? <span className="invalidFile">
                            invalid file type, the video must be .mp4
                          </span>
                        : file
                            ? <span>
                                {file.name}
                              </span>
                            : "Select a video to upload"
                                
                        
                }
           
        </div>
    )
};

export default FilePicker;
