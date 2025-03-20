import mongoose from 'mongoose'
import 'dotenv/config'


const connectDB = async () => {
  try {
    // Get the URI from the environment variable and append the database name
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`)   
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log('Error: ', error);
    process.exit(1);  // exit the process if connection fails
  }
}

  export default connectDB 