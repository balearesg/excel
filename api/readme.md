# [@bg/excel](https://github.com/balearesg/bg-excel) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Este repositorio alberga una API Node.js desarrollada con Express que ofrece dos endpoints principales: `/generate/excel` y `/download`. El propósito de esta API es permitir a los usuarios generar archivos Excel a partir de los datos proporcionados y descargar esos archivos.

## Instalación

Para utilizar esta API en su proyecto, siga los siguientes pasos:

1. Clone este repositorio en su sistema local.

2. Instale las dependencias ejecutando el siguiente comando en el directorio `/project`:

    ```
    npm install
    ```

3. Inicie el servidor ejecutando el siguiente comando:

    ```
    beyond run --inspector 4000
    ```

Luego, vaya al [workspace de beyond](https://workspace.beyondjs.com/?port=4000) y ejecute la distribución de Node.

Ahora, puede acceder a los endpoints `/generate/excel` y `/download` para generar archivos Excel y descargarlos, respectivamente.

## Endpoints

### `/generate/excel`

#### Función `generateExcel` (Método POST)

La función `generateExcel` es una manejadora de solicitudes POST en una aplicación Node.js que utiliza Express. Su objetivo es crear archivos Excel basados en los datos proporcionados en el cuerpo de la solicitud y responder con la ubicación del archivo generado en caso de éxito. A continuación, se describe brevemente su implementación:

-   La función extrae los parámetros necesarios del cuerpo de la solicitud, como los datos de las hojas de trabajo y el nombre del archivo.
-   Realiza una validación para asegurarse de que los parámetros requeridos (`sheetData` y `filename`) estén presentes.
-   Utiliza la clase `ExcelHandler` para crear el archivo Excel con los datos y encabezados proporcionados.
-   Responde con un mensaje de éxito y la ubicación del archivo Excel generado si la operación se realiza con éxito.
-   En caso de errores, captura las excepciones y responde con un mensaje de error junto con los detalles del error.

Ejemplo de solicitud POST:

```
POST http://localhost:1080/generate/excel
Content-Type: application/json
```

```json
{
    "sheetData": [
        /* Datos de las hojas de trabajo */
    ],
    "filename": "nombre_del_archivo.xlsx",
    "options": {
        // Opciones de escritura del archivo (opcional)
    }
}
```

### `/download`

#### Método `download` (Método GET)

El método `download` es una función diseñada para gestionar la descarga de archivos y la eliminación posterior del archivo descargado. Esta función está diseñada para ser utilizada en un servidor Node.js con Express.

#### Parámetros

-   `pathFile` (String): La ubicación del archivo a descargar.
-   `filename` (String): El nombre del archivo que se mostrará al descargar.

#### Uso

El método `download` se utiliza para descargar un archivo y eliminarlo después de la descarga.

Comportamiento:

1. Verifica la existencia del archivo especificado en los parámetros.
2. Si el archivo no existe, responde con un estado HTTP 404 ("No encontrado").
3. Si el archivo existe, inicia la descarga del archivo especificado.
4. Después de la descarga exitosa, intenta eliminar el archivo.
5. Si la eliminación tiene éxito, el archivo se elimina del sistema de archivos.
6. Si se produce algún error durante la descarga o eliminación, se envía una respuesta de estado HTTP 500 con un mensaje de error.

Ejemplo de solicitud GET:

```
GET /download?pathFile=/ruta/al/archivo.xlsx&filename=archivo_descargado.xlsx
```

## Características Futuras

Estamos trabajando en la implementación de características adicionales para esta API. Próximamente, se agregarán las siguientes funcionalidades:

### Carga y Lectura de Archivos Excel

Añadiremos la capacidad de cargar archivos Excel, leer su contenido y devolver los datos contenidos en ellos. Esto permitirá a los usuarios realizar operaciones avanzadas con archivos Excel, como análisis de datos y procesamiento de hojas de cálculo.

## Contribuciones

Las contribuciones, problemas y solicitudes de características son bienvenidos. Siéntase libre de consultar la [página de issues](https://github.com/balearesg/bg-excel/issues) o abrir nuevas.

## Licencia

Este proyecto está bajo licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para obtener más información.
