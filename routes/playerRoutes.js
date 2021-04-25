const express = require("express");
const moment = require("moment");
const Player = require("../models/player");
const router = express.Router();

// player routes////////////////////////

// all players render
router.get("/players", (req, res) => {
	//send moment js to index ejs
	res.locals.moment = moment;
	if (req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), "gi");
		Player.find({ gamertag: regex })
			.sort({ createdAt: -1 })
			.then((result) => {
				res.render("players/index", { players: result, title: "All players" });
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		Player.find()
			.sort({ createdAt: -1 })
			.then((result) => {
				res.render("players/index", { players: result, title: "All players" });
			})
			.catch((err) => {
				console.log(err);
			});
	}
});
// render create a new player
router.get("/players/create", (req, res) => {
	res.render("players/create", { title: "Create a new player" });
});

// all active players render
router.get("/players/active", (req, res) => {
	//send moment js to index ejs
	res.locals.moment = moment;
	if (req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), "gi");
		Player.find({ gamertag: regex })
			.sort({ createdAt: -1 })
			.then((result) => {
				res.render("players/active", {
					players: result,
					title: "Active players",
				});
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		//declare an active player
		const activePlayer = {
			isactive: true,
		};
		//show only active players
		Player.find(activePlayer)
			.sort({ createdAt: -1 })
			.then((result) => {
				res.render("players/active", {
					players: result,
					title: "Active players",
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

//create a new player with the form and redirect it to players
router.get("/players", (req, res) => {
	const player = new Player(req.body)
		.then((result) => {
			res.render("/players/create", {
				players: result,
				title: "create players",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

//create a new player with the form and redirect it to players
router.post("/players", (req, res) => {
	const player = new Player(req.body);
	//add a embeded value!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*  player.sub.test = req.body.test; */
	player
		.save()
		.then((result) => {
			res.redirect("/fortnite");
		})
		.catch((err) => {
			console.log(err);
		});
});

//show single player details
router.get("/players/:id", (req, res) => {
	//send moment js to details ejs
	res.locals.moment = moment;
	const id = req.params.id;
	Player.findById(id)
		.then((result) => {
			res.render("players/details", {
				player: result,
				title: "Player Details",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

//render the single player update site site
router.get("/updateplayer/:id", (req, res) => {
	res.locals.moment = moment;
	const id = req.params.id;
	Player.findById(id)
		.then((result) => {
			res.render("players/update", { player: result, title: "Update Player" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//update player with the update post form and redirect to the players site
router.post("/updateplayer/:id", (req, res) => {
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
				res.redirect("/players/active");
			}
		}
	);
});
router.post("/updateplayer/daily/:id", (req, res) => {
	const id = req.params.id;

	Player.findByIdAndUpdate(
		id,
		{ daily: req.body.daily, isactive: req.body.isactive },
		{ new: true },
		function (err, result) {
			if (err) {
				console.log(err);
				res.redirect("/404");
			} else {
				res.redirect("/players/active");
			}
		}
	);
});

//delete a single blog on details or on click page
router.delete("/players/:id", (req, res) => {
	const id = req.params.id;

	Player.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/players/active" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//fuzzy search function
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = router;
