import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import UserModel from '../backend/models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt

    if (token) {

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')
            next()

        } catch (error) {
            res.status(404)
            throw new Error('Unauthorized Invalid Token')

        }





    } else {
        res.status(401)
        throw new Error('Unauthorized no token')
    }

})





export { protect } 