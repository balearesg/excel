# [@bgroup/excel](https://github.com/balearesg/bg-excel) &middot; [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

This repository contains a library that facilitates the creation and reading of Excel files in .xlsx and .csv formats.
The main class, `Excel`, provides an interface for creating custom Excel files and reading existing files for further
analysis. The library takes care of creating spreadsheets, managing column headers, and applying validations to the
data, which eases the generation and processing of Excel files.

## Installation

To use this package in your project, follow these steps:

1. Clone this repository to your local system.

2. Install the dependencies by running the following command in the `/library` directory:

    ```bash
    npm install @bgroup/excel
    ```

## Excel Class

The `Excel` class is the heart of this library. It provides properties and methods for the creation and reading of Excel
files. Below are descriptions of its properties and methods:

## Import:

```javascript
import { Excel } from '@bgroup/excel/excel';
```

## Use Case 1: Creating an Excel File in XLSX Format

This use case describes how to create an Excel file in XLSX format.

### Usage

```javascript
// Example code to create an Excel file in XLSX format
const excel = new Excel();
const params = {
    pathname: 'output/',
    filename: 'example.xlsx',
    type: 'xlsx',
    sheetData: [
        {
            sheetName: 'Sheet1',
            data: [
                { name: 'Alice', age: 28 },
                { name: 'Bob', age: 32 },
            ],
            columnsHeader: [
                { header: 'Name', key: 'name' },
                { header: 'Age', key: 'age' },
            ],
        },
    ],
};

excel.create(params).then((result) => {
    if (result.status) {
        console.log(
            `XLSX file created successfully at: ${result.data.pathFile}`
        );
        return;
    }
    console.error(`Error creating the XLSX file: ${result.error}`);
});
```

### Response

The response of this use case includes details about the status and location of the created file, as well as error
details in case of failure.

## Use Case 2: Reading an Excel File in XLSX Format

This use case describes how to read an Excel file in XLSX format. Column or cell validation by range is optional with
the `validations` property, in this case, it's described with column validation.

### Usage

```javascript
// Example code to read an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log('Data read successfully:');
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Response

The response of this use case includes the data read from the spreadsheet and error details in case of failure.

## Use Case 3: Reading an Excel File in XLSX Format with Specific Cell Validations by Range

This use case describes how to read an Excel file in XLSX format applying specific cell validations by range.

### Usage

```javascript
// Example code to read an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
    validations: {
        cells: [
            {
                sheet: 'Sheet1',
                items: [
                    {
                        startRow: 2,
                        endRow: 2,
                        startCol: 1,
                        endCol: 1,
                        type: 'string',
                        regex: '^[A-Za-z ]+$',
                    },
                    {
                        startRow: 2,
                        endRow: 2,
                        startCol: 3,
                        endCol: 3,
                        type: 'number',
                    },
                ],
            },
        ],
    },
};

