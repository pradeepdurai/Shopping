require("dotenv").config();


const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;

//Routes
const authRoutes = require("./Routes/auth");

//DB Connection
mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex :true                            
}).then(() =>{
    console.log("Db Connect");
})


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);

app.use("/", (req,res) => {
    res.send("<h1>Welcome</h1>");
});
app.listen(port, () =>{
    console.log(`Server is running...${port}`);
})
