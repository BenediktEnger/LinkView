import { Document, Model, Schema, Query, UpdateWriteOpResult } from "mongoose";

export interface DataBaseModel<T> extends Model<T> {};

export interface IDataAccessLayer {
    connect(url: string, databaseName: string): Promise<void>;
    disconnect(): Promise<void>;
    getModel<T>(name: string, schema: Schema): DataBaseModel<T>;
    find<T>(model: DataBaseModel<T>, conditions: Record<string, any>): Query<T[] | null, T, {}>; 
    insertMany<T>(model: DataBaseModel<T>, documents: T[]): Promise<T[]>;
    updateMany<T>(model: DataBaseModel<T>, filter: Record<string, any>, data: Record<string, any>): Query<UpdateWriteOpResult, T>;
    deleteMany<T>(model: DataBaseModel<T>, filter: Record<string, any>): {};
}