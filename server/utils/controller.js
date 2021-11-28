const Group = require("../models/Groups");
const StudentGroup = require("../models/StudentGroups");
const User = require("../models/User")
const Assignment = require("../models/Assignment")
const Submission = require("../models/Submission")
const mongoose = require('mongoose');

//Create a group 
const createGroup = async(req,res) =>{
    
    if (!req.body.groupCode) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }
    
    //Check for duplicate Group Code
    let groupCodeNotRegistered = await validateGroupCode(req.body.groupCode) 
    if(!groupCodeNotRegistered){
        return res.status(400).json({
            message : `Group Code should be unique.`,
            success : false
        })
    }

      // Create a Group
    const group = new Group({
        groupCode: req.body.groupCode,
        desc: req.body.desc,
        courseName: req.body.courseName,
        teacherName: req.body.teacherName,
        teacherEmail: req.body.teacherEmail
    });
    
      // Save Group in the database
      await group
        .save(group)
        .then(data => {
          return res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Group."
          });
        });
}

//Join a Group
const joinGroup = async(req,res) =>{
    
  // Check if Group Code is entered
  if (!req.body.groupCode) {
     return res.status(400).send({ message: "Group code cannot be empty!" });
  }


  // Authicate id the student is registered on the platform
  let studentRegistered = await validateStudent(req.body.studentEmail)
    if(!studentRegistered){
        return res.status(400).json({
            message : `Student is not registered on the Platform.`,
            success : false
        })
    }

  // Get and Authenticate the groupId from the groupCode recived
  var id,name;
  await Group.findOne({groupCode: req.body.groupCode},
    {_id : 1 , courseName: 1})
    .then( async data => {
      if( !(data == null)){
        id = data._id;
        name = data.courseName;

        await StudentGroup.find({groupCode: req.body.groupCode, studentEmail : req.body.studentEmail})
        .then( async(data) =>{
          if( data.length)
            return res.status(403).send({
              message : `Student already registered in the Group`,
              success: false
            }) 
          
            else{
              await StudentGroup.create({
                groupCode : req.body.groupCode,
                studentName : req.body.studentName,
                studentEmail : req.body.studentEmail,
                groupId: id
              }).then( data =>{
                return res.status(200).send({
                  student : data,
                  message: `You are registered to the Course : ${name}`,
                  success:true
                })
              }).catch(err => {
                return res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Group."
                });
              })
            }
        }).catch(err =>{
          console.log(err)
          // res.status(500).send({
          //   message:
          //     err.message || "Some error occurred while joining the Group."
          // });
        })

      }
        
      else{
        return res.status(403).send({
          message: `Wrong Coupon Code`,
          success:false
        })
      }
    }).catch( err =>{
      console.log(err)
    }) 

}

