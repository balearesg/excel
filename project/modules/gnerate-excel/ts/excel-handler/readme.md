### Clase `ExcelHandler`

La clase `ExcelHandler` es una utilidad para generar archivos Excel en aplicaciones Node.js. Permite crear archivos Excel con hojas de trabajo personalizables, encabezados y datos. Los principales componentes de la clase son:

-   `_columnsHeader`: Almacena información sobre los encabezados de las columnas que se utilizarán en las hojas de trabajo.

-   `_workbook`: Representa el libro de trabajo de Excel y almacena hojas de trabajo, datos y configuraciones.

-   `createExcel`: El método `createExcel` es el corazón de la clase `ExcelHandler` y se encarga de crear un archivo Excel en función de los parámetros proporcionados. Recibe un solo parámetro, un objeto `params`, que contiene la información necesaria para generar el archivo Excel. Aquí se desglosan los componentes de `params`:

-   `params`: Un objeto que contiene los siguientes campos:

    -   `pathname`: Una cadena que representa la ruta donde se guardará el archivo Excel.

    -   `options`: Un objeto opcional que contiene opciones de escritura del archivo Excel, como formato, autor, etc.

    -   `filename`: Una cadena que especifica el nombre del archivo Excel que se creará.

    -   `sheetData`: Un arreglo de objetos que representan los datos y encabezados de cada hoja de trabajo en el archivo Excel. Cada objeto dentro de este arreglo debe contener:

        -   `sheetName`: Una cadena que es el nombre de la hoja de trabajo.
        -   `columnsHeader`: Un arreglo de objetos que especifica los encabezados de columnas para esa hoja de trabajo.
        -   `data`: Un arreglo que contiene los datos que se agregarán a la hoja de trabajo.

    -   `otherDataSets`: Un arreglo opcional de objetos que permite agregar conjuntos de datos adicionales en hojas de trabajo separadas. Cada objeto dentro de este arreglo debe contener información similar a la de `sheetData`.

El método `createExcel` utiliza estos parámetros para generar un archivo Excel con hojas de trabajo, encabezados y datos personalizados. Luego, guarda el archivo en la ubicación especificada en `pathname`. En caso de éxito, devuelve un objeto con una propiedad `status` que indica si la operación fue exitosa (`true`) y, en caso de error, incluye una propiedad `error` que proporciona detalles sobre el error.

La clase es útil para crear informes, exportar datos y automatizar la generación de archivos Excel en aplicaciones Node.js.
