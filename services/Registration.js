
class Registration {
    constructor(obj){
        this.name = obj.name
        this.password = obj.password
        this.emailid = obj.emailid
        this.phoneno = obj.phoneno
        this.booking = {
            shiftingFrom:"",
            shiftingTo:"",
            shiftingType:""
        }
    }
}

module.exports = Registration;