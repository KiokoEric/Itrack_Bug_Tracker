const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const TicketRoute = express.Router(); 
const Ticket = require("../Models/Tickets");
const cookieParser = require("cookie-parser");
const Archive = require("../Models/Archived_Tickets");

const myPassword = process.env.Password

dotenv.config();
TicketRoute.use(cookieParser())

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

// ADDING A TICKET

TicketRoute.post("/AddTicket", verifyToken ,async (req, res) => {
    const Tickets = new Ticket(req.body)

    try {
        const SavedTickets = await Tickets.save() 
        res.send(SavedTickets)
    } catch (error) {
        console.error(error)
    }
})

// GETTING ALL THE TICKETS CREATED BY ALL ITRACK USERS

TicketRoute.get("/Tickets", async (req, res) => { 
    try{
        const Tickets = await Ticket.find() 
        res.json(Tickets)
    }
    catch(err) { 
        res.send(err)  
    }
})

// FETCHING THE TOTAL NUMBER OF ITRACK TICKETS

TicketRoute.get("/TicketsTotal", async (req, res) => { 
    try{
        const Tickets = await Ticket.find()  
        const ArrayLength = Tickets.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

// GETTING ALL THE TICKETS CREATED BY A SINGLE USER BY THEIR USER ID

TicketRoute.get('/:userId/Tickets', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Tickets = await Ticket.find({ userOwner: userId });
        res.json(Tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tickets.' });
    }
}); 

// UPDATING A TICKET BASED ON THE TICKET ID

TicketRoute.put("/:id", async (req, res) => {
    try{
        const Tickets= await Ticket.findByIdAndUpdate(req.params.id, req.body)
        res.json(Tickets)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETING A TICKET BASED ON THE TICKET ID

TicketRoute.delete("/:id", async (req, res) => {
    try{
        const Tickets = await Ticket.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// GETTING TICKET DETAILS BY ITS ID

TicketRoute.get('/:id', async (req, res) => {
    try {
    const Tickets = await Ticket.findById(req.params.id);
    if (!Tickets) {
        return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// PROJECT RELATED TICKET

TicketRoute.get(`/Projects/:Project`, async (req, res) => {
    const Projects = req.params.Project

    try {
    const Tickets = await Ticket.find({ Project: Projects }) 

    if (!Tickets) {
        return res.status(404).json({ message: 'No Tickets Found' }) 
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' })
    }
});


// TICKET BY PRIORITY

TicketRoute.get('/Priority/:Priority', async (req, res) => {
    const Priority = req.params.Priority

    try {
    const Tickets = await Ticket.find({ Priority: Priority });
    if (!Tickets) {
        return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
}); 

// FETCHING THE TOTAL NUMBER OF PRIORITY TICKETS ON ITRACK

TicketRoute.get('/PriorityLength/:Priority', async (req, res) => {
    const Priority = req.params.Priority

    try {
        const Tickets = await Ticket.find({ Priority: Priority })
        const ArrayLength = Tickets.length;

        res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// TICKET BY STATUS

TicketRoute.get('/Status/:Status', async (req, res) => {
    const Status = req.params.Status

    try {
    const Tickets = await Ticket.find({ Status: Status });
    if (!Tickets) {
        return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// FETCHING THE TOTAL NUMBER OF STATUS TICKETS ON ITRACK

TicketRoute.get('/StatusLength/:Status', async (req, res) => {
    const Status = req.params.Status

    try {
        const Tickets = await Ticket.find({ Status: Status })
        const ArrayLength = Tickets.length;

        res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// TICKET BY TYPE

TicketRoute.get('/Category/:Category', async (req, res) => {
    const Category = req.params.Category

    try {
    const Tickets = await Ticket.find({ Category: Category });
    if (!Tickets) {
        return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// FETCHING THE TOTAL NUMBER OF CATEGORY TICKETS ON ITRACK

TicketRoute.get('/CategoryLength/:Category', async (req, res) => {
    const Category = req.params.Category

    try {
    const Tickets = await Ticket.find({ Category: Category }) 
    const ArrayLength = Tickets.length;

    res.json({ ArrayLength });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
    }
});

// ARCHIVING OF A TICKET

TicketRoute.post('/moveTicket/:TicketId', async (req, res) => {
const { TicketId } = req.params;

try {
    // Find the ticket in the source model
    const Tickets = await Ticket.findById(TicketId); 

    // Create a new ticket in the destination model
    const Archives = new Archive({
        Name: Tickets.Name,
        Project: Tickets.Project,
        Description: Tickets.Description, 
        Category: Tickets.Category,
        Priority: Tickets.Priority,
        Status: Tickets.Status,
        Submitted: Tickets.Submitted,
        Date: Tickets.Date,
        ID: Tickets._id,
        userOwner: Tickets.userOwner 
    });

    // Save the new ticket in the destination model
    await Archives.save();

    // Remove the ticket from the source model
    await Ticket.findByIdAndDelete(TicketId);

    res.json({ success: true, message: 'Ticket moved successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error moving ticket' });
}
});

module.exports = TicketRoute
