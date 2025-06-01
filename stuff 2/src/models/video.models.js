import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String, //cloudinary url
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);