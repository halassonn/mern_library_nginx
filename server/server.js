require("dotenv").config();
const express = require("express");
const app=express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/test",(req,res)=>{
    res.json({
        Hi:"welcome to junggle"
    })
});

// Make the sever listen on the declared PORT variable
const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);