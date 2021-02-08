const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new schema

const playerSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    gamertag: {
        type : String,
        required: true
    },
    age: {
        type: Number,
        required:true
    },
    flag: {
        type: String,
        required: false
    },
    isactive: {
        type: Boolean,
        required: true
    },
    checkout: {
        type : Date,
        required: false
    }
   
  
    
}, { timestamps:true });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;