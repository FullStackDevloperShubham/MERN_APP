import Jwt from "jsonwebtoken";

const generateToken = (res, userID) => {

    const token = Jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })


    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 60 * 24 * 60 * 1000,
    })


}

export default generateToken;