import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt"
import { createToken } from "../utils/token-manager.js";
import { COOKIE_DOMAIN, COOKIE_NAME, COOKIE_PATH } from "../utils/constants.js";

//get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        return res.status(200).json({ message: "OK", users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: error.message })
    }
}

//user signup
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: "User already registered!" })
        }
        const hashedPassword = await hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        //clear cookie, create new token and store new cookie
        res.clearCookie(COOKIE_NAME, {
            path: COOKIE_PATH,
            domain: COOKIE_DOMAIN,
            httpOnly: true,
            signed: true
        })
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: COOKIE_PATH,
            domain: COOKIE_DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(201).json({ message: "New user created!", id: user._id.toString() })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: error.message })
    }
}

//user login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "User not registered!" })
        }
        const isPasswordCorrect = await compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect password!" })
        }

        //clear cookie, create new token and store new cookie
        res.clearCookie(COOKIE_NAME, {
            path: COOKIE_PATH,
            domain: COOKIE_DOMAIN,
            httpOnly: true,
            signed: true
        })
        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: COOKIE_PATH,
            domain: COOKIE_DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({ message: "OK", id: user._id.toString() })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: error.message })
    }
}