excel.read(readParams).then(result => {
    if (result.status) {
        console.log('Data read successfully

:');
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Response

The response of this use case includes the data read from the spreadsheet and error details in case of failure.

## Use Case 4: Reading an Excel File in XLSX Format by Specific Sheet

This use case describes how to read an Excel file in XLSX format by a specific sheet.

### Usage

```javascript
// Example code to read an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
    sheet: 'Sheet1',
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log('Data read successfully:');
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Response

The response of this use case includes the data read from the spreadsheet and error details in case of failure.

## Use Case 5: Creating an Excel File in CSV Format

This use case describes how to create an Excel file in CSV format. Currently, CSV files cannot be created with more than
one sheet.

### Usage

```javascript
// Example code to create an Excel file in CSV format
const excel = new Excel();
const params = {
    pathname: 'output/',
    filename: 'example.csv',
    type: 'csv',
    sheetData: [
        {
            sheetName: 'Sheet1',
            data: [
                { name: 'Alice', age: 28 },
                { name: 'Bob', age: 32 },
            ],
            columnsHeader: [
                { header: 'Name', key: 'name' },
                { header: 'Age', key: 'age' },
            ],
        },
    ],
};

excel.create(params).then((result) => {
    if (result.status) {
        console.log(
            `CSV file created successfully at: ${result.data.pathFile}`
        );
        return;
    }
    console.error(`Error creating the CSV file: ${result.error}`);
});
```

### Response

The response of this use case is similar to that of Use Case 1.

## Use Case 6: Reading an Excel File in CSV Format

This use case describes how to read an Excel file in CSV format, column validation is not currently available in this
case.

### Usage

```javascript
// Example code to read an Excel file in CSV format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.csv',
    type: 'csv',
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log('Data read successfully:');
        console.log(result.data);
        return;
    }
    console.error(`Error reading the CSV file: ${result.error}`);
});
```

### Response

The response of this use case is similar to that of Use Case 2.

## Use Case 7: Invalid Parameters

This use case shows how to handle invalid parameters when creating or reading Excel files.

### Usage

```javascript
// Example code to handle invalid parameters
const excel = new Excel();

// Example 1: Invalid creation parameters
const invalidCreateParams = { pathname: null, filename: null, sheetData: null };

excel.create(invalidCreateParams).then((result) => {
    if (result.status) {
        console.log('File created successfully.');
        return;
    }
    console.error(`Error creating the file: ${result.error}`);
});

// Example 2: Invalid reading parameters
const invalidReadParams = { filePath: null, type: null };

excel.read(invalidReadParams).then((result) => {
    if (result.status) {
        console.log('Data read successfully.');
        return;
    }
    console.error(`Error reading the file: ${result.error}`);
});
```

### Response

The response of this use case varies depending on the nature of the invalid parameters.

### Excel Properties

| Property      | Description                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| columnsHeader | An array of objects that defines the headers for the columns in the spreadsheets. These headers are used when creating an Excel file. |
| workbook      | An object from the `exceljs` library that represents the Excel workbook and is used to load existing Excel files.                     |

### Excel Methods

| Method | Description                                                                                                                                                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create | This method is used to create a custom Excel file. It takes a `params` parameter object specifying the location, file name, sheet data, and more. Returns a promise resolving in an object with information about the status and file location, if successful. |
| read   | This method is used to read an existing Excel file, either in .xlsx or .csv format. It takes a `params` parameter object specifying the file location and validations to apply.                                                                                |

## Response Structure

### `create` Response

When the `create` method is called, the response has the following structure:

| Property | Description                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| status   | Indicates whether the operation was successful (true) or failed (false).                                    |
| data     | An object containing information about the created Excel file, including the path, file name, and location. |
| error    | Details of the error, in case the operation fails. Can be a text string or an array of errors.              |

### `read` Response

When the `read` method is called, the response has the following structure:

| Property | Description                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- |
| status   | Indicates whether the operation was successful (true) or failed (false).                       |
| data     | An object that contains the data read from the spreadsheet, organized by sheet.                |
| error    | Details of the error, in case the operation fails. Can be a text string or an array of errors. |

These response structures allow you to verify the status of the operation and access data or error details as
appropriate.

## Properties and Explanation of `create` Parameters

The `create` method accepts a `params` object that is used to customize the creation of an Excel file. The properties of
`params` are detailed below:

### `create` `params` Properties

| Property  | Description                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| pathname  | The location or path where the Excel file will be saved. Must be a text string.                                                             |
| options   | Additional options for creating the Excel file. It's an object used for specific file configurations.                                       |
| filename  | The name of the Excel file to be created. Must be a text string.                                                                            |
| sheetData | An array of objects defining the data of the worksheets to be included in the Excel file. Each object in this array represents a worksheet. |
| type      | The type of Excel file to be created, which can be "csv" or "xlsx". Must be a text string.                                                  |

### `sheetData` Properties in `create`

| Property      | Description                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| sheetName     | The name of the worksheet. Must be a text string.                                                                                       |
| data          | An array of objects representing the data to be included in the worksheet. Each object contains information about the rows and columns. |
| columnsHeader | An array of objects that define the headers of the columns in the worksheet. These headers are used when creating an Excel file.        |

## Properties and Explanation of `read` Parameters

The `read` method is used to read an existing Excel file and apply validations as necessary. The properties of `params`
are detailed below:

### `read` `params` Properties

| Property    | Description                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| filePath    | The location of the Excel file to be read. Must be a text string.                               |
| validations | An object containing validations for cells, including data type validations and regex patterns. |
| type        | The type of Excel file to be read, which can be "csv" or "xlsx". Must be a text string.         |

### `validations` Properties in `read`

The `validations` object is used to specify the validations that will be applied to the cells of the Excel file. The
properties of `validations` are divided into separate tables below:

#### `columns` Properties

| Property  | Description                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| sheetName | The name of the worksheet to which the validations will be applied. Must be a text string.                  |
| key       | The key of the column to which the validations will be applied. Must be a text string.                      |
| type      | The expected data type in the column (optional). Can be "string", "number", "boolean", or "date".           |
| regex     | A regular expression pattern to validate the values of the column (optional). Must be a regular expression. |

#### `range` Properties

| Property  | Description                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------- |
| sheetName | The name of the worksheet to which the validations will be applied. Must be a text string.                |
| startRow  | The start row number for the validation. Must be a number.                                                |
| endRow    | The end row number for the validation. Must be a number.                                                  |
| startCol  | The start column number for the validation. Must be a number.                                             |
| endCol    | The end column number for the validation. Must be a number.                                               |
| type      | The expected data type in the range of cells (optional). Can be "string", "number", "boolean", or "date". |
| regex     |

A regular expression pattern to validate the values in the range of cells (optional). Must be a regular expression. |

These properties allow you to specify the validations to apply to the cells of the Excel file during reading.

## Contributions

Contributions, issues, and feature requests are welcome. Feel free to check the
[issues page](https://github.com/balearesg/bg-excel/issues) or open new ones.

## License

This project is under the MIT license. See the [LICENSE](./LICENSE) file for more information.
