import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/Webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express'; // for authentication of requests
import connectCloudinary from './configs/cloudinary.js';


//intialize express
const app = express()

//connect to database
await connectDB();
await connectCloudinary();

//middleware
app.use(cors());
app.use(clerkMiddleware())

//routes
app.get('/',(req,res)=> res.send("api working"));

app.post('/clerk', express.json(), clerkWebhooks);

app.use('/api/educator', express.json(), educatorRouter)

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

