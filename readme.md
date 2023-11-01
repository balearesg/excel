# [@bg/excel](https://github.com/balearesg/bg-excel) &middot; [![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](./LICENSE)

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**@bg/excel** es una herramienta que permite la generación de archivos Excel personalizados en aplicaciones Node.js. Esta utilidad proporciona una clase llamada `ExcelHandler` que facilita la creación de archivos Excel con hojas de trabajo personalizables, encabezados y datos.

## Instalación

Para utilizar este paquete en su proyecto, siga los siguientes pasos:

1. Clone este repositorio en su sistema local.

2. Instale las dependencias ejecutando el siguiente comando en el directorio `/project`:

    ```bash
    npm install
    ```

## Clase `ExcelHandler`

La clase `ExcelHandler` es una utilidad para generar archivos Excel en aplicaciones Node.js. Permite crear archivos Excel con hojas de trabajo personalizables, encabezados y datos. Sus principales componentes son:

-   `_columnsHeader`: Almacena información sobre los encabezados de las columnas que se utilizarán en las hojas de trabajo.

-   `_workbook`: Representa el libro de trabajo de Excel y almacena hojas de trabajo, datos y configuraciones.

-   `createExcel`: El método `createExcel` es el núcleo de la clase `ExcelHandler` y se encarga de crear un archivo Excel en función de los parámetros proporcionados. Recibe un solo parámetro, un objeto `params`, que contiene la información necesaria para generar el archivo Excel. Aquí se desglosan los componentes de `params`:

    -   `params`: Un objeto que contiene los siguientes campos:

        -   `pathname`: Una cadena que representa la ruta donde se guardará el archivo Excel.
        -   `options`: Un objeto opcional que contiene opciones de escritura del archivo Excel, como formato, autor, etc.
        -   `filename`: Una cadena que especifica el nombre del archivo Excel que se creará.
        -   `sheetData`: Un arreglo de objetos que representan los datos y encabezados de cada hoja de trabajo en el archivo Excel. Cada objeto dentro de este arreglo debe contener:
            -   `sheetName`: Una cadena que es el nombre de la hoja de trabajo.
            -   `columnsHeader`: Un arreglo de objetos que especifica los encabezados de columnas para esa hoja de trabajo.
            -   `data`: Un arreglo que contiene los datos que se agregarán a la hoja de trabajo.
        -   `cellsValidations` (Opcional): Un objeto que especifica las validaciones que se aplicarán a las celdas. Puede contener dos propiedades:

            -   `columnValidations`: Un arreglo de objetos que describe las validaciones de tipo de datos para columnas específicas en una hoja de trabajo.

                -   `sheetName`: Una cadena que representa el nombre de la hoja de trabajo a la que se aplicarán las validaciones.

                -   `columnKey`: Una cadena que indica la clave de la columna que se debe validar. Corresponde a la propiedad key en columnsHeader.

                -   `dataType`: Una cadena que especifica el tipo de dato que se espera en la columna. Puede ser "string", "number", "boolean" o "date".

                -   `regexPattern` (opcional): Una expresión regular representada como una cadena que se utilizará para validar los valores en la columna. Esta propiedad es opcional.

            -   `cellRangeValidations`: Un arreglo de objetos que describe las validaciones de tipo de datos para rangos específicos de celdas en una hoja de trabajo.

                -   `sheetName`: Una cadena que representa el nombre de la hoja de trabajo a la que se aplicarán las validaciones.

                -   `startRow`: Un número que indica el número de fila de inicio para el rango de celdas a validar.

                -   `endRow`: Un número que indica el número de fila de fin para el rango de celdas a validar.

                -   `startCol`: Un número que indica el número de columna de inicio para el rango de celdas a validar.

                -   `endCol`: Un número que indica el número de columna de fin para el rango de celdas a validar.

                -   `dataType`: Una cadena que especifica el tipo de dato que se espera en el rango de celdas. Puede ser "string", "number", "boolean" o "date".

                -   `regexPattern` (opcional): Una expresión regular representada como una cadena que se utilizará para validar los valores en el rango de celdas. Esta propiedad es opcional.

    Ejemplo de objeto params:

    ```json
    {
        "sheetData": [
            {
                "sheetName": "Hoja1",
                "columnsHeader": [
                    {
                        "header": "Nombre",
                        "key": "name"
                    },
                    {
                        "header": "Edad",
                        "key": "age"
                    }
                ],
                "data": [
                    {
                        "name": "Juan",
                        "age": 25
                    },
                    {
                        "name": "María",
                        "age": 30
                    }
                ]
            },
            {
                "sheetName": "Hoja2",
                "columnsHeader": [
                    {
                        "header": "Producto",
                        "key": "product"
                    },
                    {
                        "header": "Precio",
                        "key": "price"
                    }
                ],
                "data": [
                    {
                        "product": "Producto A",
                        "price": 10
                    },
                    {
                        "product": "Producto B",
                        "price": 15
                    }
                ]
            }
        ],
        "filename": "test.xlsx",
        "options": {
            // Opciones de escritura del archivo (opcional)
        },
        "cellsValidations": {
            "columnValidations": [
                {
                    "sheetName": "Hoja1",
                    "columnKey": "nombre",
                    "dataType": "string",
                    "regexPattern": "/^[A-Za-z]+$/"
                }
                // Otras validaciones de columna...
            ],
            "cellRangeValidations": [
                {
                    "sheetName": "Hoja2",
                    "startRow": 2,
                    "endRow": 2,
                    "startCol": 1,
                    "endCol": 1,
                    "dataType": "number",
                    "regexPattern": "/^[A-Za-z]+$/"
                }
                // Otras validaciones de rango...
            ]
        }
    }
    ```

    Respuesta en caso de éxito:

    ```json
    {
        "status": true,
        "data": {
            "filepath": "ruta/del/archivo_generado.xlsx",
            "filename": "nombre del archivo descargado",
            "pathname": "directorio del archivo guardado"
        }
    }
    ```

    Respuesta en caso de error:

    ```json
    {
        "status": false,
        "error": "Mensaje de error"
    }
    ```

El método `createExcel` utiliza estos parámetros para generar un archivo Excel con hojas de trabajo, encabezados y datos personalizados. Luego, guarda el archivo en la ubicación especificada en `pathname`. En caso de éxito, devuelve un objeto con una propiedad `status` que indica si la operación fue exitosa (`true`) y, en caso de error, incluye una propiedad `error` que proporciona detalles sobre el error.

La clase es útil para crear informes, exportar datos y automatizar la generación de archivos Excel en aplicaciones Node.js.

## Contribuciones

Las contribuciones, problemas y solicitudes de características son bienvenidos. Siéntase libre de consultar la [página de issues](https://github.com/balearesg/bg-excel/issues) o abrir nuevas.

## Licencia

Este proyecto está bajo licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para obtener más información.
