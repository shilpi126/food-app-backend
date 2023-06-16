const express = require("express")
const userRouter = express.Router();
const {getUser, updateUser, deleteUser,getAllUser,updateProfileImage} = require("../controllers/userController")

const {login, signup, isAuthorised, protectRoute, forgetPassword, resetpassword,logout}=require("../controllers/authController")
const multer  = require('multer')

userRouter
.route("/signup")
.post(signup)


userRouter
.route("/login")
.post(login)





userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser)




// userRouter.route("/:id").get(getUser);


userRouter
.route("/forgetpassword")
.post(forgetPassword)


userRouter
.route("/resetpassword/:token")
.post(resetpassword)

userRouter
.route("/logout")
.get(logout)


//multer for fileupload

//upload => storage, filter
const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"/FJP5_learn_MERN/BACKEND/backend/public/images")
    },
    filename:function(req,file,cb){
        cb(null, `user-${Date.now()}.jpg`)
    }
})

const filter = function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }else{
        cb(new Error("Not an Image! Please upload an image"))
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter:filter
});

//post request
userRouter.post("/profileImage", upload.single("photo"),updateProfileImage)
//get request
userRouter.get("/profileImage",(req,res)=>{
    res.sendFile("/FJP5_learn_MERN/BACKEND/backend/multer.html")
})



//profile page
userRouter.use(protectRoute);
userRouter
.route("/userProfile")
.get(getUser)


// //admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter
.route("")
.get(getAllUser)






module.exports = userRouter


// 


