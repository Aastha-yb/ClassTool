
# [Microsoft Enage'21 Project](https://github.com/Aastha2891/ClassTool)

## ClassTool - An assignment submission tool

- **NodeJS** using Express framework with **MongoDB** as database and **ReactJS** frontend.

## Technology Stack

- Node.js
- MongoDB
- express routing
- ReactJS

> All the dependencies being used are listed in `package.json`.


## Installation

1. Clone the repository using `git clone` 
```bash
git clone https://github.com/Aastha2891/ClassTool.git
```

2. Use `npm` to install dependencies for the project

```bash
npm install
```

3. Make sure, **MongoDB** is running at your configured `DB` in `config/index` file. If not installed, then install from [here](https://docs.mongodb.com/manual/installation/)

- Locally start mongod as

```bash
sudo service mongod restart
```

 6. Run the program either by `npm` or `yarn` using

```bash
npm start
```
> `npm run dev` script is for starting with `concurrently and nodemon`.


The **console** logs the following if the app is running properly
```bash
Server started on port 3000!!!
```

## Project Folder Structure

> **Note**: The folder tree does not include sub-directories for common/generated folders. For example - `node_modules`.

 - Sub-directories of the folders marked with **' * '** are not shown for clarity.
 - Folders are typed in **bold**


## Features
### The app supports following features

-   Different Signup and Login for Teachers and Students, to prevent ghosting
-   Password encryption at database
-   Personalized Dashboard for Students and Teachers
-   Teachers can create/delete Groups and assignments, and Students can join/leave groups ans submit assignments.
-   Teachers Dashboard shows the groups created and their details, from for creating a group and teacher profile.
-   Teacher will create a group with unique group code which will be shared with students in order to join the created group.
-   Additionally, each group will shows the available assignments, student list, details of group and a form for creating assignments.
-   The Assignments will further show all the Submssions done by the student.
-   Teacher can access and mark all the submission recieved for an assignment. 
-   Student Dashboard shows the groups joined and their details, from for joining new groups and student profile.
-   Additionally, each group will shows the available assignments, student list and the details of group.
-   A student can make a submission for all the available assignments and view the marks obtained.
-   Submission is diabled after one valid submission.

## Database Structure

### Users
![User](https://github.com/Aastha2891/ClassTool/blob/master/screenshots/users.PNG)

### Groups
![Groups](https://github.com/Aastha2891/ClassTool/blob/master/screenshots/groups.PNG

### StudentGroups
![StudentGroups](https://github.com/Aastha2891/ClassTool/blob/master/screenshots/studentgroups.PNG)

### Assignments
![Assignments](https://github.com/Aastha2891/ClassTool/blob/master/screenshots/assignments.PNG

### Submissions
![Submissions](https://github.com/Aastha2891/ClassTool/blob/master/screenshots/submissions.PNG)
