const mongoose = require("mongoose")
const TicketSchema = new mongoose.Schema ({
    Name: {
        type: String,
        required: true
    },
    Project: {
        type: String,
        required: true  
    }, 
    Description: {
        type: String, 
        required: true 
    },
    Category: {
        type: String,
        required: true
    },
    Priority: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    }, 
    Submitted: {
        type: String,
        required: true
    }, 
    Date: {
        type: Date,
        default: Date.now
    }, 
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    }
})

module.exports = mongoose.model("Ticket", TicketSchema) 
