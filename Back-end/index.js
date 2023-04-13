const express = require("express"); 
const connectToMongo = require('./ConnectToMongo');
connectToMongo();

const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"))

app.get("/", (req, res)=>{
    res.send(req.ip);
})

app.get("/users/:userId/book/:bookId", (req,res)=>{
    res.send(req.params)
});

app.listen(port, ()=> console.log(`App is running on : ${port}`))