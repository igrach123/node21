/* const jwt = require("jsonwebtoken"); */
const config = require("config");
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

//auth user
router.post("/auth", async (req, res) => {
	console.log(req.body);
	//check if user exists

	let user = await User.findOne({ email: req.body.email });
	console.log(user);
	if (!user) return res.status(400).send("Invalid email or password");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password");

	const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");

	res.send(token);
});

module.exports = router;
