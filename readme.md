# @bg/excel

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Este repositorio contiene una API Node.js desarrollada con Express que tiene dos endpoints principales: `/generate/excel` y `/download`. El objetivo de esta API es permitir a los usuarios generar archivos Excel a partir de datos proporcionados y descargar esos archivos.

## Endpoints

### `/generate/excel`

#### Función `generateExcel` (Método POST)

La función `generateExcel` es una manejadora de solicitudes POST en una aplicación Node.js que utiliza Express. Su propósito es crear archivos Excel basados en los datos proporcionados en el cuerpo de la solicitud y responder con la ubicación del archivo generado en caso de éxito. A continuación, se describe brevemente su implementación:

-   La función toma los parámetros necesarios del cuerpo de la solicitud, como los datos de las hojas de trabajo y el nombre del archivo.
-   Valida la presencia de los parámetros requeridos (`sheetData` y `filename`).
-   Utiliza la clase `ExcelHandler` para crear el archivo Excel con los datos y encabezados proporcionados.
-   Responde con un mensaje de éxito y la ubicación del archivo Excel generado si la operación fue exitosa.
-   En caso de errores, captura las excepciones y responde con un mensaje de error junto con los detalles del error.

Ejemplo de solicitud POST:

```json
POST /generate/excel
{
    "sheetData": [/* Datos de las hojas de trabajo */],
    "filename": "nombre_del_archivo.xlsx"
}
```

### `/download`

#### Método `download` (Método GET)

El método `download` es una función que maneja la descarga de archivos y la eliminación posterior del archivo descargado. Esta función está diseñada para ser utilizada en un servidor Node.js con Express.

## Parámetros

-   `pathFile` (String): La ubicación del archivo a descargar.
-   `filename` (String): El nombre del archivo a mostrar al descargar.

## Uso

El método `download` se utiliza para descargar un archivo y eliminarlo después de la descarga.

Comportamiento:

1. Verifica la existencia del archivo especificado en los parámetros.
2. Si el archivo no existe, responde con un estado HTTP 404 ("No encontrado").
3. Si el archivo existe, inicia la descarga del archivo especificado.
4. Después de la descarga exitosa, intenta eliminar el archivo.
5. Si la eliminación tiene éxito, el archivo se elimina del sistema de archivos.
6. Si se produce algún error durante la descarga o eliminación, se envía una respuesta de estado HTTP 500 con un mensaje de error.

Ejemplo de solicitud GET:

```json
GET /download?pathFile=/ruta/al/archivo.xlsx&filename=archivo_descargado.xlsx
```

## Instalación

Para utilizar esta API en su proyecto, siga los siguientes pasos:

1. Clone este repositorio en su sistema local.

2. Instale las dependencias ejecutando el siguiente comando:

    ```
    npm install
    ```

3. Inicie el servidor ejecutando el siguiente comando:

    ```
    npm start
    ```

Ahora, puede acceder a los endpoints `/generate/excel` y `/download` para generar archivos Excel y descargarlos, respectivamente.

¡Disfrute utilizando esta API para crear y descargar archivos Excel en su aplicación Node.js con Express!
