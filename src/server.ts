import express, { Application } from 'express';
import routesProduct from './routes/provider';
import routesUser from './routes/user';
import Product from './models/Provider';
import User from './models/User';

import bodyParser from 'body-parser';

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
        this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    routes() {        
        this.app.use('/api/providers', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    async dbConnect() {
        try {
            await User.sync({ alter: true });
            await Product.sync({ alter: true });
        } catch (error) {
            console.log(error);
            console.log('Error connection in database');
        }
    }
}

export default Server;