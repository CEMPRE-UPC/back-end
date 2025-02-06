import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';

import path from 'path';
import fs from 'fs';


const swaggerPath = path.resolve(process.cwd(), 'src/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
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
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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