import React, { useState, useEffect } from "react";
import TagField from "./InputFields/TagField/TagField";
import "../styles/css/main.css";
import TitleField from "./InputFields/TitleField/TitleField";
import DescriptionField from "./InputFields/DescriptionField/DescriptionField";
import UserField from "./InputFields/UserField/UserField";
import ColorPicker from "./InputFields/ColorPicker/ColorPicker";
import FilePicker from "./InputFields/FilePicker/FilePicker";
import useUploadVideo from "./useUploadVideo";
import ProgressDialog from "./ProgressDialog/ProgressDialog";

const UploadVideo = ({setShowUploadLink}) => {

    const [file, setFile] = useState();

    const [title, setTitle] = useState("");
    const [titleIsValid, setTitleIsValid] = useState(false);

    const [description, setDescription] = useState("");
    const [descriptionIsValid, setDiscriptionIsValid] = useState(false);

    const [tags, setTags] = useState([]);
    const [tagsIsValid, setTagsIsValid] = useState(false);

    const [user, setUser] = useState("");
    const [userIsValid, setUserIsValid] = useState(false);

    const [color, setColor] = useState("#9e9e9e");

    const [formIsValid, setFormIsValid] = useState(false);
    const [videoMetaData, setVideoMetadata] = useState({});

    const [showUploadProgress, setShowUploadProgress] = useState(false);

    const { uploadVideo, uploadPercentage } = useUploadVideo();

    const handleSubmit = e => {
        e.preventDefault();
        if(!formIsValid) return;
        setShowUploadProgress(true);
        uploadVideo(file, videoMetaData);
    };
  
    useEffect(() => {

        setVideoMetadata({
            title: title,
            description: description,
            tags: tags,
            user: user,
            color: color
        });
        
        setFormIsValid(
            file && 
            titleIsValid && 
            descriptionIsValid && 
            tagsIsValid &&
            userIsValid &&
            color);

        setShowUploadLink(false); // Disable the upload link when UploadVideo is mounted
        return () => setShowUploadLink(true); // Re-enable the upload link when UploadVideo unmounts
    },[file, titleIsValid, descriptionIsValid, tagsIsValid, userIsValid, color, setShowUploadLink, title, description, tags, user ]);
    
    return (

        <div className="uploadVideo__root" >

            <form 
                className="uploadForm" 
                onSubmit={handleSubmit}
                encType="multipart/form-data" 
            >

                <div className="uploadForm__header">
                    <h1>Video Upload Form</h1>
                    <span>Please fill out all fields</span>
                </div>
                
                <FilePicker 
                    setFile={setFile} 
                    file={file} 
                />

                <TitleField
                    title={title}
                    setTitle={setTitle}
                    titleIsValid={titleIsValid}
                    setTitleIsValid={setTitleIsValid}
                />

                <DescriptionField
                    description={description}
                    setDescription={setDescription}
                    descriptionIsValid={descriptionIsValid}
                    setDescriptionIsValid={setDiscriptionIsValid}
                />

                <TagField
                    tags={tags}
                    setTags={setTags}
                    tagsIsValid={tagsIsValid}
                    setTagsIsValid={setTagsIsValid}
                />

                <UserField 
                    user={user}
                    setUser={setUser} 
                    userIsValid={userIsValid}
                    setUserIsValid={setUserIsValid}
                />

                <ColorPicker 
                    user={user} 
                    color={color}
                    setColor={setColor}
                />

                <div 
                    className="uploadForm__footer">
                    <button
                        type="submit"
                        className="btn btn_upload"
                        disabled={!formIsValid}
                    >
                        Upload
                    </button>
                </div>

            </form>

            {
                showUploadProgress && <ProgressDialog uploadPercentage={uploadPercentage} />        
            }
        </div>
    )
};

export default UploadVideo;