import { Excel } from '@bggroup/excel/excel';
import { Application, Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { IReturnHandler } from './types';

export /*bundle*/
class Controller {
	#router: Router | undefined;

	constructor(router: Router, app: Application) {
		this.#router = router;
		this.#router.post('/generate/excel', this.generateExcel);
		app.use(this.#router);
	}
	generateExcel = async (
		req: Request,
		res: Response
	): Promise<Response<IReturnHandler, Record<string, IReturnHandler>>> => {
		try {
			const excel: Excel = new Excel();
			const params = req.body;

			// Define the Zod schema for validation
			const salesSchema = z.object({
				Postalcode: z
					.number('Postalcode is required')
					.min(10000)
					.max(99999),
				'Sales Rep Name': z
					.string('Sales Rep Name is required')
					.nonempty('Sales Rep Name is required'),
				Year: z
					.number('Year is required')
					.min(2000)
					.max(new Date().getFullYear()),
				Value: z
					.number('Value must be a number')
					.int('Value must be an integer')
					.positive('Value must be positive'),
			});

			const sheetData = params.sheetData;

			const filename = params.filename;
			const pathname = '/files';
			const options = params.options ?? {};

			// Apply schema to each sheet in sheetData
			const validatedSheetData = sheetData.map((sheet: any) => ({
				...sheet,
				schema: salesSchema, // Apply the schema to each sheet
			}));

			const specs = {
				sheetData: validatedSheetData,
				options,
				pathname,
				filename,
				type: params.type,
			};

			// Create the Excel file with validation
			const result: IReturnHandler = await excel.create(specs);
			console.log('result: ', result);

			if (!result.status && Array.isArray(result.error))
				return res.status(500).send({
					status: false,
					error: result.error,
				});
			if (!result.status)
				throw new Error(result.error?.toString() || 'Unknown error');

			// Save the Excel buffer to disk
			if (result.data && result.data.data) {
				try {
					// Create the files directory if it doesn't exist
					const filesDir = path.join(process.cwd(), 'files');
					if (!fs.existsSync(filesDir)) {
						fs.mkdirSync(filesDir, { recursive: true });
					}

					// Generate file path
					const filePath = path.join(filesDir, filename);

					// Write the buffer to disk
					fs.writeFileSync(filePath, result.data.data);

					console.log(`Excel file saved to: ${filePath}`);

					// Convert buffers to base64 for JSON transmission
					const base64Buffer = result.data.data.toString('base64');
					const base64InvalidReport =
						result.data.invalid.report.toString('base64');

					// Add file path to response
					const responseData = {
						...result.data,
						data: base64Buffer, // Send as base64 string instead of buffer
						invalid: {
							...result.data.invalid,
							report: base64InvalidReport, // Send invalid report as base64 too
						},
						filePath: filePath,
						fileName: filename,
					};

					return res.status(200).send({
						status: true,
						data: responseData,
						message:
							'Excel file generated and saved successfully with validation',
					});
				} catch (fileError) {
					console.error('Error saving file to disk:', fileError);
					return res.status(500).send({
						status: false,
						error: `File saved but error writing to disk: ${fileError}`,
					});
				}
			}

			return res.status(200).send({
				status: true,
				data: result.data,
				message: 'Excel file generated successfully with validation',
			});
		} catch (error) {
			console.error('error', error);
			return res.status(500).send({
				status: false,
				error: `An error occurred: ${error}`,
			});
		}
	};
}
