const mongoose = require('mongoose');
const fs = require("fs");
const Joi = require('joi');

const videoSchema = new mongoose.Schema({
    v_id: {
        type: String,
        minlegth: 8
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 255,
        required: true
    },
    tags: {
        type: Array,
        required: true,
        minlength: 1,
        getMaxListeners: 10
    },
    duration: {
        type: Number
    },
    filePath: {
        type: String
    },
    fileName: {
        type: String,
        required: true,
        minlength: 5
    },
    thumbName: {
        type: String,
        required: true,
        default: "thumb.jpg"
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    color: {
        type: String,
        required: true,
        default: "#ff0000"
    },
    likes: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

videoSchema.pre('save', function(){

    // Use the first 8 chars from _id as a more manageable id for URL slug, DIR name etc
    const v_id = `${this._id.toString().substring(0,8)}`;
    this.v_id = v_id;

    // Use the mongoDB _id to create a file in which to store the incoming video file and thumbnail
    const filePath = `/home/kt/Projects/portfolio/vidstream/storage/${this._id.toString().substring(0,8)}`;
    fs.mkdir(filePath, (err) => {
        if (err) return process.stdout.write(err);
    });
    
    this.filePath = filePath;
});

const Video = mongoose.model('Video', videoSchema);

const validateVideo = (video) => {

    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        description: Joi.string().min(20).max(255).required(),
        tags: Joi.array().items(Joi.string()),
        fileName: Joi.string().min(5).required(),
        duration: Joi.number().required(),
        user: Joi.string().min(5).max(50).required(),
        color: Joi.string().required()
      });
    
      return schema.validateAsync(video);
};

module.exports = {
    Video,
    validateVideo
};
