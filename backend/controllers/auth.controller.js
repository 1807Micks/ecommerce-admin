import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {redis} from "../lib/redis.js"

const generateTokens = (userId)=> {
const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
})
const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
})
return{accessToken, refreshToken}
}

const storeRefreshToken = async(userId, refreshToken)=> {
    await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60) // Set expiration to 7 days
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true, //prevent xxs attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //prevents csrf attacks
        maxAge: 15 *60 * 1000 //15min
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, //prevent xxs attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //prevents csrf attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    })
}
export const signup = async(req, res)=> {
    const {email, password, name} = req.body
   try {
     const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({message: 'User already exists'})
    }
    const user = await User.create({email, name, password})

    //authentication
    const {accessToken, refreshToken} = generateTokens(user._id)
    await storeRefreshToken(user._id, refreshToken)

    setCookies(res, accessToken, refreshToken)
    
    res.status(201).json({user:{
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, message: "User created successfully"})
   } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({message: 'Internal server error'})
   }
}
export const logout = async(req, res)=> {
    res.send('Logout in route called')
}
export const login = async(req, res)=> {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    res.json({message: 'Login successful'})
}