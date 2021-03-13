const express = require("express");
const Blog = require("../models/blog");
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

//npm multer for file uploads
const multer = require("multer");
const { request } = require("express");

//define storage for images with multer
const storage = multer.diskStorage({
	//choose file destination
	destination: function (request, file, callback) {
		callback(null, "./public/img/games/thumbs");
	},

	//add back file extension
	filename: function (request, file, callback) {
		callback(null, file.originalname);
	},
});

//upload parameters for molter
const uploads = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

// blog routes
router.get(
	"/blogs/create",
	basic.check((req, res) => {
		res.render("blogs/create", { title: "Create a new blog" });
	})
);

// all blogs home page
router.get("/games", (req, res) => {
	Blog.find()
		.sort({ console: 1 })
		.then((result) => {
			res.render("blogs/index", { blogs: result, title: "All blogs" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//create a new blog with post and redirecit it to blogs
router.post("/blogs", uploads.single("img"), (req, res) => {
	const blog = new Blog({
		title: req.body.title,
		snippet: req.body.snippet,
		video: req.body.video,
		multiplayer: req.body.multiplayer,
		textarea: req.body.textarea,
		console: req.body.console,
		img: req.file.filename,
	});
	console.log(req.body);

	blog
		.save()
		.then((result) => {
			res.redirect("/games");
		})
		.catch((err) => {
			console.log(err);
		});
});

//single blog game
router.get("/blogs/:id", (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render("blogs/details", { blog: result, title: "Game Details" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//delete a single blog on create page
router.delete("/blogs/:id", (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/games" });
		})
		.catch((err) => {
			console.log(err);
		});
});

//render the single player update site site
router.get("/updateblog/:id", (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render("blogs/update", { blog: result, title: "Update Game" });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/logout", function (req, res) {
	req.logout();
	res.cookie();
	res.redirect("/");
});

//update player with the update post form and redirect to the players site
router.post("/updateblog/:id", (req, res) => {
	const id = req.params.id;
	const oldPlayer = req.params.body;

	Blog.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			snippet: req.body.snippet,
			img: req.body.img,
			multiplayer: req.body.multiplayer,
			textarea: req.body.textarea,
			console: req.body.console,
			video: req.body.video,
		},
		{ new: true },
		function (err, result) {
			if (err) {
				console.log(err);
				res.redirect("/404");
			} else {
				res.redirect("/games");
			}
		}
	);
});

module.exports = router;
