import * as express from 'express';
import { Connections } from './connections';
import config from '@bg/excel/config';

export class Server {
    #instance;
    #connections;
    #app;
    #port = 1080;
    #router;
    #modules = config.params.modules;
    #controllers = new Map();
    #initializer;

    constructor(initializer) {
        this.start();
        this.#initializer = initializer;
    }

    #base() { }

    #setHeader() {
        this.#app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    onChange = () => {
        this.restart();
    };

    start = async () => {
        try {
            this.#app = express();
            this.#app.use(express.json());
            this.#app.use(express.static('files'));

            this.#setHeader();
            this.#router = express.Router();
            const promises = this.#modules.map(item => globalThis.bimport(`@bg/excel/${item}`));
            const controllers = await Promise.all(promises);

            controllers.forEach(({ Controller, hmr }) => {
                if (!Controller) throw new Error('the module is not correctly configured');
                let controller = new Controller(this.#router, this.#app);
                hmr.on('change', this.onChange);
                this.#controllers.set(controller.id, { controller, hmr });
            });

            this.#instance = this.#app.listen(this.#port, this.#base);

            this.#connections = new Connections(this.#instance);
        } catch (exc) {
            console.error('Error', exc);
        }
    };

    restart() {
        this.#connections.destroy();
        this.#instance.close(() => {
            this.#controllers.forEach(({ hmr }) => hmr.off('change', this.onChange));
            this.start();
        });
    }
}
