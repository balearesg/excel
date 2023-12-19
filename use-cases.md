Here's the translation of the use cases for [@bgroup/excel](https://github.com/balearesg/bg-excel):

# Use Cases of [@bgroup/excel](https://github.com/balearesg/bg-excel)

In this section, specific use cases of the [@bgroup/excel](https://github.com/balearesg/bg-excel) library are detailed.
Each use case provides a detailed description of how to use the library for a specific task.

## Importing:

```javascript
import { Excel } from '@bgroup/excel/excel';
```

## Use Case 1: Creating an Excel File in XLSX Format

This use case describes how to create an Excel file in XLSX format.

### Usage

```javascript
// Sample code to create an Excel file in XLSX format
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

The response to this use case includes details about the status and location of the created file, as well as error
details if the operation fails.

## Use Case 2: Reading an Excel File in XLSX Format

This use case describes how to read an Excel file in XLSX format. Column or cell validation by range is optional with
the `validations` property, in this case described with column validation.

### Usage

```javascript
// Sample code for reading an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
    // OPTIONAL
    validations: {
        columns: [
            {
                sheet: 'Hoja1',
                items: [
                    {
                        key: 'Nombre',
                        type: 'string',
                    },
                    {
                        key: 'Edad',
                        type: 'number',
                    },
                ],
            },
        ],
    },
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

The response to this use case includes the data read from the spreadsheet and details of the error in case the operation
fails.

## Use Case 3: Reading an Excel File in XLSX Format with Specific Cell Validations by Range

This use case describes how to read an Excel file in XLSX format applying specific cell validations by range.

### Usage

```javascript
// Sample code for reading an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
    // OPTIONAL
    validations: {
        cells: [
            {
                sheet: 'Hoja1',
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

The response to this use case includes the data read from the spreadsheet and details of the error in case the operation
fails.

## Use Case 4: Reading an Excel File in XLSX Format by Specific Sheet

This use case describes how to read an Excel file in XLSX format by a specific sheet.

### Usage

```javascript
// Sample code for reading an Excel file in XLSX format
const excel = new Excel();
const readParams = {
    filePath: 'input/example.xlsx',
    type: 'xlsx',
    sheet: 'Hoja1',
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

The response to this use case includes the data read from the spreadsheet and details of the error in case the operation
fails.

## Use Case 5: Creating an Excel File in CSV Format

This use case describes how to create an Excel file in CSV format. Currently, CSV files cannot be created with more than
one sheet.

### Usage

```javascript
// Sample code for creating an Excel file in CSV format
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

The response to this use case is similar to that of Use Case 1.

## Use Case 6: Reading an Excel File in CSV Format

This use case describes how to read an Excel file in CSV format. Currently, column validation is not available in this
case.

### Usage

```javascript
// Sample code for reading an Excel file in CSV format
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
    error.log(`Error reading the CSV file: ${result.error}`);
});
```

### Response

The response to this use case is similar to that of Use Case 2.

## Use Case 7: Invalid Parameters

This use case shows how to handle invalid parameters when creating or reading Excel files.

### Usage

```javascript
// Sample code for handling invalid parameters
const excel = new Excel();

// Example 1: Invalid creation parameters
const invalidCreateParams = { pathname: null, filename: null, sheetData: null };

excel.create(invalidCreateParams).then((result) => {
    if (result.status) {
        console.log('The file was created successfully.');
        return;
    }
    console.error(`Error creating the file: ${result.error}`);
});

// Example 2: Invalid reading parameters
const invalidReadParams = { filePath: null, type: null };

excel.read(invalidReadParams).then((result) => {
    if (result.status) {
        console.log('Data was read successfully.');
        return;
    }
    console.error(`Error reading the file: ${result.error}`);
});
```

### Response

The response to this use case varies depending on the nature of the invalid parameters.
