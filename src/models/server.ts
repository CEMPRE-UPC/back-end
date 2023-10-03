import express, { Application } from 'express';
import cors from 'cors';

import { authRouter, userRouter, studentRouter } from '../routes';

import db from "../db/connection"
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { uploadRouter } from '../routes/upload.router';


export class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        student: '/api/student',
        upload: '/api/upload'
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

        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRouter);
        this.app.use(this.apiPaths.auth, authRouter);
        this.app.use(this.apiPaths.student, studentRouter);
        this.app.use(this.apiPaths.upload, uploadRouter);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        })
    }
}