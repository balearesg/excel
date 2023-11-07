import { Request, Response, Application, Router } from "express";
import { Excel } from "@bg/excel/excel";
import { IReturnHandler } from "./types";
export /*bundle*/
  class Controller {
  #router: Router | undefined;

  constructor(router: Router, app: Application) {
    this.#router = router;
    this.#router.post("/generate/excel", this.generateExcel);
    app.use(this.#router);
  }

  generateExcel = async (
    req: Request,
    res: Response
  ): Promise<Response<IReturnHandler, Record<string, IReturnHandler>>> => {
    try {
      const excel: Excel = new Excel();
      const params = req.body;

      // if (!params?.sheetData) throw "invalid sheetData, this is required";

      // if (!params?.filename) throw "invalid filename, this is required";

      // if (!params?.type) throw "invalid type, this is required";


      const sheetData = params.sheetData;

      const filename = params.filename;
      const pathname = "/files";
      const options = params.options ?? {};
      const specs = {
        sheetData,
        options,
        pathname,
        filename,
        type: params.type
      };

      // Crea el archivo Excel
      const result: IReturnHandler = await excel.create(
        specs
      );
      console.log("result", result)
      if (!result.status && Array.isArray(result.error))
        return res.status(500).send({
          status: false,
          error: result.error,
        });
      if (!result.status) throw new Error(result.error.toString());

      return res
        .status(200)
        .send({ status: true, data: { ...result.data } });
    } catch (error) {
      console.error("error", error);
      return res.status(500).send({
        status: false,
        error: `An error occurred: ${error}`,
      });
    }
  };
}
