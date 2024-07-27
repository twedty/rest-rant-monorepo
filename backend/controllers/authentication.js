const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    //grabs the email and information
    let user = await User.findOne({
        where: { email: req.body.email }
    })
    //checks and compares with the information if it matches the stored hashed value
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    //Will return with the user if it is true otherwise will show the message above if false
    } else {
        res.json({ user })
    }
})


module.exports = router
