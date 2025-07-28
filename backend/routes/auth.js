const express = require('express')
const { register, login, editProfile } = require('../controllers/auth.controller')
const router = express.Router()

// Register route
router.post('/register', register)

// Login route
router.post('/login', login)

// Profile
router.patch('/editProfile', editProfile)

module.exports = router