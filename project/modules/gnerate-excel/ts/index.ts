import { Request, Response, Application } from "express";
import { ExcelHandler } from "./excel-handler";

export /*bundle*/
  class Controller {
  #router;

  constructor(router: any, app: Application) {
    this.#router = router;
    this.#router.post("/generate/excel", this.generateExcel);
    app.use(this.#router);
  }

  generateExcel = async (req: Request, res: Response) => {
    try {
      const excelHandler = new ExcelHandler();
      const params: any = req.body;

      if (!params?.sheetData)
        throw "invalid sheetData, this is required";

      if (!params?.filename)
        throw "invalid filename, this is required";

      const sheetData = params.sheetData;

      const filename = params.filename;
      const pathname = '/files';
      const options = params.options ?? {}
      const specs = {
        sheetData,
        options,
        pathname,
        filename,
      };

      // Crea el archivo Excel
      const result = await excelHandler.createExcel(specs);

      if (!result.status) throw new Error(result.error);

      return res.status(200).send({ status: true, data: { ...result.data } });

    } catch (error) {
      console.error("error", error);
      res.status(500).send({ status: false, error: `An error occurred: ${error}` });
    }
  };
}
