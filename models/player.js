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
        required: true,
        default :true
    },
    checkout: {
        type : Date,
        required: false,
        default: Date.now()
    },
    fortnitescore:{
        type: Number,
        require: false,
        default : "0"
    },
    fifascore: {
        type: Number,
        required: false,
        default : "0"
    },
   
    tournaments: {
      
          fifa: {
                fiscore:{
                    type: Number
                },
                fifadate:{
                    type : Date,
                    default : Date.now()
                }

          },
          fortnite: {
                forscore:{
                    type: Number
                },
                fordate:{
                    type : Date,
                    default : Date.now()
                }

          },
          crashtr: {
                crashscore:{
                    type: Number
                },
                crashdate:{
                    type : Date,
                    default : Date.now()
                }
          }
              
    },
   
    ctrscore: {
        type: Number,
        required: false,
        default : "0"
    }
   
  
    
}, { timestamps:true });


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