// Get all the groups for the students
const getallStudentGroups = async(email,res) =>{


  await StudentGroup.find({studentEmail : email})
    .populate("groupId")
    .then(data => { 
      if( !data.length)
        return res.status(403).json({
            message: `No groups to show`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

// Get all the groups for techer
const getAllGroups = async(email,res) =>{

  await Group.find({teacherEmail : email})
    .then(data => {
      if( !data.length)
        return res.status(403).json({
            message: `No groups to show`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

// Delete a group from teacher side
const removeGroup = async(req, res) => {
  const id = mongoose.Types.ObjectId(req.body._id);

  await Group.findByIdAndRemove(id)
    .then(async data => {
      if (!data) {
        return res.status(403).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {

        await StudentGroup
          .deleteMany({'groupId' : id})
          .then(data => {
            return res.send({
              message: ` ${data.deletedCount} Tutorials were deleted successfully!`,
              success: true
            });
          })
          .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });

      }
    })
    .catch(err => {
       return res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Leave a group from studentS
const leaveGroup = async(req,res) => {
  await StudentGroup
          .deleteMany({'groupCode' : req.body.groupCode, 'studentEmail' : req.body.studentEmail})
          .then(data => {
            return res.send({
              message: ` ${data.deletedCount} Tutorials were deleted successfully!`,
              success: true
            });
          })
          .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });
};

// Create an Assignment
const CreateAssigment = async(req,res) =>{
    
  if (!req.body.question) {
      return res.status(400).send({ message: "Content can not be empty!" });
  }

  
  const assignment = new Assignment({
      groupId: req.body.groupId,
      question: req.body.question,
      topic : req.body.topic,
      comments : req.body.comments,
      maxMarks: req.body.maxMarks,
      teacherName: req.body.teacherName,
      teacherEmail: req.body.teacherEmail
  });
  
    // Save Assignment in the database
    await assignment
      .save(assignment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Group."
        });
      });

}

//Get all the Assignment in a Particular Group
const getAllAssignments = async(req,res) =>{

  await Assignment.find({groupId: req.query.id})    
    .sort({updatedAt:-1})
    .then(data => {
      if( !data.length)
        return res.status(403).json({
            message: `No Assignments to show`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

// Add a submission for the Assingment
const addSubmission = async(req,res) =>{
    
  if (!req.body.answer) {
      return res.status(400).send({ message: "Content can not be empty!" });
  }
  
  const submission = new Submission({
      groupId: req.body.groupId,
      answer: req.body.answer,
      studentName: req.body.studentName,
      studentEmail: req.body.studentEmail,
      markAsDone:req.body.markAsDone,
      assignmentId: mongoose.Types.ObjectId(req.body.assignmentId)
  });
  
    // Save Submission in the database
    await submission
      .save(submission)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Group."
        });
      });

}

//Get all Submissions - for teacher to view
const getAllSubmissions = async(req,res) =>{

  await Submission.find({assignmentId:req.params.id})
    // .populate("assignmentId")
    .sort({updatedAt:-1})
    .then(data => {
      if( !data.length)
        return res.status(403).json({
            message: `No Submission yet`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

//Update the marks of student -- accessible to teacher
const updateMarks = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Submission.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Submission with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Submission was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

//Get all Students of a particular group
const getAllStudents = async(req,res) =>{

  await StudentGroup.find({groupId: req.params.id})    
    .sort({updatedAt:-1})
    .then(data => {
      if( !data.length)
        return res.status(403).json({
            message: `No Students in the group`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

// delete an Assignment -- done by a teacher
const deleteAssignment = async(req, res) => {
  const id = mongoose.Types.ObjectId(req.body._id);

  await Assignment.findByIdAndRemove(id)
    .then(async data => {
      if (!data) {
        return res.status(403).send({
          message: `Cannot delete Assignment with id=${id}. Maybe it was not found!`,
        });
      } else {

        await Submission
          .deleteMany({'assignmentId' : id})
          .then(data => {
            return res.send({
              message: ` ${data.deletedCount} Tutorials were deleted successfully!`,
              success: true
            });
          })
          .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });

      }
    })
    .catch(err => {
       res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Mark an Assignemnt as completely graded or ungraded- for teacher to keep track
const toggleGraded = async( req,res) =>{
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Assignment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Assignment with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Submission was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
}

// Get all the counts
const counts = async(req,res) => {
  const id = req.params.id;

  const assignments = await Assignment.countDocuments({groupId: id})
  const students = await StudentGroup.countDocuments({groupId: id})
    res.status(200).send({assignments,students})
  
  
}

//Get Submission details
const getSubDeets = async(req,res) =>{

  await Submission.find({studentEmail: req.body.email, assignmentId: req.body.id})    
    .sort({updatedAt:-1})
    .then(data => {
      if( !data.length)
        return res.status(403).json({
            message: `No Submissions to show`,
            success: false
        })
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while displaying the Groups."
      });
    });
}

// Get the student profile details
const studentProfileDeets = async(req,res) => {
  const email = req.params.email;
  const groups = await StudentGroup.countDocuments({studentEmail: email})
  const submissions = await Submission.countDocuments({studentEmail: email})
  res.status(200).send({groups,submissions})  
}

// Get the teacher profile details
const teacherProfileDeets = async(req,res) => {
  const email = req.params.email;
  const groups = await Group.countDocuments({teacherEmail: email})
  const assignments = await Assignment.countDocuments({teacherEmail: email})
  res.status(200).send({groups,assignments})  
}


const validateGroupCode = async groupCode => {
    let group = await Group.findOne({groupCode});
    return group ? false :true;
}

const validateStudent = async studentEmail => {
  let user = await User.findOne({email : studentEmail , role : 'Student'});
  return user ? true :false;
};

module.exports = {createGroup, 
  getAllGroups, 
  joinGroup, 
  getallStudentGroups, 
  removeGroup,
  leaveGroup, 
  CreateAssigment, 
  getAllAssignments,
  addSubmission,
  getAllSubmissions,
  updateMarks,
  getAllStudents,
  deleteAssignment,
  toggleGraded,
  counts,
  getSubDeets,
  teacherProfileDeets,
  studentProfileDeets
}