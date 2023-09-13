import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.route';



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

        this.middlewares();
        
        this.routes();
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