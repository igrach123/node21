const express = require("express");
const Blog = require("../models/blog");
const Reservations = require("../models/reservations");
const router = express.Router();
const auth = require("http-auth");
const basic = auth.basic(
	{
		realm: "Protected Area",
	},
	function (username, password, callback) {
		// Custom authentication method.
		callback(username === "gameroom" && password === "1411");
	}
);

const app = express();

router.get("/reservations", function (req, res) {
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

module.exports = router;
