const userModel = require("../models/userModel")



module.exports.getUser = async function getUser(req, res){

let id = req.id;
// console.log(id);
let user = await userModel.findById(id);

if(user){
    return res.json(user)
}else{
    return res.json({
        message:"user not found here"
        
    })
}

    
}




// module.exports.postUser =function postUser (req,res) {
//     console.log(req.body);
//     res.json({
//         message:"data recevied successfully",
//         user:req.body 

        
//     })
// }

module.exports.updateUser = async function updateUser(req, res) {
    console.log("req.body-> ", req.body);
    //update data in users obj
    try {
      let id = req.params.id;
      console.log(id);
      let user = await userModel.findById(id);
      console.log(user);
      let dataToBeUpdated = req.body;
      if (user) {
        console.log('inside user');
        const keys = [];
        for (let key in dataToBeUpdated) {
          console.log(key);
          keys.push(key);
        }
  
        for (let i = 0; i < keys.length; i++) {
          console.log(keys[i]);
          user[keys[i]] = dataToBeUpdated[keys[i]];
        }
        console.log(user);
        user.confirmPassword=user.password;
        const updatedData = await user.save();
        console.log(updatedData);
        res.json({
          message: "data updated successfully",
          data: updatedData,
        });
      } else {
        res.json({
          message: "user not found",
        });
      }
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };
  



module.exports.deleteUser = async function deleteUser (req,res){

    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id)
    if(!user){
        res.json({
            message:"user not found"
        })
    }
    res.json({
        message:"data has been deleted",
        data:user
    })
}


module.exports.getAllUser = async function getAllUser (req, res){
   try{
    let users = await userModel.find();

    if(users){
        res.json({
            message:"users retrived",
            data:users,
        })
    }else{
      res.json({
        message:"empty users"
        
    })
    }

 
   }catch(err){
    res.json({
      message:err.message
    })
   }
}


module.exports.updateProfileImage=function updateProfileImage(req,res){
  res.json({
    message:'file uploaded succesfully'
  });
}



// function setCookies(req,res){
//     //cookies header me set hota hai
//               //1st parameter (set-Cookie) hai ye cookie set karne ke liye likhte hai 
//               //2nd parameter key value pair hai cookie ka (isLoggedIn=true) 
//     //res.setHeader("Set-Cookie", "isLoggedIn=true")


//     //with cookie-parser
//     //httpOnly se hamara app secure ho jayega koi bhi hmari cookie frontend se excess nhi kar sakta hai sirf backend ko patas hoga, client ka data client and backend ke bich hi transfer hoga
//     //secure:true karne se site tabhi connect hoga jab wo http connection wala hoga.
//     res.cookie("isLoggedIn", true,{maxAge:100*60*60, secure:true, httpOnly:true})

//     res.send("cookies has been set")
// }


// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies recieved")
// }