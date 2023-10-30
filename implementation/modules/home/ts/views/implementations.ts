export const implementationGenerateExcel = `
const generate = async () => {

    const params = {
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
        "filename": "test1.xlsx",
        "options": {}
    }
    const apiURL = 'http://localhost:1080/';
    const url = apiURL + 'generate/excel';
    try {
        let response: any = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        response = await response.json();
        const data = response.data
        const urlDownload = \`\${apiURL}download?pathFile=\${data.pathFile}&filename=\${data.filename}\`;
        window.open(urlDownload, '_blank');

    } catch (error) {
        console.log("error", error)
    };

}
`