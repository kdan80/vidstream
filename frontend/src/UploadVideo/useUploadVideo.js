import { useState } from "react";
import axios from "axios";

const useUploadVideo = () => {

    const [uploadPercentage, setUploadPercentage] = useState();
    
    const uploadVideo = async(file, videoMetaData) => {

        console.log(videoMetaData);
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("title", videoMetaData.title);
        formData.append("description", videoMetaData.description);
        formData.append("user", videoMetaData.user);
        formData.append("color", videoMetaData.color);

        // FormData does not permit appending an array, only strings or blobs can be appended
        // So we need to loop through the tags array and and append each tag as a key:value pair
        for(const tag in videoMetaData.tags){
            formData.append("tags", videoMetaData.tags[tag])
        }
        
        // Consider adding a CancelToken so that an upload can be cancelled
        try {
            const res = await axios.post("http://192.168.1.21:4001/api/upload", formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    const {loaded, total} = progressEvent;
                    setUploadPercentage((Math.round((loaded * 100) / total)));
                },
            });
            return res;
        } catch (err) {
            process.stdout.write(err);
        }
    };

    return { uploadVideo, uploadPercentage }
}

export default useUploadVideo;