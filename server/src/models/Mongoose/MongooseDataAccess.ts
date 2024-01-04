import {Connection,  Query, Schema, UpdateWriteOpResult} from "mongoose";
import { IDataAccessLayer, DataBaseModel } from "../IDataAccessLayer";

const mongoose = require('mongoose')

interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}
class MongooseDataAccess implements IDataAccessLayer{

    private connection? : Connection
    
    async connect(url: string, databaseName: string): Promise<void> {
        this.connection = await mongoose.connect(`${url}${databaseName}`, {});
    }

    async disconnect(): Promise<void> {
        if (this.connection){
            await this.connection.close()
        } 
    }
    getModel<T>(name: string, schema: Schema<T>): DataBaseModel<T> {
        if (!this.connection)
        {
            throw new Error("Not connected to database")
        }
        return this.connection.model<T>(name, schema)
    }
    find<T>(model: DataBaseModel<T>, conditions: Record<string, any>): Query<T[] | null, T, {}> {
        return model.find(conditions)
    }

    insertMany<T>(model: DataBaseModel<T>, documents: T[]): Promise<T[]> {
        return model.insertMany(documents)
    }

    updateMany<T>(model: DataBaseModel<T>, filter: Record<string, any>, data: Record<string, any>): Query<UpdateWriteOpResult, T> {
        return model.updateMany(filter, data)
    }
    
    deleteMany<T>(model: DataBaseModel<T>, filter: Record<string, any>): Query<DeleteResult, T>{
        return model.deleteMany(filter)
    }
}

export const dataAccessLayer: IDataAccessLayer = new MongooseDataAccess();