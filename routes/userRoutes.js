const express = require("express");
const moment = require("moment");
const User = require("../models/user");
const router = express.Router();

// user routes////////////////////////

// all users render

// render create a new player
router.get("/users/create", (req, res) => {
	res.render("users/create", { title: "Create a new User" });
});

//create a new player with the form and redirect it to players
router.post("/users", (req, res) => {
	const user = new User(req.body);
	console.log(user);
	//add a embeded value!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*  player.sub.test = req.body.test; */
	user
		.save()
		.then((result) => {
			res.redirect("/users");
		})
		.catch((err) => {
			console.log(err);
		});
});

//show single player details
router.get("/users/:id", (req, res) => {
	//send moment js to details ejs
	res.locals.moment = moment;
	const id = req.params.id;
	Player.findById(id)
		.then((result) => {
			res.render("users/details", {
				player: result,
				title: "User Details",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

//update player with the update post form and redirect to the players site

//delete a single blog on details or on click page

module.exports = router;
