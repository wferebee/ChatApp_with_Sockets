const express = require('express')
var path = require('path');
const User = require('../models/User')
const auth = require("../middleware/auth")
const router = express.Router()


router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/html/welcome.html'));
})

router.get("/login", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/html/login.html'));
})

router.get("/signup", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/html/signup.html'));
})

router.post('/signup', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        return res.redirect("/login");

    } catch (error) {
        return res.redirect("/");
    }

})

router.post('/chat', async (req, res) => {
    //Login a registered user
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findByCredentials(email, password)

        if (!user) {
            return res.sendFile(path.join(__dirname + '../../../public/html/login.html'));
        } else {
            const token = await user.generateAuthToken();

            res.clearCookie();
            res.cookie("token", token);
            /*      res.send({ user, token }) */
            res.sendFile(path.join(__dirname + '../../../public/html/chat.html'));

        }


    } catch (error) {
        return res.sendFile(path.join(__dirname + '../../../public/html/login.html'));
    }

})

router.post('/', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
   /*      console.log("A User Signed Out") */
        res.sendFile(path.join(__dirname + '../../../public/html/welcome.html'));
    } catch (error) {
        res.sendFile(path.join(__dirname + '../../../public/html/welcome.html'));
    }
})

module.exports = router