const mongoose = require('mongoose');

const Blog = new mongoose.Schema({ 
    title: { type: String },
    description: { type: String},
    commentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }]
});

const Blogs = mongoose.model('Blogs', Blog);
module.exports = Blogs
