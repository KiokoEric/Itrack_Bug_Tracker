const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const ArchiveRoute = express.Router();
const Ticket = require("../Models/Tickets");
const cookieParser = require("cookie-parser"); 
const Archive = require("../Models/ArchivedTickets");


const myPassword = process.env.Password

ArchiveRoute.use(cookieParser())
dotenv.config();

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

ArchiveRoute.post("/AddArchive", verifyToken ,async (req, res) => { 
    const Archives = new Archive(req.body)

    try {
        const SavedArchives = await Archives.save() 
        res.send(SavedArchives)
    } catch (error) {
        console.error(error)
    }
})

ArchiveRoute.get("/Archives", async (req, res) => { 
    try{
        const Archives = await Archive.find() 
        res.json(Archives)
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchiveRoute.get("/ArchivesLength", async (req, res) => { 
    try{
        const Archives = await Archive.find()  
        const ArrayLength = Archives.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

ArchiveRoute.get('/:id', async (req, res) => {
    try {
    const Tickets = await Archive.findById(req.params.id);
    if (!Tickets) {
        return res.status(404).json({ message: 'Tickets not found' });
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});


ArchiveRoute.delete("/:id", async (req, res) => {
    try{
        const Tickets = await Archive.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

ArchiveRoute.post('/moveTicket/:TicketId', async (req, res) => { 
    const { TicketId } = req.params;
    
    try {
        // Find the ticket in the source model
        const Archives = await Archive.findById(ticketId);
    
        // Create a new ticket in the destination model
        const Tickets = new Ticket({
            Name: Archives.Name,
            Projects: Archives.Projects,
            Description: Archives.Description, 
            Category: Archives.Category,
            Priority: Archives.Priority,
            Status: Archives.Status,
            Submitted: Archives.Submitted,
            Date: Archives.Date,
            userOwner: Archives.userOwner 
        });
    
        // Save the new ticket in the destination model
        await Tickets.save();
    
        // Remove the ticket from the source model
        await Archive.findByIdAndDelete(TicketId);
    
        res.json({ success: true, message: 'Ticket moved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error moving ticket' });
    }
    });

module.exports = ArchiveRoute;