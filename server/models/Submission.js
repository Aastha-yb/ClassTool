const mongoose = require("mongoose")
const Group = require("./Groups")
const Assignment = require("./Assignment")


const submissionSchema = mongoose.Schema({
    studentName: {
        type: String, 
        required : true,
    },
    studentEmail: {
        type: String, 
        required : true,
    },
    assignmentId: {
        type: mongoose.Schema.ObjectId,
        ref : Assignment,
        required : true
    },
    answer: {
        type: String, 
        required : true,
    },
    marksObtained: {
        type: Number, 
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref : Group,
        required : true
    },
    markAsDone: {
        type: Boolean,
        required : true
    }
},{ timestamps: true });


const Submission = mongoose.model('Submission', submissionSchema)

module.exports= Submission