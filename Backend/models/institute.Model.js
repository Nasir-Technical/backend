const mongoose = require('mongoose')

const InstituteSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
    },
    ShortName:{
        type:String,
        required:true
    },
    Tel:{
        type:Number,
        required:true
    }
})

const instituteModel = mongoose.model('institute',InstituteSchema)

module.exports = instituteModel