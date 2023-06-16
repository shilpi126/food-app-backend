const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../secrets")
const { sendMail } = require("../utils/nodemailer");

//signup user
module.exports.signup = async function signup(req,res){
try{
    let dataObj= req.body;
    let user = await userModel.create(dataObj)
    sendMail("signup",user);
    if(user){
        
        console.log("backend",user);
        res.json({
            message:"user sign up",
            data:user
        })
    }else{
        res.json({
            message:"error while signup"
        })
    }
}catch(err){
    res.json({
        message:err.message
    })
}
}

//login user

module.exports.login=async function loginUser (req,res) {
    try{
    let data = req.body;
    if(data.email){
        let user = await userModel.findOne({email:data.email});


    if(user){
        //bcrypt => compare later
        if(user.password == data.password){
            const uid=user['_id']; //uid
            let token = jwt.sign({payload:uid},JWT_KEY )
            res.cookie("login",token,{httpOnly:true})
            return res.json({
                message:"User has logged in",
                userDetails:user
            })
        }else{
            return res.json({
                message:"wrong credential"
            })
        }
    }else{
        return res.json({
            message:"User not found"
        })
    }


    }else{
        return res.json({
            message:"empty field found"
        })
    }
    }catch(e){
    return res.json({
        message:e.message
    })
   }


}


//isAuthorise => to check the user's role
module.exports.isAuthorised=function isAuthorised(roles){
    return function (req,res,next){
        if(roles.includes(req.role)==true){
            next()
        }else{
            res.status(401).json({
                message:"user not allowed"
            })
        }
    }
}


//protect route
module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        let token;
    if(req.cookies.login){
        token = req.cookies.login;
        let payload = jwt.verify(token,JWT_KEY);
        if(payload){
            const user = await userModel.findById(payload.payload)
            req.role=user.role;
            req.id=user.id;
            next()
        }else{
            return res.json({
                message:"please login again"
            })
        }
        
    }else{
        //browser
        const client = req.get("User-Agent");
        if(client.includes("Mozilla")==true){
            return res.redirect("/login")
        }else{
            res.json({
                message:"please login"
            })
    
        }
    }
    }catch{
        res.send({
            message:"operation not allowed"
        })
    }

}


//forget password
module.exports.forgetPassword=async function forgetPassword(req,res){
    let {email} = req.body;
    try{
        const user = await userModel.findOne({email:email})
        if(user){
            //createReasetToken is used to create a new token
            const resetToken = user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get("host")}/reserpassword/${resetToken}`;
            //send email to the user
            //nodemailer
            let obj={
                resetPasswordLink:resetPasswordLink,
                email:email
              }
              sendMail("resetpassword",obj);
              return res.json({
                mesage: "reset password link sent",
                data:resetPasswordLink
              });
            
        }else{
            return res.json({
                mesage: "please signup",
            });
        }
    }catch(err){
        res.status(500).json({
            mesage: err.message,
        });

    }
}


//resetPassword
module.exports.resetpassword=async function resetpassword(req,res){
    try{
        const token = req.params.token;
        let {password, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user){
            //resetPasswordHandler will update user's password in db
            user.resetPasswordHandler(password,conformPassword);
            await user.save();
            res.json({
                message:"password changed successfully, please login again"
            });


        }else{
            res.json({
                message:"user not found"
            })
        }
    }catch(err){
        res.json({
            message: err.message,
        });
    }

}


//logout
module.exports.logout=function logout(req,res){
    res.cookie("login"," ",{maxAge:1});
    res.json({
        message:"user logged out successfully"
    })
}




