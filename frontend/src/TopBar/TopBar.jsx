import React from "react";
import "../styles/css/main.css"
import { Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";

const TopBar = ({showUploadLink}) => {

    return (
        <div className="topbar__root">
            <Link to="/" className="banner">
                <span className="banner__vid">
                VID
                </span>
                <span className="banner__stream">
                Stream
                </span>
            </Link>

            {
                showUploadLink &&
                    <Link className="uploadBtn" to="/upload">
                        <MdCloudUpload className="uploadBtn__icon" />
                        Upload Video
                    </Link>
            }
            
        </div>
    )
};

export default TopBar;