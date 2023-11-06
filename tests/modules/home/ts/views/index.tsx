import * as React from "react";
import { Code } from "pragmate-ui/code";
import { implementationGenerateExcel } from "./implementations";
import { Action } from "./action";
export /*bundle*/
	function View(): JSX.Element {
	return (
		<div className="excel-api">
			<h1>
				<a
					href="https://github.com/balearesg/bg-excel"
					target="_blank"
					rel="noopener noreferrer"
				>
					@bg/excel (Implementación)
				</a>
			</h1>
			<p>
				@bg/excel  es una API para generar y descargar archivos
				Excel, con futuras funciones de carga y lectura.
			</p>

			<div className="endpoints">
				<h2>Endpoints</h2>
				<p>Aquí están los dos endpoints principales de la API:</p>
				<div className="endpoint">
					<h3>/generate/excel (Método POST)</h3>
					<p>
						Permite generar archivos Excel a partir de los datos
						proporcionados en el cuerpo de la solicitud.
					</p>
					<div className="endpoint">
						<h3>/download (Método GET)</h3>
						<p>
							Permite descargar archivos Excel y eliminarlos después
							de la descarga.
						</p>
						<pre>
							GET
							/download?pathFile=/ruta/al/archivo.xlsx&filename=archivo_descargado.xlsx
						</pre>
					</div>
					<Code>{implementationGenerateExcel}</Code>
					<p>Donde los parámetros de /generate/excel son los siguientes:</p>
					<ul>
						<li>
							<strong>options</strong>: Un objeto opcional que
							contiene opciones de escritura del archivo Excel,
							como formato, autor, etc.
						</li>
						<li>
							<strong>filename</strong>: Una cadena que especifica
							el nombre del archivo Excel que se creará.
						</li>
						<li>
							<strong>sheetData</strong>: Un arreglo de objetos
							que representan los datos y encabezados de cada hoja
							de trabajo en el archivo Excel. Cada objeto dentro
							de este arreglo debe contener:
							<ul>
								<li>
									<strong>sheetName</strong>: Una cadena que
									es el nombre de la hoja de trabajo.
								</li>
								<li>
									<strong>columnsHeader</strong>: Un arreglo
									de objetos que especifica los encabezados de
									columnas para esa hoja de trabajo.
								</li>
								<li>
									<strong>data</strong>: Un arreglo que
									contiene los datos que se agregarán a la
									hoja de trabajo.
								</li>
							</ul>
						</li>
					</ul>

					<p>Donde los parámetros de /download son los siguientes:</p>
					<ul>
						<li>
							<strong>pathFile</strong>: ruta del archivo a descargar
						</li>
						<li>
							<strong>filename</strong>: nombre del archivo a descargar
						</li>

					</ul>
				</div>
				<Action />
			</div>
		</div>
	);
}
