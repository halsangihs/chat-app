import express from 'express'
import {signup, login} from '../controllers/handleUser.js'

export const router=express.Router()

router.get("/signup",(req,res)=>{
    res.status(200).send("signup page")
})

router.post("/signup",signup)

router.post("/signup",(req,res)=>{
    res.status(200).send("signup page")
})

router.get("/login",(req,res)=>{
   res.status(200).send("login page")
})

router.post("/login",login)


