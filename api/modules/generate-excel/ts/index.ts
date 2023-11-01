import { Request, Response, Application, Router } from "express";
import { ExcelHandler } from "@bg/excel/handler";
import { IReturnHandler } from "./excel-handler/types";

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
      const excelHandler: ExcelHandler = new ExcelHandler();
      const params = req.body;

      if (!params?.sheetData) throw "invalid sheetData, this is required";

      if (!params?.filename) throw "invalid filename, this is required";

      const sheetData = params.sheetData;

      const filename = params.filename;
      const pathname = "/files";
      const options = params.options ?? {};
      const specs = {
        sheetData,
        options,
        pathname,
        filename,
      };

      // Crea el archivo Excel
      const result: IReturnHandler = await excelHandler.createExcel(
        specs
      );

      if (!result.status) throw new Error(result.error);

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
