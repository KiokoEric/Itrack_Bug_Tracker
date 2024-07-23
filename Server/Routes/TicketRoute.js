const dotenv = require('dotenv');
const express = require('express');
const jwt = require("jsonwebtoken");
const TicketRoute = express.Router(); 
const Ticket = require("../Models/Tickets");
const cookieParser = require("cookie-parser");
const Archive = require("../Models/ArchivedTickets");

const myPassword = process.env.Password

TicketRoute.use(cookieParser())
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

TicketRoute.post("/AddTicket", verifyToken ,async (req, res) => {
    const Tickets = new Ticket(req.body)

    try {
        const SavedTickets = await Tickets.save() 
        res.send(SavedTickets)
    } catch (error) {
        console.error(error)
    }
})

TicketRoute.get("/Tickets", async (req, res) => { 
    try{
        const AllTickets = await Ticket.find() 
        res.json(AllTickets)
    }
    catch(err) { 
        res.send(err)  
    }
})

TicketRoute.get("/TicketsLength", async (req, res) => { 
    try{
        const AllTickets = await Ticket.find()  
        const ArrayLength = AllTickets.length;

        res.json({ ArrayLength });
    }
    catch(err) { 
        res.send(err)  
    }
})

TicketRoute.get('/:userId/Tickets', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Tickets = await Ticket.find({ userOwner: userId });
        res.json(Tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tickets.' });
    }
}); 

// UPDATE

TicketRoute.put("/:id", async (req, res) => {
    try{
        const Tickets= await Ticket.findByIdAndUpdate(req.params.id, req.body)
        res.json(Tickets)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETE

TicketRoute.delete("/:id", async (req, res) => {
    try{
        const Tickets = await Ticket.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

// Ticket BY ID

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

// PROJECT RELATED Ticket

TicketRoute.get(`/Projects/:Projects`, async (req, res) => {
    const Projects = req.params.Projects

    try {
    const Tickets = await Ticket.find({ Projects: Projects }) 

    if (!Tickets) {
        return res.status(404).json({ message: 'Ticket not found' }) 
    }
    res.json(Tickets);
    } catch (error) {
    res.status(500).json({ message: 'Why!!!' })
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

TicketRoute.post('/moveTicket/:TicketId', async (req, res) => {
const { TicketId } = req.params;

try {
    // Find the ticket in the source model
    const Tickets = await Ticket.findById(TicketId); 

    // Create a new ticket in the destination model
    const Archives = new Archive({
        Name: Tickets.Name,
        Projects: Tickets.Projects,
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