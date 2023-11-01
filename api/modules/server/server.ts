import * as express from "express";
import { Server as ServerHttp } from "http";
import { Router, Express, Response, Request, NextFunction } from "express";
import { Connections } from "./connections";
import config from "@excel/api/config";

export class Server {
    #instance: ServerHttp | undefined;
    #connections: Connections | undefined;
    #app: Express | undefined;
    #port: number = 1080;
    #router: Router | undefined;
    #modules: string[] = config.params.modules;
    #controllers: Map<string, any> = new Map();

    constructor() {
        this.start();
    }

    #base() { }

    #setHeader() {
        if (!this.#app) return;
        this.#app.use(
            (req: Request, res: Response, next: NextFunction): void => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
                );
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET, POST, OPTIONS, PUT, DELETE"
                );
                res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
                next();
            }
        );
    }

    start = async (): Promise<void> => {
        try {
            this.#app = express();
            this.#app.use(express.json());
            this.#app.use(express.static("files"));

            this.#setHeader();
            this.#router = express.Router();
            const promises = this.#modules.map((item) =>
                (<any>globalThis).bimport(`@excel/api/${item}`)
            );
            const controllers = await Promise.all(promises);

            controllers.forEach(({ Controller, hmr }) => {
                if (!Controller)
                    throw new Error("the module is not correctly configured");
                let controller = new Controller(this.#router, this.#app);
                hmr.on("change", this.restart);
                this.#controllers.set(controller.id, { controller, hmr });
            });

            this.#instance = this.#app.listen(this.#port, this.#base);

            this.#connections = new Connections(this.#instance);

            console.log("start api excel");

        } catch (exc) {
            console.error("Error", exc);
        }
    };

    restart(): void {
        if (!this.#connections || !this.#instance) return;
        this.#connections.destroy();
        this.#instance.close(() => {
            this.#controllers.forEach(({ hmr }) =>
                hmr.off("change", this.restart)
            );
            this.start();
        });
    }
}
