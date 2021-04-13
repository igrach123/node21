import blog from "./blog.js";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameSchema = require("./blog");

const reservationSchema = new Schema({
	conzole: {
		type: number,
		required: true,
	},
	room: {
		type: number,
		require: true,
	},
	time: {
		type: Date,
		required: true,
	},
	game: { type: Schema.Types.ObjectId, ref: "blog" },
});

export const reservation = userSchema.discriminator("reserveGame", blog);
