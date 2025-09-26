import { z } from 'zod';

/**
 * Formats Zod validation errors into a readable string
 * @param issues - Zod validation issues
 * @returns Formatted error string
 */
export function formatValidationErrors(issues: z.ZodIssue[]): string {
	return issues
		.map(issue => `${issue.path.join('.')}: ${issue.message}`)
		.join('; ');
}

/**
 * Validates a single data item against a Zod schema
 * @param item - Data item to validate
 * @param schema - Zod schema for validation
 * @returns Validation result with success status and error details
 */
export function validateDataItem(
	item: object,
	schema: z.ZodSchema
): { isValid: boolean; error?: string } {
	const validationResult = schema.safeParse(item);

	if (validationResult.success) {
		return { isValid: true };
	}

	return {
		isValid: false,
		error: formatValidationErrors(validationResult.error.issues),
	};
}

/**
 * Converts an array row to an object for validation
 * @param row - Array representing a row
 * @returns Object with column keys
 */
export function convertArrayRowToObject(row: any[]): object {
	return row.reduce((acc, cell, index) => {
		acc[`column_${index}`] = cell;
		return acc;
	}, {} as any);
}
