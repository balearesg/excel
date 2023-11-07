import { Excel } from '../../../../library/modules/excel/ts'

describe("Excel", () => {
    let excel: Excel;

    beforeEach(() => {
        excel = new Excel();
    });

    it("debería lanzar un error si filename no tiene extensión", async () => {
        const params: any = {
            pathname: "test/",
            options: {},
            filename: "test",
            sheetData: [],
            type: "csv",
        };

        await expect(excel.create(params)).rejects.toThrow(
            "The filename does not have an extension"
        );
    });

    it("debería lanzar un error si la extesion de filename no es csv o xlsx", async () => {
        const params: any = {
            pathname: "test/",
            options: {},
            filename: "test.txt",
            sheetData: [],
            type: "csv",
        };

        await expect(excel.create(params)).rejects.toThrow(
            "The file extension must be csv or xlsx in filename"
        );
    });

    it("debería lanzar un error si la extesion de filename no es igual al del parametro type", async () => {
        const params: any = {
            pathname: "test/",
            options: {},
            filename: "test.xlsx",
            sheetData: [],
            type: "csv",
        };

        await expect(excel.create(params)).rejects.toThrow(
            "The file extension in filename must be equal to the parameter type"
        );
    });
});
