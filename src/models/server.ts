import express, { Application, Request, Response } from 'express';
import routesProducto from '../middleware/producto';
import db from '../config/db';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application run in port ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })
        })
        this.app.use('/api/productos', routesProducto)
    }

    middlewares() {
        // Parseamos el body
        this.app.use(express.json());
    }
    
}

export default Server;