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
    img: {
        data: Buffer ,
        contentType : String,
        required: false
    }
}, { timestamps:true });

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;