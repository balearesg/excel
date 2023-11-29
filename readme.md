# [@bg/excel](https://github.com/balearesg/bg-excel) &middot; [![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](./LICENSE)

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Este repositorio contiene una biblioteca que facilita la creación y lectura de archivos Excel en formato .xlsx y .csv. La clase principal, `Excel`, proporciona una interfaz para crear archivos Excel personalizados y leer archivos existentes para su posterior análisis. La biblioteca se encarga de crear hojas de cálculo, administrar cabeceras de columnas y aplicar validaciones a los datos, lo que facilita la generación y procesamiento de archivos Excel.

## Instalación

Para utilizar este paquete en su proyecto, siga los siguientes pasos:

1. Clone este repositorio en su sistema local.

2. Instale las dependencias ejecutando el siguiente comando en el directorio `/library`:

    ```bash
    npm install
    ```

## Clase Excel

La clase `Excel` es el corazón de esta biblioteca. Proporciona propiedades y métodos para la creación y lectura de archivos Excel. A continuación, se describen sus propiedades y métodos:

## Importación:

```javascript
import { Excel } from "@bggroup/excel/excel";
```

## Caso de Uso 1: Creación de un Archivo Excel en Formato XLSX

En este caso de uso, se describe cómo crear un archivo Excel en formato XLSX

### Uso

```javascript
// Código de ejemplo para crear un archivo Excel en formato XLSX
const excel = new Excel();
const params = {
    pathname: "output/",
    filename: "example.xlsx",
    type: "xlsx",
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

En este caso de uso, se describe cómo leer un archivo Excel en formato XLSX, Las validación de columnas o celdas por rango es opcional con la propiedad `validations`, en este caso se describe con validación de columnas

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato XLSX
const excel = new Excel();
const readParams = {
    filePath: "input/example.xlsx",
    type: "xlsx",
    // OPCIONAL
    validations: {
        columns: [
            {
                sheet: "Hoja1",
                items: [
                    {
                        key: "Nombre",
                        type: "string",
                    },
                    {
                        key: "Edad",
                        type: "number",
                    },
                ],
            },
        ],
    },
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso incluye los datos leídos de la hoja de cálculo y detalles del error en caso de que falle.

## Caso de Uso 3: Lectura de un Archivo Excel en Formato XLSX con validaciones de celdas específicas por rango

En este caso de uso, se describe cómo leer un archivo Excel en formato XLSX aplicando una validación de celdas específicas por rango

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato XLSX
const excel = new Excel();
const readParams = {
    filePath: "input/example.xlsx",
    type: "xlsx",
    // OPCIONAL
    validations: {
        cells: [
            {
                sheet: "Hoja1",
                items: [
                    {
                        startRow: 2,
                        endRow: 2,
                        startCol: 1,
                        endCol: 1,
                        type: "string",
                        regex: "^[A-Za-z ]+$",
                    },
                    {
                        startRow: 2,
                        endRow: 2,
                        startCol: 3,
                        endCol: 3,
                        type: "number",
                    },
                ],
            },
        ],
    },
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso incluye los datos leídos de la hoja de cálculo y detalles del error en caso de que falle.

## Caso de Uso 4: Lectura de un Archivo Excel en Formato XLSX por hoja específica

En este caso de uso, se describe cómo leer un archivo Excel en formato XLSX por hoja específica

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato XLSX
const excel = new Excel();
const readParams = {
    filePath: "input/example.xlsx",
    type: "xlsx",
    sheet: "Hoja1",
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return;
    }
    console.error(`Error reading the XLSX file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso incluye los datos leídos de la hoja de cálculo y detalles del error en caso de que falle.

## Caso de Uso 5: Creación de un Archivo Excel en Formato CSV

En este caso de uso, se describe cómo crear un archivo Excel en formato CSV. por el momento no se pueden crear archivos csv con más de 1 hoja

### Uso

