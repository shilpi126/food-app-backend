const express=require('express');

const bookingRouter=express.Router();
const {protectRoute}=require('../controllers/authController');
const {createSession}=require('../controllers/bookingController');

bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile("/FJP5_learn_MERN/BACKEND/backend/booking.html");
});

module.exports=bookingRouter;