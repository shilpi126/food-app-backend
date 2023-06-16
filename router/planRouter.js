const express = require("express");
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require("../controllers/authController");
const {getAllPlan,getPlan,updatePlan,deletePlan,top3Plans,createPlan}= require("../controllers/planController")

//all plans leke aayega
planRouter
.route("/allPlans")
.get(getAllPlan)


planRouter
.route("/toprated")
.get(top3Plans)

//own plan => logged in neccerary
planRouter.use(protectRoute);
planRouter
.route("/plan/:id")
.get(getPlan)



// admin nd restaurant owner can only create,update or delte plans 
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan);


planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)





module.exports=planRouter

