const express = require("express");
const path = require("path");
const {Video} = require("../models/video");

const router = express.Router();

// Get all videos
router.get("/", async(req, res) => {
    try {
        const videos = await Video.find();
        res.send(videos);
    }catch(err){
        res.status(404).send(err.message);
    }
});

// Get a specific video
router.get("/:v_id", async(req, res) => {
    try {
        
        // Find video by v_id
        const filter = { v_id: req.params.v_id};

        // Apply filter and return video
        const video = await Video.findOne(filter);

        // If the video does not exist throw an error
        if(!video) throw new Error("Video not found");
    
        // Return the video to the client
        res.send(video);

    } catch(err){
        res.status(404).send(err.message);
    } 
});

// API endpoint for video thumbnails
router.get("/:v_id/thumb", async(req,res) => {
    try {
        const storage = process.env.VIDAPP_STORAGE;
    res.sendFile(`${storage}/${req.params.v_id}/thumb.jpg`);
    } catch(err){
        res.status(400).send(err.message);
    }
});

// API endpoint for incrementing/decrementing video view count
router.patch("/:v_id/views", async(req, res) => {
    try {
        // Find video by v_id
        const filter = { v_id: req.params.v_id};

        // Increment video.views by 1
        const update = {$inc: {views: 1}};

        // Return the updated video
        const options = {new: true};

        // Apply the filter and update, and return the updated video
        const video = await Video.findOneAndUpdate(filter, update, options);
            
        // Mongoose returns null if the Video was not found so we need to generate an error
        if(!video) throw new Error("Video not found");

        // Send the updated video to the client
        res.send(video);
    } catch(err){
        res.status(404).send(err.message);
    }
});

module.exports = router;