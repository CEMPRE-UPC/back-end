import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    database: string;

}

export class MongoDatabase {

    static async connect(options: Options) {

        const { mongoUrl, database } = options;

        try {
 
            await mongoose.connect(mongoUrl, {
                dbName: database,
            })

            console.log('MongoDB connected');
            
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

}