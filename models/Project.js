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
        default: 'Incomplete',
        enum: ['Incomplete', 'Complete'],
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
    }],
    due: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', ProjectSchema)