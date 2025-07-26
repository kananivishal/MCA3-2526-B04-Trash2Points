const { User } = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        let { name, email, phoneno, address, password, role } = req.body

        if (!name || !email || !phoneno || !address || !password || !role) {
            res.status(400).json({
                message: "Some fields are missing!"
            })
        }
        const isUserAlreadyExist = await User.findOne({ email })
        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "User already exist!"
            })
        }

        // hash the password
        const salt = bcrypt.genSaltSync(10)
        const passwordHashed = bcrypt.hashSync(password, salt)

        // jwt token
        const token = jwt.sign({ email }, "Trash2Points", { expiresIn: '365d' })

        // create user
        await User.create({
            name,
            email,
            phoneno,
            address,
            // password: passwordHashed,
            password,
            role: 'user'
        })

        res.status(200).json({
            message: "User created successfually",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

const login = async (req, res) => {
    try {
        let { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Some fields are missing!"
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "User not registerd!"
            })
        }
        // compare password
        // const isPasswordMatch = bcrypt.compareSync(password, user.password)
        // if (!isPasswordMatch) {
        //     return res.status(400).json({
        //         message: "Password not matched"
        //     })
        // }

        if (password != user.password || role != user.role) {
            return res.status(400).json({
                message: "Invalid credentials!"
            })
        }

        // jwt token
        const token = jwt.sign({ email }, "Trash2Points", { expiresIn: '365d' })
        
        res.send({
            message: "User logged in",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

module.exports = { register, login }