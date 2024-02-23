const mongoose = require('mongoose')


// schema
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    position: {
        type: String,
    },
    sallary: {
        type: Number,
    },
    info: {
        type: String,
    },
    profile: {
        type: String,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Employee',employeeSchema)