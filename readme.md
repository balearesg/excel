# [@bg/excel](https://github.com/balearesg/bg-excel) &middot; [![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](./LICENSE)

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Este repositorio contiene una biblioteca que facilita la creación y lectura de archivos Excel en formato .xlsx y .csv. La clase principal, `ExcelHandler`, proporciona una interfaz para crear archivos Excel personalizados y leer archivos existentes para su posterior análisis. La biblioteca se encarga de crear hojas de cálculo, administrar cabeceras de columnas y aplicar validaciones a los datos, lo que facilita la generación y procesamiento de archivos Excel.

## Instalación

Para utilizar este paquete en su proyecto, siga los siguientes pasos:

1. Clone este repositorio en su sistema local.

2. Instale las dependencias ejecutando el siguiente comando en el directorio `/library`:

    ```bash
    npm install
    ```

## Clase ExcelHandler

La clase `ExcelHandler` es el corazón de esta biblioteca. Proporciona propiedades y métodos para la creación y lectura de archivos Excel. A continuación, se describen sus propiedades y métodos:

### Propiedades de ExcelHandler

| Propiedad     | Descripción                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| columnsHeader | Un arreglo de objetos que define las cabeceras de las columnas en las hojas de cálculo. Estas cabeceras se utilizan al crear un archivo Excel. |
| workbook      | Un objeto de la biblioteca `exceljs` que representa el libro de trabajo Excel y se utiliza para cargar archivos Excel existentes.              |

### Métodos de ExcelHandler

| Método      | Descripción                                                                                                                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createExcel | Este método se utiliza para crear un archivo Excel personalizado. Toma un objeto de parámetros `params` que especifica la ubicación, nombre del archivo, datos de las hojas de cálculo y más. Devuelve una promesa que resuelve en un objeto con información sobre el estado y, si es exitoso, la ubicación del archivo creado.         |
| readExcel   | Este método se utiliza para leer un archivo Excel existente, ya sea en formato .xlsx o .csv. Toma un objeto de parámetros `params` que especifica la ubicación del archivo y las validaciones a aplicar. Devuelve una promesa que resuelve en un objeto con información sobre el estado y, si es exitoso, los datos leídos del archivo. |

## Estructura de las respuestas

### Respuesta de `createExcel`

Cuando se llama al método `createExcel`, la respuesta tiene la siguiente estructura:

| Propiedad | Descripción                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| status    | Indica si la operación fue exitosa (true) o falló (false).                                                                   |
| data      | Un objeto que contiene información sobre el archivo Excel creado, que incluye la ruta, el nombre del archivo y la ubicación. |
| error     | Detalles del error, en caso de que la operación falle. Puede ser una cadena de texto o un arreglo de errores.                |

### Respuesta de `readExcel`

Cuando se llama al método `readExcel`, la respuesta tiene la siguiente estructura:

| Propiedad | Descripción                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| status    | Indica si la operación fue exitosa (true) o falló (false).                                                    |
| data      | Un objeto que contiene los datos leídos de la hoja de cálculo, organizados por hoja.                          |
| error     | Detalles del error, en caso de que la operación falle. Puede ser una cadena de texto o un arreglo de errores. |

Estas estructuras de respuestas te permiten verificar el estado de la operación y acceder a los datos o detalles del error según corresponda.

## Propiedades y Explicación de los Parámetros de `createExcel`

El método `createExcel` acepta un objeto `params` que se utiliza para personalizar la creación de un archivo Excel. A continuación, se detallan las propiedades de `params`:

### Propiedades de `params` en `createExcel`

| Propiedad | Descripción                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pathname  | La ubicación o ruta donde se guardará el archivo Excel. Debe ser una cadena de texto.                                                                         |
| options   | Opciones adicionales para la creación del archivo Excel. Es un objeto que se utiliza para configuraciones específicas del archivo.                            |
| filename  | El nombre del archivo Excel que se creará. Debe ser una cadena de texto.                                                                                      |
| sheetData | Un arreglo de objetos que define los datos de las hojas de cálculo a incluir en el archivo Excel. Cada objeto en este arreglo representa una hoja de cálculo. |
| type      | El tipo de archivo Excel que se creará, que puede ser "csv" o "xlsx". Debe ser una cadena de texto.                                                           |

### Propiedades de `sheetData` en `createExcel`

| Propiedad     | Descripción                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sheetName     | El nombre de la hoja de cálculo. Debe ser una cadena de texto.                                                                                          |
| data          | Un arreglo de objetos que representa los datos a incluir en la hoja de cálculo. Cada objeto contiene información sobre las filas y columnas de la hoja. |
| columnsHeader | Un arreglo de objetos que define las cabeceras de las columnas en la hoja de cálculo. Estas cabeceras se utilizan al crear un archivo Excel.            |

## Propiedades y Explicación de los Parámetros de `readExcel`

El método `readExcel` se utiliza para leer un archivo Excel existente y aplicar validaciones según sea necesario. A continuación, se detallan las propiedades de `params`:

### Propiedades de `params` en `readExcel`

| Propiedad        | Descripción                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| filePath         | La ubicación del archivo Excel que se va a leer. Debe ser una cadena de texto.                              |
| cellsValidations | Un objeto que contiene validaciones para celdas, incluyendo validaciones de tipo de datos y patrones regex. |
| type             | El tipo de archivo Excel que se va a leer, que puede ser "csv" o "xlsx". Debe ser una cadena de texto.      |

### Propiedades de `cellsValidations` en `readExcel`

El objeto `cellsValidations` se utiliza para especificar las validaciones que se aplicarán a las celdas del archivo Excel. A continuación, se dividen las propiedades de `cellsValidations` en tablas separadas:

#### Propiedades de `columnValidations`

| Propiedad    | Descripción                                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| sheetName    | El nombre de la hoja de cálculo a la que se aplicarán las validaciones. Debe ser una cadena de texto.             |
| columnKey    | La clave de la columna a la que se aplicarán las validaciones. Debe ser una cadena de texto.                      |
| dataType     | El tipo de dato esperado en la columna (opcional). Puede ser "string", "number", "boolean" o "date".              |
| regexPattern | Un patrón de expresión regular para validar los valores de la columna (opcional). Debe ser una expresión regular. |

#### Propiedades de `cellRangeValidations`

| Propiedad    | Descripción                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| sheetName    | El nombre de la hoja de cálculo a la que se aplicarán las validaciones. Debe ser una cadena de texto.                     |
| startRow     | El número de fila de inicio para la validación. Debe ser un número.                                                       |
| endRow       | El número de fila de fin para la validación. Debe ser un número.                                                          |
| startCol     | El número de columna de inicio para la validación. Debe ser un número.                                                    |
| endCol       | El número de columna de fin para la validación. Debe ser un número.                                                       |
| dataType     | El tipo de dato esperado en el rango de celdas (opcional). Puede ser "string", "number", "boolean" o "date".              |
| regexPattern | Un patrón de expresión regular para validar los valores en el rango de celdas (opcional). Debe ser una expresión regular. |

Estas propiedades permiten especificar las validaciones a aplicar a las celdas del archivo Excel durante la lectura.

## Uso

Puede detallar en [Este archivo](./use-cases.md) los casos de uso

## Contribuciones

Las contribuciones, problemas y solicitudes de características son bienvenidos. Siéntase libre de consultar la [página de issues](https://github.com/balearesg/bg-excel/issues) o abrir nuevas.

## Licencia

Este proyecto está bajo licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para obtener más información.
