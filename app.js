//import npm modules
const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const favicon = require("serve-favicon");
const session = require("express-session");
const passport = require("passport");
const auth0Strategy = require("passport-auth0");
const path = require("path");
const mongoose = require("mongoose");
//fire the express app
const app = express();
//loged in session
const strategy = new auth0Strategy(
	{
		domain: "dev-t31tzsa4.eu.auth0.com",
		clientID: "jhALEd8YgLCA6iBdGDh6uZ3dEteYQ0gY",
		clientSecret:
			"AP-RCZ0zvLUqbsUcx6gVPkwuEgYT7DwX3zy7uI01f4dzd7fYxSMnH1Y7TaG4Aura",
		callbackURL: "http://localhost:3000/callback",
	},
	function (accessToken, refreshToken, extraParam, profile, done) {
		return done(null, profile);
	}
);

passport.use(strategy);
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	done(null, user);
});
//inint session
app.use(
	session({
		secret:
			"1AP-RCZ0zvLUqbsUcx6gVPkwuEgYT7DwX3zy7uI01f4dzd7fYxSMnH1Y7TaG4Aura?gameroom",
		resave: true,
		saveUninitialized: true,
	})
);
//initializa passport
app.use(passport.initialize());
app.use(passport.session());

//check loging
app.use(function (req, res, next) {
	res.locals.loggedIn = false;

	if (
		req.session.passport &&
		typeof req.session.passport.user !== "undefined"
	) {
		res.locals.loggedIn = true;
	}

	next();
});
//logged in session end

//login routes
app.get(
	"/login",
	passport.authenticate("auth0", {
		clientID: "jhALEd8YgLCA6iBdGDh6uZ3dEteYQ0gY",
		domain: "dev-t31tzsa4.eu.auth0.com",
		redirectUri: "http://localhost:3000/callback",
		responseType: "code",
		audience: "https://manage.auth0.com/dashboard/eu/dev-t31tzsa4/profile",
		scope: "openid profile",
	}),
	function (req, res) {
		res.redirect("/");
	}
);

app.get("/logut", function (req, res) {
	req.logout();
	res.redirect("/");
});

app.get(
	"/callback",
	passport.authenticate("auth0", {
		failureRedirect: "/failure",
	}),
	function (req, res) {
		res.redirect("/user");
	}
);
app.get("/user", function (req, res, next) {
	res.render("user", {
		user: req.user,
		title: "User",
	});
});

app.get("/failure", function (req, res, next) {
	res.render("failure", {
		title: "total failre no auth",
	});
});
//import routes
const blogRoutes = require("./routes/blogRoutes");
const playerRoutes = require("./routes/playerRoutes");
const fortniteRoutes = require("./routes/fortniteRoutes");
const userRoutes = require("./routes/userRoutes");

// connect to mongodb & listen for requests
const dbURI =
	"mongodb+srv://gameroom:Playforfun2@cluster0.gp25g.mongodb.net/games?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

//deprecation warining solution
mongoose.set("useCreateIndex", true);

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //passes the post data to an url object with is withing the req
//add favicon to site
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

/* app.use(morgan('dev')); put out data */
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//homepage redirect
app.get("/", (req, res, next) => {
	res.redirect("/players/active");
});

// importin routes from routes/blogRoutes
/* app.use(scoreRoutes); */
app.use(blogRoutes);
app.use(playerRoutes);
app.use(fortniteRoutes);
app.use(userRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
