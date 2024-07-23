const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

dotenv.config();

// Middleware

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser()) 

// MongoDB Connection    

const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl)
.then(() => console.log("Connected to the database!"))

    // import Routes

    const UserRoute = require("./Routes/UserRoute");
    const TicketRoute = require("./Routes/TicketRoute"); 
    const ProjectRoute = require("./Routes/ProjectRoute");
    const CommentRoute = require("./Routes/CommentRoute");  
    const ArchiveRoute = require("./Routes/ArchivedTicketsRoute");
    const ArchivedProjectRoute = require("./Routes/ArchivedProjectsRoute");

    
    app.use("/Users", UserRoute);
    app.use("/Tickets", TicketRoute); 
    app.use("/Projects", ProjectRoute);
    app.use("/Comments", CommentRoute); 
    app.use("/TicketArchives", ArchiveRoute);
    app.use("/ProjectArchives", ArchivedProjectRoute); 

app.listen(4000)      