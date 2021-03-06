/* const jwt = require("jsonwebtoken"); */
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const auth0Strategy = require("passport-auth0");
const app = express();
/* const bcrypt = require("bcrypt");
const User = require("../models/user"); */
const router = express.Router();

// all users render

// render create a new player
router.get("/users/create", (req, res, next) => {
	res.render("users/create", { title: "Create a new User" });
});

/* router.get("/users/login", (req, res) => {
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

	const token = jwt.sign({ _id: user._id }, config.get("jwtPrivatekey"));
	res.header("x-auth-token", token).send(user._id, user.name, user.email);
	res.send(user._id, user.name, user.email);
}); */

//update player with the update post form and redirect to the players site

//delete a single blog on details or on click page

module.exports = router;
