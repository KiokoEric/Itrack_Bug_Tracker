const cors = require("cors");
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express(); 

dotenv.config();

// MIDDLEWARE

app.use(cors({
    origin: ["https://itrack-sigma.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
})) 
app.use(express.json())
app.use(cookieParser()) 

// MONGODB CONNECTION    

const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl)
.then(() => console.log("Connected to the database!"))

    // IMPORT ROUTES

    const UserRoute = require("./Routes/User_Route.js");
    const TicketRoute = require("./Routes/Ticket_Route.js"); 
    const ProjectRoute = require("./Routes/Project_Route.js");
    const CommentRoute = require("./Routes/Comment_Route.js");  
    const ArchivedTicketRoute = require("./Routes/Archived_Ticket_Route.js");
    const ArchivedProjectRoute = require("./Routes/Archived_Projects_Route.js"); 
    
    app.use("/Users", UserRoute);
    app.use("/Ticket", TicketRoute); 
    app.use("/Projects", ProjectRoute);
    app.use("/Comments", CommentRoute); 
    app.use("/TicketArchives", ArchivedTicketRoute);
    app.use("/ProjectArchives", ArchivedProjectRoute);   

app.listen(4000)      
