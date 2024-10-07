const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const Project = require("../Models/Projects");
const ArchivedProjectRoute = express.Router();
const cookieParser = require("cookie-parser"); 
const Archive = require("../Models/ArchivedProjects");

const myPassword = process.env.Password

dotenv.config();
ArchivedProjectRoute.use(cookieParser())

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

// ADDING A PROJECT TO ARCHIVES

ArchivedProjectRoute.post("/AddArchive", verifyToken ,async (req, res) => { 
    const Archives = new Archive(req.body)

    try {
        const SavedArchives = await Archives.save() 
        res.send(SavedArchives)
    } catch (error) {
        console.error(error)
    }
})

// GETTING ALL THE ARCHIVED PROJECTS

ArchivedProjectRoute.get("/Archives", async (req, res) => { 
    try{
        const Archives = await Archive.find() 
        res.json(Archives)
    }
    catch(err) { 
        res.send(err)  
    }
})

// FETCHING THE TOTAL NUMBER OF ARCHIVED PROJECTS

ArchivedProjectRoute.get("/ArchivesLength", async (req, res) => { 
    try{
        const Archives = await Archive.find()  
        const ArrayLength = Archives.length;
        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

// GETTING ARCHIVED PROJECT DETAILS BY ITS ID

ArchivedProjectRoute.get('/:id', async (req, res) => {
    try {
    const Projects = await Archive.findById(req.params.id);
    if (!Projects) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(Projects);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

// DELETING AN ARCHIVED TICKET BASED ON THE TICKET ID

ArchivedProjectRoute.delete("/:id", async (req, res) => {
    try{
        const Tickets = await Archive.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// RESTORING AN ARCHIVED PROJECT

ArchivedProjectRoute.post('/moveProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    
    try {
        // Find the project in the source model
        const Archives = await Archive.findById(projectId);
    
        // Create a new project in the destination model
        const Projects = new Project({
            Name: Archives.Name,
            Description: Archives.Description,
            StartDate: Archives.StartDate,
            EndDate: Archives.EndDate,
            Priority: Archives.Priority,
            Manager: Archives.Manager,
            Assigned: Archives.Assigned,
            Image: Archives.Image,
            Date: Archives.Date,
            userOwner: Archives.userOwner
        });
    
        // Save the new project in the destination model
        await Projects.save();
    
        // Remove the project from the source model
        await Archive.findByIdAndDelete(projectId);
    
        res.json({ success: true, message: 'Project moved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error moving project.' });
    }
    });

module.exports = ArchivedProjectRoute;
