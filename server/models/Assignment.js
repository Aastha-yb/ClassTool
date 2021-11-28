const mongoose = require("mongoose")
const Group = require("./Groups")

const assignmentsSchema = mongoose.Schema({
    teacherName: {
        type: String, 
        required : true,
    },
    teacherEmail: {
        type: String, 
        required : true,
    },
    question: {
        type: String, 
        required : true,
    },
    topic: {
        type: String, 
        required : true,
    },
    comments: {
        type: String
    },
    maxMarks: {
        type: Number, 
        required : true,
    },
    graded: {
        type: Boolean,
        default : false
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref : Group,
        required : true
    }
},{ timestamps: true });


const Assignment = mongoose.model('Assignment', assignmentsSchema)

module.exports= Assignment