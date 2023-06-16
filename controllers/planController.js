const planModel = require("../models/planModel")

//get all plans
module.exports.getAllPlan=async function getAllPlan(req,res){
    try{
        let plans = await planModel.find();
        if(plans){
            return res.json({
                message:"all plans retrived",
                data:plans
            });
        }else{
            return res.json({
                message:"plans not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

//getPlan (for one plan)
module.exports.getPlan=async function getPlan(req,res){
    try{
        let id= req.params.id;
        console.log(id);
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                message:"plan retrived",
                data:plan
            });
        }else{
            return res.json({
                message:"plan not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


//create Plan
module.exports.createPlan=async function createPlan(req,res){
    try{
        let planData = req.body;
        if(planData){
            let createPlan=await planModel.create(planData);
            return res.json({
                message:"plan created successfully",
                data:createPlan
            })
        }else{
            res.json({
                message:"plan data not found"
            })
        }

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


//delete plan
module.exports.deletePlan=async function deletePlan(req,res){
    try{
        let id = req.params.id;
        if(id){
            let deletePlan=await planModel.findByIdAndDelete(id);
            return res.json({
                message:"plan deleted successfully",
                data:deletePlan
            })
        }else{
            res.json({
                message:"plan data not found"
            })
        }

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


//update plan
module.exports.updatePlan=async function updatePlan(req,res){
    try{
        let id = req.params.id;
        let dataToBeUpdated= req.body;
        console.log(id);
        console.log(dataToBeUpdated);
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }

        let plan=await planModel.findById(id);

        for(let i=0; i<keys.length; i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]]
        }
        console.log(plan);
        //doc
        await plan.save()
        return res.json({
            message:"plan updated successfully",
            data:plan
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


//top 3 plan on the basis of rating
module.exports.top3Plans=async function top3Plans(req,res){
    try{
        const plans = await planModel.find()
        .sort({
            ratingsAverage:-1
        })
        .limit(3);
        return res.json({
            message:"top 3 plans",
            data:plans
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}







