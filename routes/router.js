const user = require("../services/users")
const express = require("express");
const router = express.Router();

// get the package details by setting up db
router.get("/setupdb", async(req, res, next) => {
    try {
        user.insertPackages(req, res, next);
        console.log("came to setupdb")
    }catch(err){
        next(err)
    }
}); 

// configure the router object to handle the POST request to '/register'
router.post("/register", async(req, res, next) => {
    try {
        user.registerUser(req, res, next)
        console.log("came to register")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the POST request to '/login'
router.post("/login", async(req, res, next) => {
    try {
        user.loginUser(req, res, next);
        console.log("came to login")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the GET request to '/viewpackages'
router.get('/viewpackages', async(req, res, next) => {
    try {
        user.viewPackageDetails(req, res, next);
        console.log("came to viewpackages")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the PUT request to '/bookaslot'
router.put('/bookaslot', async(req, res, next) => {
    try {
        user.bookaslot(req, res, next);
        console.log("came to bookaslot")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the PUT request to '/cancelbooking'
router.put('/cancelbooking', async(req, res, next) => {
    try {
        user.cancelbooking(req, res, next);
        console.log("came to cancelbooking")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the DELETE request to '/deleteuser'
router.delete('/deleteuser', async(req, res, next) => {
    try {
        user.deleteUser(req, res, next);
        console.log("came to deleteuser")
    }catch(err){
        next(err)
    }
});

// configure the router object to handle the ALL invalid request
router.all("*",function(req, res, next){
    let err = new Error("Invalid path requests!!");
    console.log("came to setupdb")
    err.status = 400;
    next(err)
})

module.exports = router;
