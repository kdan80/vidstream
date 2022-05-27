import React, { useState, useEffect } from "react";
import "../../styles/css/main.css";
import { Link } from "react-router-dom";

const VideoCard = ({ imageSrc, title, v_id, description, views: rawViews, date: ISOdate, duration: rawDuration, channel, iconColor, likes }) => {
    
    const [duration, setDuration] = useState(0);
    const [views, setViews] = useState(0);
    const [date, setDate] = useState("");

    // Video duration is stored as seconds in the db. We need to format it to hh:mm:ss
    const formatDuration = (duration) => {

        // Ensure duration is a number
        const sec = Number(duration)

        // Get hours
        let h = Math.floor(sec / 3600);

        // Get mins and add a leading 0 if required
        let m = Math.floor(sec % 3600 / 60);
        m = m < 10 ? `0${m}` : m;

        // Get seconds and add a leading 0 if required
        let s = Math.floor(sec % 3600 % 60);
        s = s < 10 ? `0${s}` : s;

        // If video is under 1 min in duration the format should be e.g. 0:32
        if(sec < 60) return setDuration(`0:${s}`);

        // If it is between 1 min and 1 hour the format should be e.g. 23:32
        if(sec >= 60 && sec < 3600 ) return setDuration(`${m}:${s}`);

        // If is longer than 1 hour it should be e.g. 1:23:32
        if(sec >= 3600) return setDuration(`${h}:${m}:${s}`);
    };

    const formatViews = (views) => {
        if(views > 1e7) return setViews(`${Math.floor(views / 1000000)}M`);
        if(views > 1e6) return setViews(`${Math.floor(views / 100000)/10}M`);
        if(views > 1e4) return setViews(`${Math.floor(views / 1000)}K`);
        if(views > 1e3) return setViews(`${Math.floor(views / 100)/10}K`);
        setViews(views); 
    };

    // Mongodb stores date in ISO format so we need to convert it to dd/mm/yyyy
    const formatDate = (date) => {
        const d = new Date(date);
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        let year = `${d.getFullYear()}`;
        
        month = month.length < 2 ? `0${month}` : month;
        day = day.length < 2 ? `0${day}` : day;
        
        return setDate([day, month, year].join('/'));
    };
    
    // Re-structure the video here so when we pass it to <Link> the code is a little cleaner
    const video = {
        v_id: v_id,
        title: title,
        description: description,
        views: rawViews,
        date: ISOdate,
        duration: duration,
        channel: channel,
        iconColor: iconColor,
        likes: likes
    }

    useEffect(() => {
        formatDuration(rawDuration);
        formatViews(rawViews);
        formatDate(ISOdate);
    }, [rawDuration, rawViews, ISOdate])
    
    return (
        <div className="videoCard">
            <Link 
                to={`/watch/${v_id}`}
                state={video}
                className="videoCard__thumb"
            >
                <img src={imageSrc} alt="thumbnail" />
                <span className="videoCard__duration">{duration}</span>
            </Link>
            
            <div className="videoCard__details">

                <div className="videoCard__channelIcon" style={{backgroundColor: iconColor}}>
                    {channel.substring(0,2)}
                </div>

                <div className="videoCard__bottomPanel">
                    <Link 
                    to={`/watch/${v_id}`}
                    state={video}
                    className="videoCard__title"
                    >
                        {title}
                    </Link>

                    <div >
                        <div>{channel}</div>
                        <span>{views} views</span>
                        <span>&nbsp; &bull; &nbsp;</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideoCard;