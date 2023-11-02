import { ExcelHandler } from "../ts/index";
import * as Excel from "exceljs";

describe("ExcelHandler", () => {
    let excelHandler;

    beforeEach(() => {
        excelHandler = new ExcelHandler();
    });

    it("debería crear una instancia de ExcelHandler", () => {
        expect(excelHandler).toBeInstanceOf(ExcelHandler);
    });

    it("debería configurar las columnas del encabezado correctamente", () => {
        const columnsHeader = [
            { header: "Nombre", key: "name" },
            { header: "Edad", key: "age" },
        ];
        excelHandler.columnsHeader = columnsHeader;
        expect(excelHandler.columnsHeader).toEqual(columnsHeader);
    });

    it("debería configurar el libro de trabajo correctamente", () => {
        const workbook = new Excel.Workbook();
        excelHandler.workbook = workbook;
        expect(excelHandler.workbook).toEqual(workbook);
    });

    it("debería lanzar un error si los parámetros de createExcel no son un objeto", async () => {
        return expect(async () => {
            await excelHandler.createExcel(null);
        }).rejects.toThrow("invalid params, this is invalid");
    });

    it("debería lanzar un error si pathname es inválido en createExcel", async () => {
        const params = { pathname: 123 };
        await expect(excelHandler.createExcel(params)).rejects.toThrow(
            "invalid pathname, this is not string"
        );
    });

    it("debería lanzar un error si filename es inválido en createExcel", async () => {
        const params = { filename: 123, pathname: "/test" };
        await expect(excelHandler.createExcel(params)).rejects.toThrow(
            "invalid filename, this is not string"
        );
    });

    it("debería lanzar un error si sheetData es inválido en createExcel", async () => {
        const params = {
            sheetData: "invalid",
            pathname: "/test",
            filename: "test",
        };
        await expect(excelHandler.createExcel(params)).rejects.toThrow(
            "invalid sheetData, this is not object"
        );
    });

    it("debería lanzar un error si sheetName es inválido en createExcel", async () => {
        const params = {
            sheetData: [{ sheetName: 123 }],
            pathname: "/test",
            filename: "test",
        };
        try {
            await excelHandler.createExcel(params);
        } catch (error) {

            expect(error).toThrow(
                "invalid sheetName in sheetData, this is not string"
            );
        }
    });


    it("debería lanzar un error si data es inválido en createExcel", async () => {
        const params = {
            sheetData: [{ data: "invalid", sheetName: "hoja" }],
            pathname: "/test",
            filename: "test",
        };
        try {
            await excelHandler.createExcel(params);
        } catch (error) {
            console.log(error); // Agregar esta línea para imprimir el error
            expect(error).toThrow(
                "invalid data in sheetData, this is not array or data without content"
            );
        }
    });

    it("debería lanzar un error si columnsHeader es inválido en createExcel", async () => {
        const params = {
            sheetData: [
                {
                    columnsHeader: "invalid",
                    sheetName: "hoja",
                    data: [
                        { name: "Juan", age: 25 },
                        { name: "María", age: 30 },
                    ],
                },
            ],
            pathname: "/test",
            filename: "test",
        };
        try {
            await excelHandler.createExcel(params);
        } catch (error) {
            console.log(error); // Agregar esta línea para imprimir el error
            expect(error).toThrow(
                "invalid columnsHeader in sheetData, this is not array or columnsHeader without content"
            );
        }
    });


    it("debería crear un archivo Excel exitosamente", async () => {
        const params = {
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
        };
        const result = await excelHandler.createExcel(params);
        expect(result.status).toBe(true);
    });

    it("debería manejar un error al crear un archivo Excel", async () => {
        const params = { pathname: null, filename: null, sheetData: null };
        try {
            const result = await excelHandler.createExcel(params);
            expect(result.status).toBe(false);
            expect(result.error).toBeDefined();
        } catch (error) {

            expect(error.message).toMatch("invalid pathname, this is required");
        }
    });

    it("debería crear un archivo Excel con validaciones de columnas exitosamente", async () => {
        const params = {
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
                        { name: "Maria", age: 30 },
                    ],
                },
            ],
            cellsValidations: {
                columnValidations: [
                    {
                        sheetName: "Hoja1",
                        columnKey: "name",
                        dataType: "string",
                        regexPattern: "^[A-Za-z]+$",
                    },
                    {
                        sheetName: "Hoja1",
                        columnKey: "age",
                        dataType: "number",
                    },
                ],
            },
        };
        const result = await excelHandler.createExcel(params);
        expect(result.status).toBe(true);
    });

    it("debería manejar un error al crear un archivo Excel con validaciones de columnas", async () => {
        const params = {
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
                        { name: "María", age: "30" },
                    ],
                },
            ],
            cellsValidations: {
                columnValidations: [
                    {
                        sheetName: "Hoja1",
                        columnKey: "name",
                        dataType: "string",
                        regexPattern: "/^[A-Za-z]+$/",
                    },
                    {
                        sheetName: "Hoja1",
                        columnKey: "age",
                        dataType: "boolean", // Tipo de dato incorrecto
                    },
                ],
            }
        }

        const result = await excelHandler.createExcel(params);
        expect(result.status).toBe(false);


    });

    it("debería crear un archivo Excel con validaciones de rango exitosamente", async () => {
        const params = {
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
            cellsValidations: {
                cellRangeValidations: [
                    {
                        sheetName: "Hoja1",
                        startRow: 1,
                        endRow: 1,
                        startCol: 1,
                        endCol: 1,
                        dataType: "string",
                        regexPattern: "^[A-Za-z]+$",
                    },
                    {
                        sheetName: "Hoja1",
                        startRow: 2,
                        endRow: 2,
                        startCol: 2,
                        endCol: 2,
                        dataType: "number",
                    },
                ],
            },
        };
        const result = await excelHandler.createExcel(params);
        expect(result.status).toBe(true);
    });

    it("debería manejar un error al crear un archivo Excel con validaciones de rango", async () => {
        const params = {
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
            cellsValidations: {
                cellRangeValidations: [
                    {
                        sheetName: "Hoja1",
                        startRow: 2,
                        endRow: 2,
                        startCol: 1,
                        endCol: 1,
                        dataType: "boolean",
                        regexPattern: "/^[A-Za-z]+$/",
                    },
                    {
                        sheetName: "Hoja1",
                        startRow: 2,
                        endRow: 2,
                        startCol: 2,
                        endCol: 2,
                        dataType: "date", // Tipo de dato incorrecto
                    },
                ],
            }
        }

        const result = await excelHandler.createExcel(params);
        expect(result.status).toBe(false);


    });
});