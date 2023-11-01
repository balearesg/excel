import { Server } from "./server";

new (class {
    #server: Server | undefined;

    constructor() {
        this.start();
    }

    start() {
        this.#server = new Server();
    }
})();
