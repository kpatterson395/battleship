const express = require("express");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
const session = require('express-session')


const PORT = process.env.PORT || 3001;

const app = express();

const sessionConfig = {
    secret: 'thisisnotasecret',
    resave: false,
    saveUninitialized: false,
}

app.use(session(sessionConfig))
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.get("/api", (req, res) => {
    console.log('test')
    res.json({ message: "Hello from server!" });
});



app.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body.user
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser, (err) => {
            if (err) {
                return console.log('error', err)
            }
            res.send(`Welcome, ${username}!`)
        })

    } catch (e) {
        res.send(e.message)
    }

})

app.post("/login", passport.authenticate('local', { failureMessage: true, failureRedirect: "/login" }), (req, res, next) => {
    res.send('welcome!')
    console.log(req.isAuthenticated(), req.user())
})

app.get("/logout", async (req, res, next) => {
    console.log('logout!')
    req.logOut()
    res.send('logged out')
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});