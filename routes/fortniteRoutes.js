const express = require("express");
const moment = require("moment");
const { updateMany } = require("../models/blog");
const Game = require("../models/blog");
const Player = require("../models/player");
const Score = require("../models/tournamentscores");

const router = express.Router();

// all blogs home page

//how to use multiple collections on one  ejs
router.get("/fortnite", function (req, res) {
	res.locals.moment = moment;
	var player = {}; //Create Empty player Object
	var blogs = {}; //Create Empty games&blogs Object
	var vendors = {}; //Create Empty vendor Objext

	const activePlayer = {
		isactive: true,
		daily: true,
	};

	Player.find(activePlayer)
		.sort({ "tournaments.fortnite.forscore": -1 })
		.then((result) => {
			players = result;
		})
		.catch((err) => {
			console.log(err);
		});

	Game.find({}, function (err, allVendors) {
		if (err) {
			console.log(err);
		} else {
			blogs = allVendors;
			//find order collection and passing it to ejs templates
			res.render("fortnite/index", {
				players: players,
				blogs: blogs,
				title: "Fortnite Tournament",
			});
		}
	});
});
//top 50
router.get("/top50", function (req, res) {
	res.locals.moment = moment;
	var player = {}; //Create Empty player Object
	var blogs = {}; //Create Empty games&blogs Object
	var vendors = {}; //Create Empty vendor Objext

	const hasFortniteScore = {};

	Player.find(hasFortniteScore)
		.sort({ "tournaments.fortnite.forscore": -1 })
		.limit(25)
		.then((result) => {
			players = result;
		})
		.catch((err) => {
			console.log(err);
		});

	Game.find({}, function (err, allVendors) {
		if (err) {
			console.log(err);
		} else {
			blogs = allVendors;
			//find order collection and passing it to ejs templates
			res.render("fortnite/top50", {
				players: players,
				blogs: blogs,
				title: "Fortnite Tournament",
			});
		}
	});
});

//render the single player update site site
router.get("/fortnitefullupdateplayer/:id", (req, res) => {
	res.locals.moment = moment;
	const id = req.params.id;
	Player.findById(id)
		.then((result) => {
			res.render("fortnite/update", {
				player: result,
				title: "Update Player for Fortnite",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

//UPDATE FORTNITE SCORE ON CLICK
router.post("/fortniteupdateplayer/:id", (req, res) => {
	res.locals.moment = moment;
	const id = req.params.id;

	Player.findByIdAndUpdate(
		id,
		{
			"tournaments.fortnite.place": req.body.place,
			"tournaments.fortnite.kills": req.body.kills,
			"tournaments.fortnite.forscore": req.body.forscore,
			daily: req.body.daily,
		},
		{ new: true },
		function (err, result) {
			if (err) {
				console.log(err);
				res.redirect("/404");
			} else {
				res.redirect("/fortnite");
			}
		}
	);
});
//UPDATE many daily on click
router.put("/fortniteupdatemany", (req, res) => {
	Player.updateMany(
		{ daily: true },
		{ $set: { daily: false } },
		function (err, result) {
			if (err) {
				console.log(err);
				res.redirect("/404");
			} else {
				res.json({ redirect: "/fortnite" });
			}
		}
	);
});
//update player with the update post form and redirect to the fortnite  site
router.post("/fortnitefullupdateplayer/:id", (req, res) => {
	const id = req.params.id;
	const oldPlayer = req.params.body;

	Player.findByIdAndUpdate(
		id,
		{
			name: req.body.name,
			gamertag: req.body.gamertag,
			age: req.body.age,
			flag: req.body.flag,
			checkout: req.body.checkout,
			isactive: req.body.isactive,
			fifascore: req.body.fifascore,
			ctrscore: req.body.ctrscore,
			daily: req.body.daily,
			"tournaments.fortnite.place": req.body.place,
			"tournaments.fortnite.kills": req.body.kills,
			"tournaments.fortnite.forscore": req.body.forscore,
		},
		{ new: true },
		function (err, result) {
			if (err) {
				console.log(err);
				res.redirect("/404");
			} else {
				res.redirect("/fortnite");
			}
		}
	);
});

//UPDATE PLAYER SITE LINK FROM FORTNITE SITE

module.exports = router;
