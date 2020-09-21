const models = require("../models/schema");
const validators = require("../utilities/validator");
const Registration = require("../services/Registration")

// Insert Package code

exports.insertPackages = async(req, res, next) => {
    let check = await models.packageModel.find();
    if(check.length == 0){
        let packages = await models.packageModel.create(models.packageDetails)
        if(packages!=null){
            res.status(200);
            res.json(packages)
        }else{
            let err = new Error("Package details updation failed!");
            err.status = 400
            next(err)
        }
    }else{
        res.status(200);
        res.json({message:"Data inserted Successfully"})
    }
}

// {
// 	"emailid":"vinaykuresi@gmail.com",
// 	"bookings":{
// 		"shiftingFrom":"tirupati",
//         "shiftingTo":"bangalore",
//         "shiftingType":"house"
// 	}
// }

// {
// 	"emailid":"vinay@yahoo.com",
// 	"bookings":{
// 		"shiftingFrom":"tirupati",
//         "shiftingTo":"bangalore",
//         "shiftingType":"house"
// 	}
// }

// {
//     "name":"komali",
//     "emailid":"komali@yahoo.com",
//     "password":"9154549566vv",
//     "phoneno":"9154549566"
// }

// {
//     "name":"vinay",
//     "emailid":"vinay@yahoo.com",
//     "password":"9154549566vv",
//     "phoneno":"9154549566"
// }

exports.registerUser = async(req, res, next) => {
    try{
        validators.validateName(req.body.name);
        validators.validateEmail(req.body.emailid);
        validators.validatePassword(req.body.password);
        validators.validatePhoneNumber(req.body.phoneno);
    }catch(err){
        // throw err
        next(err)
    }
    let response = await models.userModel.findOne({name:req.body.name})
    if(response){
        let err = new Error("User already Exists");
        err.status = 406;
        // throw err
        next(err)
    }else{
        // let userAccount = new Registration(req.body);
        // console.log("In register user Account",userAccount)
        req.body.bookings = {
            "shiftingFrom":"",
            "shiftingTo":"",
            "shiftingType":""
        }
        let account = await models.userModel.create(req.body);
        if(account){
            // return account
            res.json({message:"User Registered Successfully"})
        }else{
            let err = new Error("Account not created");
            err.status = 500;
            // throw err
            next(err)
        }
    }
}

exports.loginUser = async(req, res, next) => {
    let response = await models.userModel.findOne({name:req.body.name})
    if(!response){
        let err = new Error("Please register yourself to avail the service");
        err.status = 400;
        next(err)
    }else if(req.body.password != response.password){
        let err = new Error("Incorrect Password");
        err.status = 400;
        next(err)
    }else{
        res.json({message:"User Login successfull"});
    }
}

exports.viewPackageDetails = async(req, res, next) => {
    let response = await models.packageModel.find({name:req.body.name},{_id:0,__v:0})
    if(!response){
        let err = new Error("Unable to load the package details!! Please try again...");
        err.status = 400
        next(err)
    }else{
        res.json(response)
    }
}

exports.bookaslot = async(req, res, next) => {
    try {
        validators.validateEmail(req.body.emailid)
        validators.validateShiftType(req.body.bookings.shiftingType)
    } catch (error) {
        next(error)
    }
    let response = await models.userModel.findOne({emailid:req.body.emailid})
    if(!response){
        let err = new Error("No such user. Please check your credentials.")
        err.status = 404
        next(err)
    }else{
        let query = {
            'bookings.shiftingTo':req.body.bookings.shiftingTo,
            'bookings.shiftingFrom':req.body.bookings.shiftingFrom,
            'bookings.shiftingType':req.body.bookings.shiftingType
        }
        // let response = await models.userModel.updateOne({emailid:req.body.emailid},{ $push : {bookings : req.body.bookings.shiftingType}}, { runValidators : true})
        let response = await models.userModel.updateOne({emailid:req.body.emailid},{$set:query}, { runValidators : true})
        console.log(response)
        if(response.nModified > 0){
            res.status(200);
            res.json({message:"Booking Successful..."})
        }else{
            let err = new Error("Unable to book the slot, please try later...");
            err.status = 400
            next(err)
        }
    }
}

exports.cancelbooking = async(req, res, next) => {
    try {
        validators.validateEmail(req.body.emailid)
    } catch (error) {
        next(error)
    }
    let response = await models.userModel.findOne({emailid:req.body.emailid})
    if(!response){
        let err = new Error("No such user. Please check your credentials.")
        err.status = 404
        next(err)
    }else{
        let query = {
            'bookings.shiftingTo':"",
            'bookings.shiftingFrom':"",
            'bookings.shiftingType':""
        }
        // let response = await models.userModel.updateOne({emailid:req.body.emailid},{ $pull : bookings }, { runValidators : true })
        let response = await models.userModel.updateOne({emailid:req.body.emailid},{$set:query}, { runValidators : true})
        if(response.nModified > 0){
            res.status(200);
            res.json({message:"Cancellation Successful"});
        }else{
            let err = new Error("Cancellation failed!! Please try again...");
            err.status = 400
            next(err)
        }
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        validators.validateEmail(req.body.emailid)
        validators.validateShiftType(req.body.bookings.shiftingType)
    } catch (error) {
        next(error)
    }
    let response = await models.userModel.findOne({emailid:req.body.emailid})
    if(!response){
        let err = new Error("No such user. Please check your credentials.")
        err.status = 404
        next(err)
    }else{
        let response = await models.userModel.deleteOne({emailid:req.body.emailid})
        if(response){
            res.status(200);
            res.json({message:"Deletion Successful, user removed"})
        }else{
            let err = new Error("Deletion failed!! Please try again...");
            err.status = 400
            next(err)
        }
    }
}



