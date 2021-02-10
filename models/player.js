const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// player Schema

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
        required: false,
        default:Date.now
    },
    fortnitescore:{
        type: Number,
        require: false
    },
    fifascore: {
        type: Number,
        required: false
    },
    tournaments: {        
        mkdate: {
            type: Date,
            required: false,
            default: Date.now
        },
        mkscore: {
            type: Number,
            required: false,
           
        }
    
    },
   
    ctrscore: {
        type: Number,
        required: false
    }
   
  
    
}, { timestamps:true });


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

