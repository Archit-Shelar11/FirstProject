import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import connectDB from "./configs/db.js"
import authRouter from './route/authRouter.js'
import testRouter from './route/testRouter.js'
import userRouter from './route/userRouter.js'
import cors from 'cors'
dotenv.config()

const port =process.env.PORT
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)  
app.use("/api/user",userRouter)
app.use('/api/test', testRouter)

app.get('/',(req,res)=>{
    res.send("hello from server")
})


app.listen(port,()=>{
    console.log(`server is Running on port ${port}`)
    connectDB()
})


