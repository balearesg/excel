import { Excel } from '../../../../library/modules/excel/ts'

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    it("debería lanzar un error si los parámetros de create no son un objeto", async () => {
        return expect(async () => {
            const params: any = null
            await excel.create(params);
        }).rejects.toThrow("invalid params, this is invalid");
    });

    it("debería lanzar un error si pathname es inválido en create", async () => {
        const params: any = { pathname: 123 };
        await expect(excel.create(params)).rejects.toThrow(
            "invalid pathname, this is not string"
        );
    });

    it("debería lanzar un error si filename es inválido en create", async () => {
        const params: any = { filename: 123, pathname: "/test" };
        await expect(excel.create(params)).rejects.toThrow(
            "invalid filename, this is not string"
        );
    });

    it("debería lanzar un error si sheetData es inválido en create", async () => {
        const params: any = {
            sheetData: "invalid",
            pathname: "/test",
            filename: "test",
        };
        await expect(excel.create(params)).rejects.toThrow(
            "invalid sheetData, this is not object"
        );
    });

    it('debería lanzar un error si el tipo de archivo es incorrecto en create', async () => {
        const params: any = {
            pathname: 'test/',
            options: {},
            filename: 'test.csv',
            sheetData: [],
            type: 'invalid',
        };

        await expect(excel.create(params)).rejects.toThrow('Type must be xlsx or csv');
    });

    it("debería lanzar un error si sheetName es inválido en create", async () => {
        const params: any = {
            sheetData: [{ sheetName: 123 }],
            pathname: "/test",
            filename: "test.xlsx",
            type: 'xlsx',
        };
        try {
            await excel.create(params);
        } catch (error) {

            expect(error).toThrow(
                "invalid sheetName in sheetData, this is not string"
            );
        }
    });

    it("debería lanzar un error si data es inválido en create", async () => {
        const params: any = {
            sheetData: [{ data: "invalid", sheetName: "hoja" }],
            pathname: "/test",
            filename: "test.xlsx",
            type: 'xlsx',
        };
        try {
            await excel.create(params);
        } catch (error) {
            console.log(error); // Agregar esta línea para imprimir el error
            expect(error).toThrow(
                "invalid data in sheetData, this is not array or data without content"
            );
        }
    });

});
