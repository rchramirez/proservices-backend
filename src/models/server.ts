import express, { Application, Request, Response } from 'express';
import routesProducto from '../routes/producto';
import routesUser from '../routes/user';
import Producto from './Producto';
import User from './User';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application run in port ${this.port}`);
        });
    }

    middlewares() {
        // Parseamos el body
        this.app.use(express.json());
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })
        });
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/users', routesUser);
    }

    async dbConnect() {
        try {
            // This only test connection
            //await db.authenticate();
            await Producto.sync({ alter: true });
            await User.sync({ alter: true });
        } catch (error) {
            console.log(error);
            console.log('Error connection in database');
        }
    }

}

export default Server;