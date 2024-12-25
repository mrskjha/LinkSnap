const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shorturl: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timeSpam: {
                type: Number,
            },
        },
    ], 
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
