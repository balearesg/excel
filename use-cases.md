# Casos de Uso de [@bg/excel](https://github.com/balearesg/bg-excel)

En esta sección, se detallan los casos de uso específicos de la biblioteca [@bg/excel]. Cada caso de uso proporciona una descripción detallada de cómo utilizar la biblioteca para realizar una tarea específica.

## Importación:

```javascript
import { Excel } from "@bg/excel/excel";
```

## Caso de Uso 1: Creación de un Archivo Excel en Formato XLSX

En este caso de uso, se describe cómo crear un archivo Excel en formato XLSX utilizando la biblioteca [@bg/excel].

### Uso

```javascript
// Código de ejemplo para crear un archivo Excel en formato XLSX
const excel = new Excel();
const params = {
    pathname: "output/",
    filename: "example.xlsx",
    sheetData: [
        {
            sheetName: "Sheet1",
            data: [
                { name: "Alice", age: 28 },
                { name: "Bob", age: 32 },
            ],
            columnsHeader: [
                { header: "Name", key: "name" },
                { header: "Age", key: "age" },
            ],
        },
    ],
    type: "xlsx",
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

### Respuesta

La respuesta de este caso de uso incluye detalles sobre el estado y la ubicación del archivo creado, así como detalles del error en caso de que falle.

## Caso de Uso 2: Lectura de un Archivo Excel en Formato XLSX

En este caso de uso, se describe cómo leer un archivo Excel en formato XLSX utilizando la biblioteca [@bg/excel].

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato XLSX
const excel = new Excel();
const readParams = {
    filePath: "input/example.xlsx",
    cellsValidations: {
        columnValidations: [
            {
                sheetName: "Hoja1",
                columnKey: "Nombre",
                dataType: "string",
            },
            {
                sheetName: "Hoja1",
                columnKey: "Edad",
                dataType: "number",
            },
        ],
    },
       cellRangeValidations: [
         {
            sheetName: "Sheet1",
            startRow: 2,
            endRow: 2,
            startCol: 1,
            endCol: 1,
            dataType: "number",
            regexPattern: "^[A-Za-z ]+$"
         },
         {
            sheetName: "Sheet1",
            startRow: 2,
            endRow 2,
            startCol: 3,
            endCol: 3,
            dataType: "number"
         },
      ]
    type: "xlsx",
};

excel.readExcel(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return
    }
     console.error(`Error reading the XLSX file: ${result.error}`);

});
```

### Respuesta

La respuesta de este caso de uso incluye los datos leídos de la hoja de cálculo y detalles del error en caso de que falle.

## Caso de Uso 4: Creación de un Archivo Excel en Formato CSV

En este caso de uso, se describe cómo crear un archivo Excel en formato CSV utilizando la biblioteca [@bg/excel].

### Uso

```javascript
// Código de ejemplo para crear un archivo Excel en formato CSV
const excel = new Excel();
const params = {
    pathname: "output/",
    filename: "example.csv",
    sheetData: [
        {
            sheetName: "Sheet1",
            data: [
                { name: "Alice", age: 28 },
                { name: "Bob", age: 32 },
            ],
            columnsHeader: [
                { header: "Name", key: "name" },
                { header: "Age", key: "age" },
            ],
        },
    ],
    type: "csv",
};

excel.createExcel(params).then((result) => {
    if (result.status) {
        console.log(
            `CSV file created successfully at: ${result.data.pathFile}`
        );
        return;
    }
    console.error(`Error creating the CSV file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso es similar a la del Caso de Uso 1.

## Caso de Uso 5: Lectura de un Archivo Excel en Formato CSV

En este caso de uso, se describe cómo leer un archivo Excel en formato CSV utilizando la biblioteca [@bg/excel].

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato CSV
const excel = new Excel();
const readParams = {
    filePath: "input/example.csv",
    cellsValidations: {
          cellRangeValidations: [
         {
            sheetName: "Sheet1",
            startRow: 2,
            endRow: 2,
            startCol: 1,
            endCol: 1,
            dataType: "number",
            regexPattern: "^[A-Za-z ]+$"
         },
         {
            sheetName: "Sheet1",
            startRow: 2,
            endRow 2,
            startCol: 3,
            endCol: 3,
            dataType: "number"
         },
      ]
    },
    type: "csv",
};

excel.readExcel(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return
    }
    error.log(`Error reading the CSV file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso es similar a la del Caso de Uso 2.

## Caso de Uso 6: Parámetros Inválidos

En este caso de uso, se muestra cómo manejar parámetros inválidos al crear o leer archivos Excel.

### Uso

```javascript
// Código de ejemplo para manejar parámetros inválidos
const excel = new Excel();

// Ejemplo 1: Parámetros de creación inválidos
const invalidCreateParams = { pathname: null, filename: null, sheetData: null };

excel.createExcel(invalidCreateParams).then((result) => {
    if (result.status) {
        console.log("El archivo se creó con éxito.");
        return;
    }
    console.error(`Error al crear el archivo: ${result.error}`);
});

// Ejemplo 2: Parámetros de lectura inválidos
const invalidReadParams = { filePath: null, type: null };

excel.readExcel(invalidReadParams).then((result) => {
    if (result.status) {
        console.log("Los datos se leyeron con éxito.");
        return;
    }
    console.error(`Error al leer el archivo: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso varía según la naturaleza de los parámetros inválidos. La biblioteca [@bg/excel] debe manejar parámetros inválidos y proporcionar detalles en la respuesta en caso de errores.
