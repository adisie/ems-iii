const mongoose = require('mongoose')

// profilesSchema
const profilesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profilePath: {
        type: String,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Profile',profilesSchema)