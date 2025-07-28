const { User } = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        let { name, email, phoneno, address, password, role } = req.body

        if (!name || !email || !phoneno || !address || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Some fields are missing!"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist!"
            })
        }

        // hash the password
        const salt = bcrypt.genSaltSync(10)
        const passwordHashed = bcrypt.hashSync(password, salt)

        // create user
        const user = await User.create({
            name,
            email,
            phoneno,
            address,
            // password: passwordHashed,
            password,
            role: 'user'
        })

        // jwt token
        const token = jwt.sign({ email }, "Trash2Points", { expiresIn: '365d' })

        return res.status(201).json({
            success: true,
            message: "User registered successfually",
            token,
            user: {
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                address: user.address
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const login = async (req, res) => {
    try {
        let { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Some fields are missing!"
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not registerd!"
            })
        }
        // compare password
        // const isPasswordMatch = bcrypt.compareSync(password, user.password)
        // if (!isPasswordMatch || role != user.role) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Invalid credentials!"
        //     })
        // }

        if (password != user.password || role != user.role) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            })
        }

        // jwt token
        const token = jwt.sign({ email }, "Trash2Points", { expiresIn: '365d' })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            token,
            user: {
                name: user.name,
                email: user.email,
                phoneno: user.phoneno,
                address: user.address
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const editProfile = async (req, res) => {
    try {
        const { name, address } = req.body
        if (!name || !address) {
            return res.status(400).json({
                success: false,
                message: "Some fields are missing"
            })
        }

        let { token } = req.headers
        const decodedToken = jwt.verify(token, "Trash2Points")
        const user = await User.findOne({ email: decodedToken.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                massage: "User not found!"
            })
        }

        const updateProfile = await User.findByIdAndUpdate(user._id, {
            name: name,
            address: address
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Profile update successfully.",
            user: {
                name: updateProfile.name,
                email: updateProfile.email,
                phoneno: updateProfile.phoneno,
                address: updateProfile.address
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { register, login, editProfile }