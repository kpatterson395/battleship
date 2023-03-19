const express = require("express");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
const session = require('express-session')
const mongoose = require('mongoose')
const flash = require("connect-flash")



const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/battleship')
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch((err) => {
        console.log('mongo connection error!', err)
    })

const app = express();
app.use(express.urlencoded({ extended: true }))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

app.get("/api", (req, res) => {
    console.log('test')
    res.json({ message: "Hello from server!" });
});



app.post("/api/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser, (err) => {
            if (err) {
                return console.log('error', err)
            }
            req.flash('success', 'Welcome to Battleship')
            res.send(`Welcome, ${username}!`)
        })

    } catch (e) {
        res.send(e.message)
    }

})

app.post("/api/login", passport.authenticate('local', { successRedirect: '/battleship', failureRedirect: '/login', failureMessage: true, failureFlash: true }), (req, res, next) => {
    console.log('success')
})

app.post("/api/logout", async (req, res, next) => {
    console.log('logout!', req.user)
    req.logout(function (err) {
        if (err) { return next(err); }
        res.send('logged out')
    });

})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});