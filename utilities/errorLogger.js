var fs = require("fs");

var errorLogger = function(err,req,res,next){
    if(err){

        var errorMessage = ""+ new Date().toDateString() + " " + err.stack +  "\n";
        fs.appendFile("ErrorLogger.txt", errorMessage, function(err){
            if(err) console.log("Error raised while Error Logging");
        });

        if(err.status){
            res.status(err.status)
        }else{
            res.status(500)
        }

        res.json({"message":err.message})

    }

    next();
}

module.exports = errorLogger;