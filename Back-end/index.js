const express = require("express"); 
const connectToMongo = require('./ConnectToMongo');
connectToMongo();

const app = express();
const port = 8000;

// use cors to access shared resources
const cors = require('cors')
app.use(cors())

app.use(express.json());

// Create routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"))

app.get("/", (req, res)=>{
    res.send(req.ip);
})



app.listen(port, ()=> console.log(`App is running on : ${port}`))