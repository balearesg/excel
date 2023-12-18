import { Excel } from '../../../../library/modules/excel/ts'

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    it("debería lanzar un error si filePath no tiene extensión", async () => {
        const filePath = './assets/test';
        const params: any = { filePath, type: 'xlsx' };

        await expect(excel.read(params)).rejects.toThrow(
            "The filePath does not have an extension"
        );
    });

    it("debería lanzar un error si la extesion de filePath no es csv o xlsx", async () => {
        const filePath = './assets/test.txt';
        const params: any = { filePath, type: 'xlsx' };
        await expect(excel.read(params)).rejects.toThrow(
            "The file extension must be csv or xlsx in filePath"
        );
    });

    it("debería lanzar un error si la extesion de filePath no es igual al del parametro type", async () => {
        const filePath = './assets/test.xlsx';
        const params: any = { filePath, type: 'csv' };
        await expect(excel.read(params)).rejects.toThrow(
            "The file extension in filePath must be equal to the parameter type"
        );
    });
});
