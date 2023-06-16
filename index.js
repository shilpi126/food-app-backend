const express = require("express")
const app = express();
// const mongoose = require("mongoose")
// const userModel = require("./models/userModel")
// const planModel=require("./models/planModel")
const cookieParser = require("cookie-parser")


//middleware func which convert data into json;
app.use(cookieParser())
app.use(express.json());
const PORT = 5000

app.listen(PORT);



const userRouter = require("./router/userRouter")
const authRouter = require("./router/authRouter")
const planRouter = require("./router/planRouter")
const reviewRouter= require("./router/reviewRouter")
const bookingRouter=require('./router/bookingRouter');

app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/review", reviewRouter);
app.use('/booking',bookingRouter);



































// //query
// app.get("/users", (req, res) => {
//     console.log(req.query);
//     res.send(users);
// })



//parameter

// app.get("/users/:id",(req,res)=>{
//     console.log(req.params.id);

//    res.send("user id is recieved");
// })



// app.get("/users/:usersName",(req,res)=>{
//     console.log(req.params.usersName);
//     console.log(req.params);

//     res.send("user name is recieved");
// })


