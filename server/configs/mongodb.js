// here we are creating the function to connect our project with mongo db
import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', ()=>{
        console.log('Database connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/edTech`);
}

export default connectDB;