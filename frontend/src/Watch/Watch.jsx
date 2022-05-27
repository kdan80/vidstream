import React, { useEffect } from "react";
import "../styles/css/main.css";
import { useLocation } from "react-router";
import axios from "axios";

const Watch = () => {

    // Props have been passed in as state via <Link state={}> in the VideoCard component. We access them here via useLocation()
    const location = useLocation();
    const {state} = location;

    // Add commas to the number of views etc to make them more palatable
    const insertCommas = numOfViews => {
        return numOfViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format date to dd mmm yyyy
    const formatDate = (ISOdate) => {
        const date = new Date(ISOdate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let month = `${date.getMonth() + 1}`;
        let day = `${date.getDate()}`;
        let year = `${date.getFullYear()}`;
        
        month = months[month -1 ];
        day = day.length < 2 ? `0${day}` : day;

        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        // When component is mounted call an API endpoint to increase the view count
        // In real life this would be linked to how much of the video had been streamed
        const incrementViews = async() => {
            return await axios.patch(`http://192.168.1.21:4001/api/videos/${state.v_id}/views`);
        };
        incrementViews();
    }, [state.v_id])

    return (
        <div className="watch__root">       
            <div className="video">
                <video controls >
                    <source src={`http://192.168.1.21:4001/api/watch/${state.v_id}`} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>

                {/* The bottom half of the Watch component begins here and contains info about the video */}
                <div className="video__bottomPanel">
                    <div className="video__info">
                        <div className="video__title">{state.title}</div>
                        <div className="video__views">
                            <span>{insertCommas(state.views)} views</span>
                            <span>&nbsp; &bull; &nbsp;</span>
                            <span>{formatDate(state.date)}</span>
                        </div> 
                        <div className="video__channel">
                            <div className="icon" style={{backgroundColor: state.iconColor}}>
                                {state.channel.substring(0,2)}
                            </div>
                            <div>{state.channel}</div>
                        </div> 
                    </div>
                    <div className="video__description">{state.description}</div>
                </div>  
            </div>
        </div>
    )
};

export default Watch;