import { Excel } from '@bggroup/excel/excel';
import { Application, Request, Response, Router } from 'express';
import * as multer from 'multer';
import { z } from 'zod';
import { IReturnRead } from './types';

// Extend Request interface to include multer file
interface MulterRequest extends Request {
	file?: multer.File;
}

export /*bundle*/
class Controller {
	#router: Router | undefined;
	#upload: multer.Multer;

	constructor(router: Router, app: Application) {
		this.#router = router;

		// Configure multer for memory storage
		this.#upload = multer({
			storage: multer.memoryStorage(),
			limits: {
				fileSize: 10 * 1024 * 1024, // 10MB limit
			},
		});

		this.#router.post(
			'/read/excel',
			this.#upload.single('file'),
			this.readExcel
		);
		app.use(this.#router);
	}

	readExcel = async (
		req: MulterRequest,
		res: Response
	): Promise<Response<IReturnRead, Record<string, IReturnRead>>> => {
		try {
			// Check if file was uploaded
			if (!req.file) {
				return res.status(400).send({
					status: false,
					error: 'No file uploaded. Please upload a file with the field name "file".',
				});
			}

			const excel = new Excel();
			const { type, sheet } = req.body;

			// Validate required parameters
			if (!type || !['xlsx', 'csv'].includes(type)) {
				return res.status(400).send({
					status: false,
					error: 'Invalid or missing file type. Must be "xlsx" or "csv".',
				});
			}

			// Determine file type from uploaded file if not provided
			const fileExtension = req.file.originalname
				.split('.')
				.pop()
				?.toLowerCase();
			if (fileExtension && !['xlsx', 'csv'].includes(fileExtension)) {
				return res.status(400).send({
					status: false,
					error: 'Invalid file type. Only .xlsx and .csv files are supported.',
				});
			}

			const SalesDataSchema = z.object({
				// Postcode (Número entero requerido)
				Postcode: z
					.string({
						error: 'El código postal es obligatorio.',
					})
					.nonempty('El código postal no puede estar vacío.'),
				// Sales_Rep_ID (Número entero requerido)
				'Sales Rep ID': z
					.number({
						error: 'El ID del representante de ventas es obligatorio.',
					})
					.int('El ID del representante debe ser un número entero.')
					.positive('El ID del representante debe ser positivo.'),

				// Sales_Rep_Name (Cadena de texto requerida y no vacía)
				Sales_Rep_Name: z
					.string({
						error: 'El nombre del representante de ventas es obligatorio.',
					})
					.nonempty(
						'El nombre del representante de ventas no puede estar vacío.'
					),

				// Year (Número entero para el año, requerido)
				Year: z
					.number({
						error: 'El año es obligatorio.',
					})
					.int('El año debe ser un número entero.')
					.min(1900, 'El año parece inválido.'), // Ejemplo de validación de rango

				// Value (Número flotante, requerido)
				Value: z.number({
					error: 'El valor de la venta es obligatorio.',
				}),
				// Puedes añadir .positive() si el valor siempre debe ser positivo
			});

			const specs = {
				buffer: req.file.buffer,
				type: type || fileExtension,
				sheet: sheet || '',
				schema: SalesDataSchema, // Parse schema if provided as string
			};

			// Read the Excel/CSV file
			const result: IReturnRead = await excel.read(specs);
			console.log('result: ', result);

			if (!result.status && Array.isArray(result.error)) {
				return res.status(500).send({
					status: false,
					error: result.error,
				});
			}
			if (!result.status) {
				throw new Error(result.error?.toString() || 'Unknown error');
			}

			return res.status(200).send({
				status: true,
				data: result.data,
				invalidRows: result.invalidRows,
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
