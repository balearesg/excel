# Método `download`

El método `download` es una función que maneja la descarga de archivos y la eliminación posterior del archivo descargado. Esta función está diseñada para ser utilizada en un servidor Node.js con Express.

## Parámetros

-   `req` (Request): El objeto de solicitud de Express.
-   `res` (Response): El objeto de respuesta de Express.

## Uso

El método `download` se utiliza para descargar un archivo y eliminarlo después de la descarga.

## Comportamiento

1. Verifica la existencia del archivo especificado en los parámetros.
2. Si el archivo no existe, responde con un estado HTTP 404 ("No encontrado").
3. Si el archivo existe, inicia la descarga del archivo especificado.
4. Después de la descarga exitosa, intenta eliminar el archivo.
5. Si la eliminación tiene éxito, el archivo se elimina del sistema de archivos.
6. Si se produce algún error durante la descarga o eliminación, se envía una respuesta de estado HTTP 500 con un mensaje de error.
