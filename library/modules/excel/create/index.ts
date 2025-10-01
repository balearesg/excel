import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import { Excel } from '..';
import {
	ICreateResultData,
	IInvalidRowDetail,
	IParamsExcel,
	IReturnHandler,
} from '../interfaces';

/***
    The `create` method is an asynchronous function that takes in an object `params` as a
   parameter. This method is responsible for creating Excel buffers based on the provided parameters. 
   * @param {IParamsExcel} params 
   * @returns {IReturnHandler} - object with status, data buffer, and invalid data structure
   */
export async function create(
	parent: Excel,
	params: IParamsExcel
): Promise<IReturnHandler> {
	let errors = [];

	const { pathname, options, filename, sheetData, type } = params;

	const types = ['xlsx', 'csv'];

	if (!types.includes(type)) throw new Error(`Type must be xlsx or csv`);

	const fileExtension = filename.slice(
		((filename.lastIndexOf('.') - 1) >>> 0) + 2
	);

	if (!fileExtension)
		throw new Error(`The filename does not have an extension`);

	if (!types.includes(fileExtension))
		throw new Error(`The file extension must be csv or xlsx in filename`);

	if (fileExtension !== type)
		throw new Error(
			`The file extension in filename must be equal to the parameter type`
		);

	const outputPath = pathname;
	// Verifica y crea el directorio si no existe
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath, { recursive: true });
	}

	try {
		// Create main workbook for valid data
		parent.workbook = new ExcelJS.Workbook();
		parent.workbook.views = [
			{
				x: 0,
				y: 0,
				width: 10000,
				height: 20000,
				firstSheet: 0,
				activeTab: 1,
				visibility: 'visible',
			},
		];

		// Create error workbook for invalid data
		const errorWorkbook = new ExcelJS.Workbook();
		errorWorkbook.views = [
			{
				x: 0,
				y: 0,
				width: 10000,
				height: 20000,
				firstSheet: 0,
				activeTab: 1,
				visibility: 'visible',
			},
		];

		const invalidItems: IInvalidRowDetail[] = [];
		let hasInvalidData = false;

		for (const sheet of sheetData) {
			const { sheetName, data, columnsHeader, schema } = sheet;

			// Create main worksheet
			const worksheet: ExcelJS.Worksheet =
				parent.workbook.addWorksheet(sheetName);
			worksheet.state = 'visible';
			worksheet.name = sheetName;

			const errorWorksheet: ExcelJS.Worksheet =
				errorWorkbook.addWorksheet(sheetName);
			errorWorksheet.state = 'visible';
			errorWorksheet.name = sheetName;

			if (
				!!columnsHeader &&
				!!Array.isArray(columnsHeader) &&
				!!columnsHeader.length
			) {
				worksheet.columns = columnsHeader;
				errorWorksheet.columns = columnsHeader;
			}

			data.forEach((item: object): void => {
				if (schema) {
					const validationResult = schema.safeParse(item);

					if (validationResult.success) {
						worksheet.addRow(item);
					} else {
						errorWorksheet.addRow(item);
						hasInvalidData = true;

						const errorDetails = validationResult.error.issues
							.map(
								issue =>
									`${issue.path.join('.')}: ${issue.message}`
							)
							.join('; ');

						invalidItems.push({
							item,
							error: errorDetails,
						});
					}
				} else {
					worksheet.addRow(item);
				}
			});

			worksheet.addRow([]);
			errorWorksheet.addRow([]);
		}

		// Generate buffers
		const mainFileBuffer = await parent.workbook.xlsx.writeBuffer();

		let errorFileBuffer: ExcelJS.Buffer | undefined;
		if (hasInvalidData) {
			errorFileBuffer = await errorWorkbook.xlsx.writeBuffer();
		}

		const resultData: ICreateResultData = {
			data: mainFileBuffer,
			invalid: {
				report: errorFileBuffer || Buffer.alloc(0), // Empty buffer if no invalid data
				items: invalidItems,
			},
		};
		return { status: true, data: resultData };
	} catch (error: any) {
		return { status: false, error: errors.length ? errors : error };
	}
}
