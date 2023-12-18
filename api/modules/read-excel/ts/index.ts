import { Request, Response, Application, Router } from "express";
import { Excel } from "@bgroup/excel/excel";
import { IReturnRead } from "./types";
import * as path from "path";
export /*bundle*/
  class Controller {
  #router: Router | undefined;

  constructor(router: Router, app: Application) {
    this.#router = router;
    this.#router.post("/read/excel", this.readExcel);
    app.use(this.#router);
  }

  readExcel = async (
    req: Request,
    res: Response
  ): Promise<Response<IReturnRead, Record<string, IReturnRead>>> => {
    try {
      const excel: Excel = new Excel();
      const params = req.body;

      const specs: any = {
        filePath: path.join(__dirname, params.filePath ?? "static/test.csv"),
        validations: params.validations ?? null,
        type: params.type,
        sheet: params.sheet
      };

      // Crea el archivo Excel
      const result: IReturnRead = await excel.read(
        specs
      );
      if (!result.status && Array.isArray(result.error))
        return res.status(500).send({
          status: false,
          error: result.error,
        });
      if (!result.status) throw new Error(result.error.toString());

      return res
        .status(200)
        .send({ status: true, data: result.data });
    } catch (error) {
      console.error("error", error);
      return res.status(500).send({
        status: false,
        error: `An error occurred: ${error}`,
      });
    }
  };
}
