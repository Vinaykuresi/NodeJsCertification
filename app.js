var express = require("express")
var bodyParser = require("body-parser")
var router = require("./routes/router")
var requestLogger = require("./utilities/requestLogger")
var errorLogger = require("./utilities/errorLogger")

var app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use(requestLogger)
app.use("/",router)
app.use(errorLogger)

app.listen(4000)
console.log("App is listening to the Post 4000")