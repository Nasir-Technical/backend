const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Fees:{
        type:String,
    },
    douraction:{
        type:String,
        required:true
    },
    ShortName:{
        type:Number,
        required:true
    }
})

const courseModel = mongoose.model('courses',courseSchema)

module.exports = courseModel
