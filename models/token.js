const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type: String,
        require: true,
        unique: true
    },
    isValid:{
        type: Boolean,
        require: true
    }
},{
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;