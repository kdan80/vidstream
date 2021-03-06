const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API endpoint for uploading a video file
const upload = require("./routes/upload");
app.use("/api/upload", upload);

// API endpoint for downloading all videos
const videos = require("./routes/videos");
app.use("/api/videos", videos);

// API endpoint for streaming a video
const watch = require("./routes/watch");
app.use("/api/watch", watch);

const mongoDB = process.env.VIDAPP_DB;
const port = process.env.VIDAPP_PORT || 4000;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        process.stdout.write("Connected to mongodb...\n");

        app.listen(port, () => process.stdout.write(`Listening on port ${port}...\n`));
    })
    .catch(err => process.stdout.write(err.message));
