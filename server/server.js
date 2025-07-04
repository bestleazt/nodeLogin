import express from "express";
import cors from 'cors';
import morgan from "morgan";
import authRoute from "./routes/auth.route.js"
const app = express();

// Middlewares 
app.use(cors()) // Allows other server or domain 
app.use(morgan('dev'))
app.use(express.json())


//Routing
app.use("/auth",authRoute);


// Error handing
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.code || 500).json({
        message:err.message || "Something Wrong !!!"
    })
})


app.listen(8000,()=> console.log('connect success !!!'));