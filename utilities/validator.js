let validator = {}

validator.validateName = (name) => {
    if(name == null){
        let err = new Error("The name must not be null");
        err.status = 400
        throw err 
    }
}

validator.validatePhoneNumber = (number) => {
    if(!number.match(/^\d{10}$/)){
        let err = new Error("The Phone Number should be 10 digits");
        err.status = 400
        throw err 
    }
}

validator.validateEmail = (email) => {
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        let err = new Error("The Email should be Valid");
        err.status = 400
        throw err 
    }
}

validator.validatePassword = (password) => {
    if(!password.match(/[A-Za-z0-9]{8,}/)){
        let err = new Error("The password should contain minimum 8 characters");
        err.status = 400
        throw err
    }
}

validator.validateShiftType = (st) => {
    if(!st.match(/^(house|vehicle)$/i)){
        let err = new Error("Shifting Type must be either Housing or Vehicle");
        err.status = 400
        throw err
    }
}

module.exports = validator;