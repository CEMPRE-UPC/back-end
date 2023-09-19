import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.route';

import db from "../db/connection"


export class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.app.disable('x-powered-by'); // Hide X-Powered-By: Express
        this.port = process.env.PORT || '1234';


        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {
            await db.sync();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }


    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        })
    }
}