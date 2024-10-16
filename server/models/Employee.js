const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['guide', 'student'],  // Restrict role to either 'guide' or 'student'
        required: true               // Ensure this field is mandatory
    }
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)

module.exports = EmployeeModel
