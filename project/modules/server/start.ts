import { Server } from "./server";

new (class {
    #server;

    constructor() {
        this.start();
    }

    start() {

        this.#server = new Server(this);


    }
})();

