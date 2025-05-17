import express, { urlencoded } from "express";
import { connectDB } from "./config/Config.js";
import cors from 'cors'
import producutRouter from './router/producutRouter.js'
 const app=express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: "*" }))


 connectDB()
 
 app.use('/',producutRouter)

app.listen(5000,()=>{
    console.log("backend qalxdi");
    
})