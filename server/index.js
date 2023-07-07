const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    next();
})
app.use(express.json());


app.get("/", (req, res) => res.json({ message: "Hello World" }));
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));

app.listen(port, () => console.log(`Server running on port ${port}`));