
const mongoose = require("mongoose")
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt")


const {db_link} = require("../secrets")
mongoose.connect(db_link)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    console.log(err.message)
})

//schema
const userSchema =new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
        
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
                validate:function(){
            return this.confirmPassword == this.password
        }
    },
    role:{
        type:String,
        enum:["admin","user","restaurantowner","deliveryboy"],
        default:"user"
    },
    profileImage:{
        type:String,
        default:"img/users/default.jpeg"

    }

});


//mongoose hooks pre and post
//read document pre post hooks
//explore remove

//before save event occurs in db
// userSchema.pre("save",function(){
//     console.log("before saving in db");
// })



// //after save event occurs in db
// userSchema.post("save",function(doc){
//     console.log("after saving in db",doc);
// })


userSchema.pre("save", function(){
    this.confirmPassword = undefined
});

// userSchema.pre("save",async function(){
//     let salt = await bcrypt.genSalt()
//     let hashString =await bcrypt.hash(this.password, salt);
//     ///console.log(hashString);
//     this.password= hashString;
// })


userSchema.methods.createResetToken = function(){
    //creating unique token using npm i crypto
    const resetToken=resetToken;
    return resetToken;

}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

// //model
const userModel = mongoose.model("userModel",userSchema);




module.exports = userModel