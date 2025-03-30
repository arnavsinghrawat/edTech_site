import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './models/Webhooks.js'

//intialize express
const app = express()

//connect to database
await connectDB();

//middleware
app.use(cors());

//routes
app.get('/',(req,res)=> res.send("api working"));

app.post('/clerk', express.json(), clerkWebhooks)
/*
How It Works
Client (Clerk) sends a POST request
Clerk will send webhook events (e.g., user.created, user.updated) to http://yourserver.com/clerk.
The request body will contain user data in JSON format.
Express Middleware (express.json())
Converts the raw JSON request body into a JavaScript object, so it can be accessed inside clerkWebhooks.
The clerkWebhooks function is called
The parsed JSON data is passed to clerkWebhooks, which verifies the webhook, extracts user details, and updates the database.
*/

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>
{
    console.log(`server is running on port ${PORT}`);
})

