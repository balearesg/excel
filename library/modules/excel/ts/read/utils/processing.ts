import { z } from 'zod';
import { IInvalidRowDetail, ISheet } from '../../interfaces';
import { validateDataItem } from './validation';

/**
 * Processes single sheet data with Zod schema validation
 * @param rawData - Raw data from the sheet
 * @param schema - Zod schema for validation
 * @returns Processed data with valid items and invalid rows
 */
export function processSingleSheetData(
	rawData: object[],
	schema: z.ZodSchema
): { validData: object[]; invalidRows: IInvalidRowDetail[] } {
	const validData: object[] = [];
	const invalidRows: IInvalidRowDetail[] = [];

	rawData.forEach((item: object) => {
		const validation = validateDataItem(item, schema);

		if (validation.isValid) {
			validData.push(item);
		} else {
			invalidRows.push({
				item,
				error: validation.error!,
			});
		}
	});

	return { validData, invalidRows };
}

/**
 * Processes multiple sheets data with Zod schema validation
 * @param rawData - Raw data from all sheets
 * @param schema - Zod schema for validation
 * @returns Processed data with valid items and invalid rows separated by sheet
 */
export function processMultipleSheetsData(
	rawData: ISheet,
	schema: z.ZodSchema
): {
	processedSheets: ISheet;
	invalidRowsBySheet: Record<string, IInvalidRowDetail[]>;
} {
	const processedSheets: ISheet = {};
	const invalidRowsBySheet: Record<string, IInvalidRowDetail[]> = {};

	for (const [sheetName, sheetData] of Object.entries(rawData)) {
		const sheetValidData: any[][] = [];
		const sheetInvalidRows: IInvalidRowDetail[] = [];

		sheetData.forEach((row: any[]) => {
			const validation = validateDataItem(row, schema);

			if (validation.isValid) {
				sheetValidData.push(row);
			} else {
				sheetInvalidRows.push({
					item: row,
					error: validation.error!,
				});
			}
		});

		processedSheets[sheetName] = sheetValidData;

		// Only add sheet to invalidRowsBySheet if it has invalid rows
		if (sheetInvalidRows.length > 0) {
			invalidRowsBySheet[sheetName] = sheetInvalidRows;
		}
	}

	return { processedSheets, invalidRowsBySheet };
}
