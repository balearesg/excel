import { Excel } from '../../../../library/modules/excel/ts';

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    describe('read', () => {

        it('debería leer un archivo Excel xlsx correctamente con read', async () => {
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
            const filePath = './assets/test.xlsx';
            const params: any = {
                filePath,
                type: 'xlsx',
                cells: {
                    columns: [
                        {
                            sheet: 'Hoja1',
                            key: 'Nombre',
                            type: 'string',
                        },
                        {
                            sheet: 'Hoja1',
                            key: 'Edad',
                            type: 'number',
                        },
                    ],
                },
            };
            const result = await excel.read(params);
            expect(result.status).toBe(true);

        });

        it('debería manejar un error al leer un excel con celdas y columnas no válidas', async () => {
            const filePath = './assets/test.xlsx';
            const params: any = {
                filePath,
                type: 'xlsx',
                validations: {
                    columns: [
                        {
                            sheet: 'Hoja1',
                            key: 'name',
                            type: 'string',
                        },
                        {
                            sheet: 'Hoja1',
                            key: 'age',
                            type: 'number',
                        },
                    ],
                },
            };
            const result = await excel.read(params);
            expect(result.status).toBe(false);

        });
    });

});
