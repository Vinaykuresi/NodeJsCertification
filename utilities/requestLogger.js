var fs = require("fs");

var requestLogger = function(req,res,next){

    var loggerMessage = ""+ new Date() + " " + req.method + " " + req.url +  "\n";
    fs.appendFile("RequestLogger.txt",loggerMessage, function(err){
        if(err) return next(err);
    });

    next();
}

module.exports = requestLogger;