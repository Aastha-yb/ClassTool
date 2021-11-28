const express = require("express")
const router = express.Router()
const {createGroup,
    getAllGroups,
    removeGroup, 
    CreateAssigment, 
    getAllAssignments,
    getAllSubmissions,
    updateMarks,
    getAllStudents,
    deleteAssignment,
    toggleGraded,
    counts,
    teacherProfileDeets}= require("../Utils/controller")
    


router.get( '/Group', (req,res) => {
    res.send("Get the list of groups ")
})

//Add groups
router.post('/addGroup', async(req,res) => {
    createGroup(req,res)
})

//Get the list of groups
router.get('/:id', async(req,res) => {
    getAllGroups(req.params.id,res);
})


//Delete a particular group.
router.post('/deleteGroup', async(req,res) => {
    removeGroup(req,res);
})

// Create an Assignment
router.post('/addAssignment', async(req,res) =>{
    CreateAssigment(req,res);
})

//Get all Assignments
router.get('/getAssignments/query', async(req,res) =>{   
    getAllAssignments(req,res);
})

//Get all Submissions
router.get('/getSubmissions/:id', async(req,res) => {
    getAllSubmissions(req,res);
})

//Update Marks
router.post('/updateMarks/:id', async(req,res) =>{
    console.log("here")
    updateMarks(req,res);
})

//Get the list of students of a particular group
router.get('/getStudents/:id', async(req,res) =>{   
    getAllStudents(req,res);
})

//Delete a particular Assignment
router.post('/deleteAssignment/', async(req,res) =>{   
    deleteAssignment(req,res);
})

//Mark Assignment as graded or ungraded
router.post('/toggleGraded/:id',async(req,res)   =>{
    toggleGraded(req,res);
})

//Get the counts
router.get('/counts/:id', async(req,res) =>{
    counts(req,res);
})

//Get Profile counts
router.get('/teacherDeets/:email', async(req,res) => {
    teacherProfileDeets(req,res);
})

module.exports = router