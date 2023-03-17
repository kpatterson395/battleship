const express = require("express");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
const session = require('express-session')


const PORT = process.env.PORT || 3001;

const app = express();

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/api", (req, res) => {
    console.log('test')
    res.json({ message: "Hello from server!" });
});

app.get("/fakeUser", async (req, res) => {
    const user = new User({ email: 'kp@123.com', username: 'kp123' })
    const newUser = await User.register(user, 'password')
    res.send(newUser)
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});