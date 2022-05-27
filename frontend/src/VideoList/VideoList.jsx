import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard/VideoCard";
import Top10Tags from "./Top10Tags/Top10Tags";
import axios from "axios";
import "../styles/css/main.css";

const VideoList = () => {

    const [top10Tags, setTop10Tags] = useState([]);
    const [currentTag, setCurrentTag] = useState("All");
    const [videos, setVideos] = useState([]);

    const getVideos = async() => {
        const res = await axios.get("http://192.168.1.21:4001/api/videos");
        return res;
      }

    // This function does too much. Consider breaking down into smaller functions
    const getTop10Tags = videos => {

        // Extract tags from video list and push to a tag list
        const unsortedTags = [];
        for(const video of videos){
            for (const tag of video.tags){
                unsortedTags.push(tag);
            }
        }

        // Compute the frequency of each tag
        const tagFrequency = {};
        for(const tag in unsortedTags){
            const value = unsortedTags[tag];
            (value in tagFrequency) ? tagFrequency[value]++ : tagFrequency[value] = 1;
        }

        // Make an array from the frequency object to de-duplicate
        const uniqueTags = [];
        for(const value in tagFrequency) {
            uniqueTags.push(value);
        }

        // Sort the unique tags array in descending order of frequency
        const compareFrequency = (a, b) => {
            return tagFrequency[b] - tagFrequency[a];
        }
        uniqueTags.sort(compareFrequency);

        // Get the 10 most frequent tags and discard the rest
        return setTop10Tags(uniqueTags.slice(0,10));
    };

    const filterVideosByTag = videos => {
        if(currentTag === "All") return videos;
        const filteredVideos = videos.filter((curr) => curr.tags.includes(currentTag));  
        return filteredVideos;
    };

    useEffect(() => {
        (
            async () => {
                const res = await getVideos();
                setVideos(res.data);
                getTop10Tags(res.data);
        })();
    },[]);

    return (
        <>
            <Top10Tags top10Tags={top10Tags} currentTag={currentTag} setCurrentTag={setCurrentTag}/>
            <div className="videoList__grid">
            {
                filterVideosByTag(videos).map((video, index) => {
                    return <VideoCard key={index}
                                imageSrc={`http://192.168.1.21:4001/api/videos/${video.v_id}/thumb`}
                                title={video.title}
                                v_id={video.v_id}
                                views={video.views}
                                description={video.description}
                                duration={video.duration}
                                date={video.dateCreated}
                                channel={video.user}
                                iconColor={video.color}
                                likes={video.likes}
                            />
                }).reverse()
            }
            </div>
        </>
    )
};

export default VideoList;
