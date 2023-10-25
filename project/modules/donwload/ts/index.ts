import { Request, Response, Application } from "express";
import * as fs from "fs";

export /*bundle*/
  class Controller {
  #router;

  constructor(router: any, app: Application) {
    this.#router = router;
    this.#router.get("/download", this.download)
    app.use(this.#router);
  }

  download = async (req: Request, res: Response) => {
    const params: any = req.query;

    try {

      if (!params?.pathFile) throw "invalids pathFile, this is required";
      if (!params?.filename) throw "invalids pathFile, this is required";


      if (!fs.existsSync(params.pathFile)) {
        res.status(404).send("File not found");
        return;
      }

      res.download(params.pathFile, params.filename, (err) => {
        if (err) {
          res.status(500).send(`Error al descargar el archivo: ${err}`);
          return;
        };
        // Elimina el archivo después de la descarga
        fs.unlink(params.pathFile, (err) => {
          if (err) {
            const error = `Error al eliminar el archivo: ${err}`
            console.error(error);
            res.status(500).send(error);
          }
        });

      });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Error al descargar el archivo: ${error}`);
    }
  };


}
