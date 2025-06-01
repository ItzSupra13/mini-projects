//Db connections may not always go through always exprecterrors and use try catch
//databases are always from a different continent (or atleast consider that) so remember using async await
import mongoose from "mongoose";
import { DBNAME } from "../constants.js";


const connectDB = async () => {
    try {
        let connectioninstance = await mongoose.connect(`${process.env.MONGO}/${DBNAME}`);
        //console.log("MongoDB connected BABY!", `${connectioninstance.connection.host}:${connectioninstance.connection.port}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;