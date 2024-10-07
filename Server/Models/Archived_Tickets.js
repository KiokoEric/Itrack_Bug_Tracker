const mongoose = require("mongoose")
const ArchiveTicketSchema = new mongoose.Schema ({ 
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
    ID: {
        type:String,
        required: true
    }, 
    Date: {
        type: String,
        default: Date.now 
    }, 
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true  
    }
})

module.exports = mongoose.model("ArchivedTickets", ArchiveTicketSchema)  
