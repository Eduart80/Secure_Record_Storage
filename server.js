require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('./db/connection')
const PORT = process.env.PORT


// Middleware
app.use(express.json())

// Register userRouter
const userRouter = require('./routes/userRouter')
app.use(userRouter)

// Register notesRouter
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);


app.listen( PORT, ()=>{console.log(`Server started on https://localhost:${PORT}`);
})