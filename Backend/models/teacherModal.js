const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    course:{
        type:Number,
        required:true
    }
})

const teacherModel = mongoose.model('teachers',teacherSchema)

module.exports = teacherModel
