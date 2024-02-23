const fs = require('fs')
// models
// profilesModel
// Profile
const Profile = require('../models/profilesModel')
// usersModel
// User
const User = require('../models/usersModel')

// allProfiles
const allProfiles = async (req,res) => {
    try{
        const profiles = await User.aggregate([
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'profiles',
                }
            },
            {
                $project: {
                    _id: 1,
                    profiles: {
                        _id: 1,
                        profilePath: 1,
                    }
                }
            }
        ])
        res.status(200).json({profiles})
    }catch(err){
        res.status(400).json({
            error: 'get all profiles error'
        })
    }
}

// newProfile
const newProfile = async (req,res) => {
    try{
        const userId = req.user._id 
        const profilePath = req.file?.path 
        const profile = await Profile.create({userId,profilePath})
        res.status(200).json({profile})
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'add new profile error'
        })
    }
}

// deleteProfile
const deleteProfile = async (req,res) => {
    try{
        const _id = req.params._id
        const profile = await Profile.findById(_id)
        if(!profile){
            return res.status(400).json({
                error: 'profile not found'
            })
        }
        if(profile.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'unauthorized to delete profile'
            })
        }
        if(fs.existsSync(profile.profilePath)){
            fs.unlinkSync(profile.profilePath)
        }
        await profile.deleteOne()
        res.status(200).json({
            _id,
            userId: req.user._id,
            message: 'profile deleted',
        })
        
    }catch(err){
        res.status(400).json({
            error: 'delete profile error'
        })
    }
}

// exports
module.exports = {
    allProfiles,
    newProfile,
    deleteProfile,
}