const express = require("express");
const moment = require("moment");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

// user routes////////////////////////

// all users render

// render create a new player
router.get("/users/create", (req, res) => {
	res.render("users/create", { title: "Create a new User" });
});
router.get("/users/login", (req, res) => {
	res.render("users/login", { title: "Login" });
});

//create a new player with the form and redirect it to players
router.post("/users", async (req, res) => {
	const user = new User(req.body);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	console.log(user.password);

	await user
		.save()
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
});

//update player with the update post form and redirect to the players site

//delete a single blog on details or on click page

module.exports = router;
