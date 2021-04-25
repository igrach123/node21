const express = require("express");
const moment = require("moment");
const Blog = require("../models/blog");
const Game = require("../models/blog");
const Player = require("../models/player");
const Reservation = require("../models/reservations");
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
	var reservations = {}; //Create Empty reservation Objext

	Game.find({}, function (err, allVendors) {
		if (err) {
			console.log(err);
		} else {
			blogs = allVendors;
			//find order collection and passing it to ejs templates
			res.render("reservations/index", {
				blogs: blogs,
				reservation: reservations,
				title: "Reservations",
			});
		}
	});
});

router.post("/reservations", (req, res) => {
	const reservation = new Reservation(req.body);
	//add a embeded value!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*  player.sub.test = req.body.test; */
	reservation
		.save()
		.then((result) => {
			res.redirect("/reservations");
		})
		.catch((err) => {
			console.log(err);
		});
});

//show single player details
router.get("/reservations/:id", (req, res) => {
	//send moment js to details ejs
	res.locals.moment = moment;
	const id = req.params.id;
	Reservation.findById(id)
		.then((result) => {
			res.render("reservations/details", {
				reservation: result,
				title: "Reservation Details",
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
