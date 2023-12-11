import express, { Application } from 'express';
import routesProduct from './routes/provider';
import routesUser from './routes/user';
import User from './models/User';

import bodyParser from 'body-parser';
import uuidMiddleware from './middleware/uuidMiddleware';
import Service from './models/Service';
import Administrator from './models/Administrator';
import Provider from './models/Provider';
import Consumer from './models/Consumer';
import Publication from './models/Publication';
import Task from './models/Task';
import Work from './models/Work';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3300';
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
        this.app.use(uuidMiddleware);
    }

    routes() {        
        this.app.use('/api/providers', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    async dbConnect() {
        try {
            await User.sync({ alter: true });
            await Administrator.sync({ alter: true });
            await Provider.sync({ alter: true });
            await Consumer.sync({ alter: true });
            await Service.sync({ alter: true });
            await Publication.sync({ alter: true });
            await Task.sync({ alter: true });
            await Work.sync({ alter: true });
        } catch (error) {
            console.log(error);
            console.log('Error connection in database');
        }
    }
}

export default Server;