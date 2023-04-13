const express = require("express"); 
const connectToMongo = require('./ConnectToMongo');
connectToMongo();

const app = express();
const port = 8000;

app.get("/", (req, res)=>{
    res.send("Hello world !");
})

app.listen(port, ()=> console.log(`App is running on : ${port}`))