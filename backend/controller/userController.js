import asyncHandler from 'express-async-handler';
import generateToken from '../../Utils/gernerateToken.js';
import User from '../models/userModel.js';





// @description Auth user/setTokenn
// router POST/api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid Email or Password")
    }

})

// @description Register new user
// router POST/api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})


// @description LogOutUser user
// router POST/api/users/Logout
// @access public
const LogOutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,

        expires: new Date(0)
    })

    res.status(200).json({ message: "user is Log Out" })

})

// @description  GetUser profile
// router GET/api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user)
})

// @description Update user profile
// router PUT/api/users/profile
// @access private
const UpdateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByID(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.name = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })

    } else {
        res.status(404)
        throw new Error("user not found")
    }
})


export {
    authUser,
    registerUser,
    LogOutUser,
    getUserProfile,
    UpdateUserProfile

}