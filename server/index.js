if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require("connect-mongo")(session)

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/battleship'
const secret = process.env.secret || 'thisisasecret'


const PORT = process.env.PORT || 3001;

mongoose.connect(dbUrl)
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch((err) => {
        console.log('mongo connection error!', err)
    })

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    secret,
    resave: false,
    store,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

const CatchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}

app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get("/api/currentUser", (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({})
    }
});

app.get("/reroute", (req, res) => {
    res.send("rerouting")
})


app.post("/api/register", CatchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser, (err) => {
            if (err) {
                return console.log('error', err)
            }
            res.redirect("/reroute")
        })

    } catch (e) {
        console.log(e)
        res.redirect("/reroute")
    }

}))

app.post("/api/login", passport.authenticate('local', { successRedirect: '/battleship', failureRedirect: '/login', failureMessage: true, failureFlash: false }), (req, res, next) => {
    res.redirect("/reroute")
})

app.post("/api/logout", CatchAsync(async (req, res, next) => {
    console.log('logout!', req.user)

    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/reroute")
    });
}))

app.put("/api/user/:id", CatchAsync(async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, { ...req.body });
}))

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});