const mongoose = require("mongoose")

const groupsSchema = mongoose.Schema({
    groupCode: {
        type: String, 
        required : true,
        unique : true
    },
    desc : {
        type: String, 
    },
    courseName: { 
        type: String, 
        required : true
    },
    teacherName: { 
        type: String, 
        required : true
    },
    teacherEmail: { 
        type: String, 
        required : true
    }
},{ timestamps: true });


const Group = mongoose.model('Groups', groupsSchema)

module.exports= Group