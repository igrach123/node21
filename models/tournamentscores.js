const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    fortnitescore:{
        type: Number,
        require: false
    },
    fifascore: {
        type: Number,
        required: false
    },
   
    ctrscore: {
        type: Number,
        required: false
    }
   
} , { timestamps:true });

const Score = mongoose.model('Score', TournamentSchema);
module.exports = Score;