const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// player Schema

const playerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		gamertag: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		flag: {
			type: String,
			required: false,
		},
		isactive: {
			type: Boolean,
			required: true,
			default: true,
		},
		daily: {
			type: Boolean,
			required: true,
			default: false,
		},
		checkout: {
			type: Date,
			required: false,
			default: Date.now(),
		},
		fifascore: {
			type: Number,
			required: false,
		},
		tournaments: {
			fortnite: {
				place: {
					type: Number,
					default: 0,
				},
				kills: {
					type: Number,
					default: 0,
				},
				forscore: {
					type: Number,
				},
				fordate: {
					type: Date,
					default: Date.now(),
				},
			},
			fifa: {
				fiscore: {
					type: Number,
				},
				fifadate: {
					type: Date,
					default: Date.now(),
				},
			},

			crashtr: {
				crashscore: {
					type: Number,
				},
				crashdate: {
					type: Date,
					default: Date.now(),
				},
			},
		},
		ctrscore: {
			type: Number,
			required: false,
			default: "0",
		},
	},
	{ timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
