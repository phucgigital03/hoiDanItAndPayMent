const mongoose = require('mongoose');

const User = new mongoose.Schema({ 
    name: {type: String},
    email: {type: String},
});

const Comment = new mongoose.Schema({
    parentId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        default: null 
    },
    content: { type: String },
    userInfo: User,
    childCommentIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comments'
    }],
    posted: Date,
    commentNumberReply: {type: Number, default: 0},
});

const Comments = mongoose.model('Comments', Comment);
module.exports = Comments
