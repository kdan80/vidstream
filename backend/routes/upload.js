const express = require("express");
const fs = require("fs");
const {exec} = require("child_process");
const path = require("path");
const multer = require("multer");
const {Video, validateVideo} = require("../models/video");
const { getVideoDurationInSeconds } = require('get-video-duration')

const router = express.Router();

const temp_storage = process.env.VIDAPP_STORAGE_TEMP;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    
        cb(null, temp_storage);
    },
    filename: (req, file, cb) => {
        
        // Remove the file extension from the file name (it will be transcoded and a new file extension added later)
        //originalname = path.parse(file.originalname).name;
        cb(null, file.originalname);
        
        // If the user stops the upload we need to remove the partially uploaded file
        req.on("aborted", () => {
            fs.unlink(`${temp_storage}/${file.originalname}`, () => process.stdout.write("file removed\n"));  
        });
    }
});

const upload = multer({storage: storage});

// API endpoint for uploading a video and its associated metadata
router.post("/", upload.single("file"), async(req,res) => {
    try {

        // Destructure the incoming request and get the duration of the video. These values will be used to create a video model in mongodb
        const {title, description, user, color} = req.body;
        let {tags} = req.body;
        const duration = await getVideoDurationInSeconds(req.file.path);
        console.log(`tags: ${tags}: type: ${typeof(tags)}`);

        // The req is sent as multipart formdata and as such can only take strings or blobs
        // If multiple tags are sent in req.body they exist as strings but will be destructured 
        // as an array. If however only one tag is sent it is destructured as a string so we 
        // use this code block to push it to an array
        if(typeof(tags) === "string"){
            newTags = [];
            newTags.push(tags);
            tags = newTags;
        }
        
        // Validate the http request against the video schema
        const candidateVideo = await validateVideo({
            title: title,
            description: description,
            tags: tags,
            fileName: req.file.originalname,
            duration: duration,
            user: user,
            color: color
        });

        // If the http request is valid create a new video model and save it to the db
        let video = new Video(candidateVideo);
        video = await video.save();

        // Move the uploaded video file from temp storage to permanent storage
        const oldPath = req.file.path;
        const newPath = `${video.filePath}/${video.fileName}`;
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
        });
        
        // Use ffmpeg to extract the first frame to use as a thumbnail - (newPath may have spaces in it so we should wrap it in double-quotes)
        const get_thumb = `ffmpeg -i "${video.filePath}/${video.fileName}" -vframes 1 -s 1280x720 ${video.filePath}/thumb.jpg`;
        exec(get_thumb,
            (err, stdout, stderr) => {
                if (err) process.stdout.write(err);
                if (stderr) process.stdout.write(stderr);
        });

        // Return the saved video model to the user as a json object
        res.send(video);
    }
    catch (err){
        // If validation fails send the error message to the client
        res.status(400).send(err.message);
    }
});

module.exports = router;