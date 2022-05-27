import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/css/main.css";

const ProgressDialog = ({uploadPercentage}) => {

    const navigate = useNavigate()

    // After the upload is complete, wait 2 seconds before navigating to the home page
    useEffect(() => {
        if (uploadPercentage === 100) {
            window.setTimeout(() => navigate("/"), 2000);
        }
    }, [uploadPercentage, navigate]);

    return (
        <div className="progressDialog__root">
            <div className="progressDialog">
                <div>
                    {(uploadPercentage === 100)
                        ? "Upload complete, redirecting to homepage..."
                        : `Upload ${uploadPercentage}% complete`
                    }
                </div>

                <div className="progressBar">
                    <div className="progressBar__progress" style={{width: `${uploadPercentage}%`}} />
                </div>
            </div>
        </div>
    )
};

export default ProgressDialog;