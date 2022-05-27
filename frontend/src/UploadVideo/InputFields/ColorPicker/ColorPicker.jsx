import React from "react";
import data from "./data.json";
import "../../../styles/css/main.css";

const ColorPicker = ({
    user,
    color,
    setColor
    }) => {

    const { colors } = data;
    
    return (
        <>
            <div>
                Please select a badge to represent your channel;
            </div>
            <ul className="colorPicker__list">
                {
                    colors.map((colorItem, index) => {

                        return (
                            <li 
                                className="colorPicker__listItem" 
                                key={index} 
                                style={{backgroundColor: `${colorItem}`}}
                                onClick={() => setColor(colorItem)}
                            >
                                {/* Nested ternarys: If the user has a valid username (length >= 5)
                                    then the selected color badge should use the first two letters of that name, 
                                    otherwise it should use "vs". All other color badges should be blank/null */}
                                {
                                    (color === colorItem)
                                        ? (user.length >= 5)
                                            ? (user[0] + user[1])
                                            : "vs"
                                        : null
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
};

export default ColorPicker;
