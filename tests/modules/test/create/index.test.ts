import { Excel } from '../../../../library/modules/excel/ts'

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    it("debería crear una instancia de ExcelHandler", () => {
        expect(excel).toBeInstanceOf(Excel);
    });


    it("debería crear un archivo Excel xlsx exitosamente", async () => {
        const params: any = {
            pathname: "test/",
            filename: "test.xlsx",
            sheetData: [
                {
                    sheetName: "Hoja1",
                    columnsHeader: [
                        { header: "Nombre", key: "name" },
                        { header: "Edad", key: "age" },
                    ],
                    data: [
                        { name: "Juan", age: 25 },
                        { name: "María", age: 30 },
                    ],
                },
            ],
            type: 'xlsx',
        };
        const result = await excel.create(params);
        expect(result.status).toBe(true);
    });

    it("debería crear un archivo Excel xlsx exitosamente", async () => {
        const params: any = {
            pathname: "test/",
            filename: "test.csv",
            sheetData: [
                {
                    sheetName: "Hoja1",
                    columnsHeader: [
                        { header: "Nombre", key: "name" },
                        { header: "Edad", key: "age" },
                    ],
                    data: [
                        { name: "Juan", age: 25 },
                        { name: "María", age: 30 },
                    ],
                },
            ],
            type: 'csv',
        };
        const result = await excel.create(params);
        expect(result.status).toBe(true);
    });


});
