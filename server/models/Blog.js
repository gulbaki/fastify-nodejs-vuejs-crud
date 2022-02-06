const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter an title'],
   
    },
    description: {
        type: String,
        required: [true, 'Please enter an description'],
      
    },
    //user_id: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Blog', blogSchema)