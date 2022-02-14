const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async register(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({email: email})
            if (user) return res.status(400).json({msg: 'This user already exists'})

            const hashedPassword = await bcrypt.hash(password, 4)

            const newUser = await User.create({
                email,
                password: hashedPassword
            })

            const accessToken = createAccessToken({id: newUser._id})

            res.status(200).json({
                user: {
                    ...newUser._doc,
                    password: ''
                },
                accessToken
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({email: email})
            if (!user) return res.status(400).json({msg: 'User does not exist.'})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: 'Wrong password'})

            const accessToken = createAccessToken({id: user._id})

            res.status(200).json({
                user: {
                    ...user._doc,
                    password: ''
                },
                accessToken
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '1d'})
}

module.exports = new AuthController()