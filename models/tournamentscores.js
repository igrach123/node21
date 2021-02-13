const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    tournamentname: {
        type: String,
        required: true
    },

    newfortnitescore:{
        type: Number,
        require: false
    },
    tournamentdate: {
        type : Date,
        required: true,
        default: Date.now
    }

} , { timestamps:true });

const Score = mongoose.model('Score', TournamentSchema);
module.exports = Score;