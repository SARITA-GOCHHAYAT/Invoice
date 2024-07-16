
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
import { UserRouter } from './routes/user.js'

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')


app.listen(process.env.PORT, () => {
  console.log("server is Running")
})
