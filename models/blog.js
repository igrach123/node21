const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new schema

const gameSchema = new Schema({
    title: {
        type : String,
        required: true
    },
    snippet: {
        type: String,
        required:true
    },
    video: {
        type: String,
        required:false
    },
    img: {
        type: String,
        required: false
    },
    multiplayer: {
        type: Boolean,
        required:true
    },
    textarea: {
        type: String,
        required:false
    },
    console: {
        type: String,
        required : true
    }
    
}, { timestamps:true });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;