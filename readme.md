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