```javascript
// Código de ejemplo para crear un archivo Excel en formato CSV
const excel = new Excel();
const params = {
    pathname: "output/",
    filename: "example.csv",
    type: "csv",
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

### Respuesta

La respuesta de este caso de uso es similar a la del Caso de Uso 1.

## Caso de Uso 6: Lectura de un Archivo Excel en Formato CSV

En este caso de uso, se describe cómo leer un archivo Excel en formato CSV, por ahora la validación de columnas no está disponible en esete caso.

### Uso

```javascript
// Código de ejemplo para leer un archivo Excel en formato CSV
const excel = new Excel();
const readParams = {
    filePath: "input/example.csv",
    type: "csv",
};

excel.read(readParams).then((result) => {
    if (result.status) {
        console.log("Data read successfully:");
        console.log(result.data);
        return;
    }
    error.log(`Error reading the CSV file: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso es similar a la del Caso de Uso 2.

## Caso de Uso 7: Parámetros Inválidos

En este caso de uso, se muestra cómo manejar parámetros inválidos al crear o leer archivos Excel.

### Uso

```javascript
// Código de ejemplo para manejar parámetros inválidos
const excel = new Excel();

// Ejemplo 1: Parámetros de creación inválidos
const invalidCreateParams = { pathname: null, filename: null, sheetData: null };

excel.create(invalidCreateParams).then((result) => {
    if (result.status) {
        console.log("El archivo se creó con éxito.");
        return;
    }
    console.error(`Error al crear el archivo: ${result.error}`);
});

// Ejemplo 2: Parámetros de lectura inválidos
const invalidReadParams = { filePath: null, type: null };

excel.read(invalidReadParams).then((result) => {
    if (result.status) {
        console.log("Los datos se leyeron con éxito.");
        return;
    }
    console.error(`Error al leer el archivo: ${result.error}`);
});
```

### Respuesta

La respuesta de este caso de uso varía según la naturaleza de los parámetros inválido

### Propiedades de Excel

| Propiedad     | Descripción                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| columnsHeader | Un arreglo de objetos que define las cabeceras de las columnas en las hojas de cálculo. Estas cabeceras se utilizan al crear un archivo Excel. |
| workbook      | Un objeto de la biblioteca `exceljs` que representa el libro de trabajo Excel y se utiliza para cargar archivos Excel existentes.              |

### Métodos de Excel

| Método | Descripción                                                                                                                                                                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create | Este método se utiliza para crear un archivo Excel personalizado. Toma un objeto de parámetros `params` que especifica la ubicación, nombre del archivo, datos de las hojas de cálculo y más. Devuelve una promesa que resuelve en un objeto con información sobre el estado y, si es exitoso, la ubicación del archivo creado.         |
| read   | Este método se utiliza para leer un archivo Excel existente, ya sea en formato .xlsx o .csv. Toma un objeto de parámetros `params` que especifica la ubicación del archivo y las validaciones a aplicar. Devuelve una promesa que resuelve en un objeto con información sobre el estado y, si es exitoso, los datos leídos del archivo. |

## Estructura de las respuestas

### Respuesta de `create`

Cuando se llama al método `create`, la respuesta tiene la siguiente estructura:

| Propiedad | Descripción                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| status    | Indica si la operación fue exitosa (true) o falló (false).                                                                   |
| data      | Un objeto que contiene información sobre el archivo Excel creado, que incluye la ruta, el nombre del archivo y la ubicación. |
| error     | Detalles del error, en caso de que la operación falle. Puede ser una cadena de texto o un arreglo de errores.                |

### Respuesta de `read`

Cuando se llama al método `read`, la respuesta tiene la siguiente estructura:

| Propiedad | Descripción                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| status    | Indica si la operación fue exitosa (true) o falló (false).                                                    |
| data      | Un objeto que contiene los datos leídos de la hoja de cálculo, organizados por hoja.                          |
| error     | Detalles del error, en caso de que la operación falle. Puede ser una cadena de texto o un arreglo de errores. |

Estas estructuras de respuestas te permiten verificar el estado de la operación y acceder a los datos o detalles del error según corresponda.

## Propiedades y Explicación de los Parámetros de `create`

El método `create` acepta un objeto `params` que se utiliza para personalizar la creación de un archivo Excel. A continuación, se detallan las propiedades de `params`:

### Propiedades de `params` en `create`

| Propiedad | Descripción                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pathname  | La ubicación o ruta donde se guardará el archivo Excel. Debe ser una cadena de texto.                                                                         |
| options   | Opciones adicionales para la creación del archivo Excel. Es un objeto que se utiliza para configuraciones específicas del archivo.                            |
| filename  | El nombre del archivo Excel que se creará. Debe ser una cadena de texto.                                                                                      |
| sheetData | Un arreglo de objetos que define los datos de las hojas de cálculo a incluir en el archivo Excel. Cada objeto en este arreglo representa una hoja de cálculo. |
| type      | El tipo de archivo Excel que se creará, que puede ser "csv" o "xlsx". Debe ser una cadena de texto.                                                           |

### Propiedades de `sheetData` en `create`

| Propiedad     | Descripción                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sheetName     | El nombre de la hoja de cálculo. Debe ser una cadena de texto.                                                                                          |
| data          | Un arreglo de objetos que representa los datos a incluir en la hoja de cálculo. Cada objeto contiene información sobre las filas y columnas de la hoja. |
| columnsHeader | Un arreglo de objetos que define las cabeceras de las columnas en la hoja de cálculo. Estas cabeceras se utilizan al crear un archivo Excel.            |

## Propiedades y Explicación de los Parámetros de `read`

El método `read` se utiliza para leer un archivo Excel existente y aplicar validaciones según sea necesario. A continuación, se detallan las propiedades de `params`:

### Propiedades de `params` en `read`

| Propiedad   | Descripción                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| filePath    | La ubicación del archivo Excel que se va a leer. Debe ser una cadena de texto.                              |
| validations | Un objeto que contiene validaciones para celdas, incluyendo validaciones de tipo de datos y patrones regex. |
| type        | El tipo de archivo Excel que se va a leer, que puede ser "csv" o "xlsx". Debe ser una cadena de texto.      |

### Propiedades de `validations` en `read`

El objeto `validations` se utiliza para especificar las validaciones que se aplicarán a las celdas del archivo Excel. A continuación, se dividen las propiedades de `validations` en tablas separadas:

#### Propiedades de `columns`

| Propiedad | Descripción                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| sheetName | El nombre de la hoja de cálculo a la que se aplicarán las validaciones. Debe ser una cadena de texto.             |
| key       | La clave de la columna a la que se aplicarán las validaciones. Debe ser una cadena de texto.                      |
| type      | El tipo de dato esperado en la columna (opcional). Puede ser "string", "number", "boolean" o "date".              |
| regex     | Un patrón de expresión regular para validar los valores de la columna (opcional). Debe ser una expresión regular. |

#### Propiedades de `range`

| Propiedad | Descripción                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| sheetName | El nombre de la hoja de cálculo a la que se aplicarán las validaciones. Debe ser una cadena de texto.                     |
| startRow  | El número de fila de inicio para la validación. Debe ser un número.                                                       |
| endRow    | El número de fila de fin para la validación. Debe ser un número.                                                          |
| startCol  | El número de columna de inicio para la validación. Debe ser un número.                                                    |
| endCol    | El número de columna de fin para la validación. Debe ser un número.                                                       |
| type      | El tipo de dato esperado en el rango de celdas (opcional). Puede ser "string", "number", "boolean" o "date".              |
| regex     | Un patrón de expresión regular para validar los valores en el rango de celdas (opcional). Debe ser una expresión regular. |

Estas propiedades permiten especificar las validaciones a aplicar a las celdas del archivo Excel durante la lectura.

## Contribuciones

Las contribuciones, problemas y solicitudes de características son bienvenidos. Siéntase libre de consultar la [página de issues](https://github.com/balearesg/bg-excel/issues) o abrir nuevas.

## Licencia

Este proyecto está bajo licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para obtener más información.
