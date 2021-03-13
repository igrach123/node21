/* const jwt = require("jsonwebtoken"); */
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const app = express();
/* const bcrypt = require("bcrypt");
const User = require("../models/user"); */
const router = express.Router();

// all users render

// render create a new player
/* router.get("/users/create", (req, res, next) => {
	res.render("users/create", { title: "Create a new User" });
});

router.get("/users/login", async (req, res) => {
	res.render("users/login", { title: "Login" });
}); */
//create a new player with the form and redirect it to players
/* router.post("/users", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already Registerd");
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user
		.save()
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
}); */
/* router.post("/login", async (req, res) => {
	console.log(req.body);
	//check if user exists

	let user = await User.findOne({ email: req.body.email });
	console.log(user);
	if (!user) return res.status(400).send("Invalid email or password");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password");
	const token = jwt.sign({ _id: user._id }, "jwtPrivateKey"); */

//set cookie after login to acces_token
/* res
		.status(201)
		.cookie("access_token", "Bearer " + token, {
			expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
		})
		.redirect("/"); */
/* 	res.append("x-token", token).redirect("/");
	console.log(token);
}); */

module.exports = router;
