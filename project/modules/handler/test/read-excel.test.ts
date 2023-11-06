import { ExcelHandler } from "../ts/index";
import * as Excel from "exceljs";

describe("ExcelHandler", () => {
    let excelHandler;

    beforeEach(() => {
        excelHandler = new ExcelHandler();
    });

    describe('readExcel', () => {

        it('debería leer un archivo Excel xlsx correctamente con readExcel', async () => {
            const filePath = './assets/test.xlsx';
            const params: any = { filePath, type: 'xlsx' };

            const result = await excelHandler.readExcel(params);

            expect(result.status).toBe(true);

        });

        it('debería lanzar un error si el tipo de archivo es incorrecto en readExcel', async () => {
            const filePath = './assets/test.csv';
            const params: any = { filePath, type: 'invalid' };

            await expect(excelHandler.readExcel(params)).rejects.toThrow('Type must be xlsx or csv');
        });



        it('debería leer un archivo Excel xlsx válido con validación de celdas y columnas', async () => {
            const filePath = './assets/test.xlsx'; // Ruta al archivo Excel xlsx válido
            const params = {
                filePath,
                type: 'xlsx',
                cellsValidations: {
                    columnValidations: [
                        {
                            sheetName: 'Hoja1',
                            columnKey: 'Nombre',
                            dataType: 'string',
                        },
                        {
                            sheetName: 'Hoja1',
                            columnKey: 'Edad',
                            dataType: 'number',
                        },
                    ],
                },
            };
            const result = await excelHandler.readExcel(params);
            expect(result.status).toBe(true);
            // Agregar más comprobaciones según sea necesario
        });

        it('debería manejar un error al leer un excel con celdas y columnas no válidas', async () => {
            const filePath = './assets/test.xlsx'; // Ruta al archivo Excel xlsx inválido
            const params = {
                filePath,
                type: 'xlsx',
                cellsValidations: {
                    columnValidations: [
                        {
                            sheetName: 'Hoja1',
                            columnKey: 'name',
                            dataType: 'string',
                        },
                        {
                            sheetName: 'Hoja1',
                            columnKey: 'age',
                            dataType: 'number',
                        },
                    ],
                },
            };
            const result = await excelHandler.readExcel(params);
            expect(result.status).toBe(false);
            // Agregar más comprobaciones según sea necesario
        });

        // Agregar más pruebas para readExcel
    });



});
