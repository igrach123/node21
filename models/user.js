const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// player Schema

const playerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is Invalid!!");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 6,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error("Password canonot contain password");
				}
			},
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", playerSchema);

module.exports = User;
