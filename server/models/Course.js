import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: { type: Number, required: true }, // Changed from String to Number
    lectureUrl: { type: String, required: true },
    isPreviewFree: { type: Boolean, required: true }, // Changed from String to Boolean and renamed
    lectureOrder: { type: Number, required: true }, // Changed from String to Number
}, { _id: false });

const chapterSchema = new mongoose.Schema({
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    chapterTitle: { type: String, required: true },
    chapterContent: [lectureSchema],
}, { _id: false });

const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String, required: true }, // Changed from Number to String
    coursePrice: { type: Number, required: true },
    isPublished: { type: Boolean, default: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    courseContent: [chapterSchema],
    courseRatings: [{
        userId: { type: String },
        rating: { type: Number, min: 1, max: 5 }, // Changed min from 0 to 1
        review: { type: String }, // Added review field
        createdAt: { type: Date, default: Date.now } // Added timestamp for rating
    }],
    educator: { type: String, ref: 'User', required: true },
    enrolledStudents: [{ type: String }] // Changed to array of student IDs
}, { 
    timestamps: true,
    minimize: false 
});

const Course = mongoose.model('Course', courseSchema);

export default Course;