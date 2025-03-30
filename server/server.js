import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'

//intialize express
const app = express()

//connect to database
await connectDB();

//middleware
app.use(cors());

//routes
app.get('/',(req,res)=> res.send("api working"));

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>
{
    console.log(`server is running on port ${PORT}`);
})

