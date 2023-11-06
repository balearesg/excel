import { Excel } from "../ts/index";

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    describe('read', () => {

        it('debería leer un archivo Excel xlsx correctamente con readExcel', async () => {
            const filePath = './assets/test.xlsx';
            const params: any = { filePath, type: 'xlsx' };

            const result = await excel.read(params);

            expect(result.status).toBe(true);

        });

        it('debería lanzar un error si el tipo de archivo es incorrecto en read', async () => {
            const filePath = './assets/test.csv';
            const params: any = { filePath, type: 'invalid' };

            await expect(excel.read(params)).rejects.toThrow('Type must be xlsx or csv');
        });



        it('debería leer un archivo Excel xlsx válido con validación de celdas y columnas', async () => {
            const filePath = './assets/test.xlsx'; // Ruta al archivo Excel xlsx válido
            const params: any = {
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
            const result = await excel.read(params);
            expect(result.status).toBe(true);

        });

        it('debería manejar un error al leer un excel con celdas y columnas no válidas', async () => {
            const filePath = './assets/test.xlsx'; // Ruta al archivo Excel xlsx inválido
            const params: any = {
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
            const result = await excel.read(params);
            expect(result.status).toBe(false);

        });
    });



});
