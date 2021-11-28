const mongoose = require("mongoose")
const Group = require("./Groups")

const StudentGroupsSchema = mongoose.Schema({
    groupCode: {
        type: String, 
        required : true,
        unique: false
    },
    studentName: { 
        type: String, 
        required : true
    },
    studentEmail: { 
        type: String, 
        required : true
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref : Group,
        required : true
    }
},{ timestamps: true });


const StudentGroup = mongoose.model('StudentGroups', StudentGroupsSchema)

module.exports= StudentGroup;