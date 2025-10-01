import * as ExcelJS from 'exceljs';
import { Excel } from '..';
import { IParamsRead, IReturnRead, ISheet } from '../interfaces';
import { allSheet } from './all-sheet';
import { readCSVFile } from './csv';
import { getSheet } from './sheet';
import {
	processMultipleSheetsData,
	processSingleSheetData,
} from './utils/processing';

export async function read(
	parent: Excel,
	params: IParamsRead
): Promise<IReturnRead> {
	try {
		const { buffer, schema, type, sheet } = params;

		// Handle CSV files
		if (type === 'csv') {
			return await readCSVFile(params);
		}

		// Load Excel workbook from buffer
		if (type === 'xlsx') {
			parent.workbook = new ExcelJS.Workbook();
			await parent.workbook.xlsx.load(buffer);
		}

		// Extract raw data from workbook
		const isSheet = !!sheet && typeof sheet === 'string';
		const rawData: ISheet | object[] = isSheet
			? getSheet(parent, sheet)
			: allSheet(parent);

		// If no schema provided, return raw data without validation
		if (!schema) {
			return {
				status: true,
				data: rawData,
				success: Object.values(rawData).flat().length,
				failure: 0,
			};
		}

		// Process data with Zod schema validation
		if (isSheet && Array.isArray(rawData)) {
			// Single sheet processing
			const { validData, invalidRows } = processSingleSheetData(
				rawData,
				schema
			);

			return {
				status: true,
				data: validData,
				invalidRows: invalidRows.length > 0 ? invalidRows : [],
				success: validData.length,
				failure: invalidRows.length,
			};
		} else if (!isSheet && typeof rawData === 'object') {
			// Multiple sheets processing
			const { processedSheets, invalidRowsBySheet } =
				processMultipleSheetsData(rawData as ISheet, schema);

			return {
				status: true,
				data: processedSheets,
				invalidRows: invalidRowsBySheet,
				success: Object.values(processedSheets).flat().length,
				failure: Object.keys(invalidRowsBySheet).length,
			};
		}

		// Fallback return
		return {
			status: true,
			data: rawData,
			success: Object.values(rawData).flat().length,
			failure: 0,
		};
	} catch (error) {
		return { status: false, error };
	}
}
