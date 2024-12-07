const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const ProjectRoute = express.Router();
const cookieParser = require("cookie-parser"); 
const Project = require("../Models/Projects.js");
const Archive = require("../Models//Archived_Projects.js");

const myPassword = process.env.Password

dotenv.config();
ProjectRoute.use(cookieParser())

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

// ADDING A PROJECT

ProjectRoute.post("/AddProject", verifyToken ,async (req, res) => { 
    const Projects = new Project(req.body)

    try {
        const SavedProjects = await Projects.save() 
        res.send(SavedProjects)
    } catch (error) {
        console.error(error)
    }
})

// GETTING ALL THE PROJECTS CREATED BY ALL ITRACK USERS

ProjectRoute.get("/Projects", async (req, res) => { 
    try{
        const AllProjects = await Project.find() 
        res.send(AllProjects)
    }
    catch(err) { 
        res.send(err)  
    }
})

// FETCHING THE TOTAL NUMBER OF ITRACK PROJECTS

ProjectRoute.get("/ProjectsTotal", async (req, res) => { 
    try{
        const AllProjects = await Project.find() 
        const ArrayLength = AllProjects.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

// GETTING ALL THE PROJECTS CREATED BY A SINGLE USER BY THEIR USER ID

ProjectRoute.get('/:userId/Project', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Projects = await Project.find({ userOwner: userId });
        res.json(Projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project.' });
    }
});

// UPDATING A PROJECT BASED ON THE PROJECT ID

ProjectRoute.put("/:id", async (req, res) => {
    try{
        const Projects= await Project.findByIdAndUpdate(req.params.id, req.body)
        res.json(Projects)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETING A PROJECT BASED ON THE PROJECT ID

ProjectRoute.delete("/:id", async (req, res) => {
    try{
        const Projects = await Project.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// GETTING PROJECT DETAILS BY ITS ID

ProjectRoute.get('/:id', async (req, res) => {
    try {
    const Projects = await Project.findById(req.params.id);
    if (!Projects) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(Projects);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

// GETTING THE NAMES OF PROJECTS CREATED ON ITRACK

ProjectRoute.get(`/Name/:Name`, async (req, res) => {
    const Name = req.params.Name

    try { 
    const Projects = await Project.findOne({ Name: Name }) 

    if (!Projects) {
        return res.status(404).json({ message: 'Project not found' })
    } 
    res.json(Projects);
    } catch (error) { 
    res.status(500).json({ message: 'Server Error' })  
    }
});

// ARCHIVING OF A PROJECT

ProjectRoute.post('/moveProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    
    try {
        // Find the ticket in the source model
        const Projects = await Project.findById(projectId);
    
        // Create a new ticket in the destination model
        const Archives = new Archive({
            Name: Projects.Name,
            Description: Projects.Description,
            StartDate: Projects.StartDate, 
            EndDate: Projects.EndDate,
            Priority: Projects.Priority,
            Manager: Projects.Manager,
            Assigned: Projects.Assigned,
            Image: Projects.Image,
            Date: Projects.Date,
            userOwner: Projects.userOwner
        });
    
        // Save the new ticket in the destination model
        await Archives.save();
    
        // Remove the ticket from the source model
        await Project.findByIdAndDelete(projectId);
    
        res.json({ success: true, message: 'Project moved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error moving project.' });
    }
    });

module.exports = ProjectRoute   
