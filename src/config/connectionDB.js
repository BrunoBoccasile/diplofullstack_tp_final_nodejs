import mongoose from "mongoose";
import ENVIRONMENT from "./environment.js";

async function connectDB() {
    console.log(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
        console.log('Conectado a la DB')
    } catch (error) {
        console.log('Error al conectar a la DB')
        console.log(error)
    }
}

export default connectDB;