import {connect} from "mongoose";

export const connectDatabase = async() => {
    await connect("mongodb://127.0.0.1:27017/Links" );
    console.log("Database connected")
}