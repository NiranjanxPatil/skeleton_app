import mongoose from "mongoose";

export async function connect() {

    // code to connect project with database with trychatch method 
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err) =>{
            console.log('MongoDB connection error. please make sure MongoDB is runninig. '+ err);
            process.exit();
        })
        
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
        
    }
    
}