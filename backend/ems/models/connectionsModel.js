const mongoose = require('mongoose')

const connectionsSchema = new mongoose.Schema({
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Connection',connectionsSchema)