import express, { Router } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    private readonly app = express();

    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {

        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        
        // Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( cors() )

          // Fileupload - Carga de archivos
          this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        
        this.app.use( this.routes )

        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}