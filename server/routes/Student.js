const express = require("express")
const router = express.Router()
const {leaveGroup, joinGroup, getallStudentGroups, 
    addSubmission, getAllAssignments,getAllStudents,
    getSubDeets, studentProfileDeets }= require("../Utils/controller")


//Join groups
router.post('/joinGroup', async(req,res) => {
    joinGroup(req,res)
})

// Get the list of all groups
router.get('/:id', async(req,res) => {
    getallStudentGroups(req.params.id,res);
})

// Leave a group
router.post('/leaveGroup', async(req,res) =>{
    leaveGroup(req,res);
})

// Add a Submission
router.post('/addSubmission', async(req,res) =>{
    addSubmission(req,res);
})


//Get all Assignments for a particular group
router.get('/getAssignments/query', async(req,res) =>{   
    getAllAssignments(req,res);
})

// Get the list of all students of particular group
router.get('/getStudents/:id', async(req,res) =>{   
    getAllStudents(req,res);
})


//Get Submission Details
router.post('/getSubmissionDeets', async(req,res) =>{   
    getSubDeets(req,res);
})

//Get Profile counts
router.get('/studentDeets/:email', async(req,res) => {
    studentProfileDeets(req,res);
})

module.exports = router