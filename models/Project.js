const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    body: {
        type: String, 
        required: true,
    },
    status: {
        type: String, 
        default: 'incomplete',
        enum: ['incomplete', 'complete'],
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', ProjectSchema)