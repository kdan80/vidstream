import React from "react";
import "../../styles/css/main.css";

const Top10Tags = ({top10Tags, currentTag, setCurrentTag}) => {

    const handleClick = e => {
        setCurrentTag(e.target.name)
    }

    return (
        <div className="top10Tags">
            <button 
                name="All" 
                className={`top10Tags__button ${(currentTag === "All") ? "toggled" : ""}`} 
                onClick={handleClick}
            >
                    All
            </button>
            {
                top10Tags.map((tag,index) => {
                    return(
                        <button 
                            name={tag} 
                            className={`top10Tags__button ${(currentTag === tag) ? "toggled" : ""}`} 
                            key={index} 
                            onClick={handleClick}
                        >
                                {tag}
                        </button>
                    )
                })
            }
        </div>
    )
};

export default Top10Tags;
