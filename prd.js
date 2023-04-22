<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
</head>
<body>
	<input type="file" id="excel-input" />
	<table id="tablappal">
		<thead>
			<tr></tr>
		</thead>
		<tbody>
		</tbody>
	</table>

	<br />

	<table id="n3">
		<thead>
			<tr></tr>
		</thead>
		<tbody>
		</tbody>
	</table>

	<br />

	<table id="n4">
		<thead>
			<tr></tr>
		</thead>
		<tbody>
		</tbody>
	</table>


	<br/>

	<span id="n1">Numero de productos con existencia mayor a 20: </span><br />
	<span id="n2">Numero de productos con existencia menos a 15: </span><br />
	<span id="n5">Numero de productos agrupados por su clasificacion: </span>
</body>
</html>
<script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
<script type="text/javascript">
	class Excel{
		constructor(content){
			this.content = content
		}

		header(){
			return this.content[0];
		}

		rows(){
			return new RowCollection(this.content.slice(1,this.content.length));
		}
	}

	class RowCollection{
		constructor(rows){
			this.rows = rows
		}

		get(index){
			return new Row(this.rows[index]);
		}

		count(){
			return this.rows.length;
		}
	}

	class Row{
		constructor(row){
			this.row = row;
		}

		clavedelproducto(){
			return this.row[0]
		}
		descripcion(){
			return this.row[1]
		}	
		precio(){
			return this.row[2]
		} 	
		clasificacion(){
			return this.row[3]
		}	
		cantidaddeexistencia(){
			return this.row[4]
		}	
		existenciaminima(){
			return this.row[5]
		}	
		existenciamaxima(){
			return this.row[6]
		}
	}

	class ExcelPrinter{
		static print(tableid,excel){
			const table =document.getElementById(tableid);
			const n3 = document.getElementById('n3');
			const n4 = document.getElementById('n4');
			var n1 = 0;
			var n2 = 0;
			var n5 = 0;
			var classification = 'prueba'

			excel.header().forEach(title => {
				//table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
				n3.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
				n4.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
			})

			for (var i = 0; i < excel.rows().count(); i++) {
				const row = excel.rows().get(i);

				if (row.cantidaddeexistencia() < 15) {
					n2++;
				}

				if (row.cantidaddeexistencia() > 20) {
					n1++;
				}

				/*table.querySelector("tbody").innerHTML += `
								<tr>
									<td>${row.clavedelproducto()}</td>
									<td>${row.descripcion()}</td>
									<td>${row.precio()}</td>
									<td>${row.clasificacion()}</td>
									<td>${row.cantidaddeexistencia()}</td>
									<td>${row.existenciaminima()}</td>
									<td>${row.existenciamaxima()}</td>
								</tr>
							`*/
			}

			document.getElementById('n1').innerHTML += n1;
			document.getElementById('n2').innerHTML += n2;

			for (var i = 0; i < excel.rows().count(); i++) {
				const row = excel.rows().get(i);

				if (row.precio() > 20.30 && row.precio() < 45) {				
					n4.querySelector("tbody").innerHTML += `
									<tr>
										<td>${row.clavedelproducto()}</td>
										<td>${row.descripcion()}</td>
										<td>${row.precio()}</td>
										<td>${row.clasificacion()}</td>
										<td>${row.cantidaddeexistencia()}</td>
										<td>${row.existenciaminima()}</td>
										<td>${row.existenciamaxima()}</td>
									</tr>
								`
				}

				if (row.clasificacion() == classification && row.precio() > 15.50) {				
					n3.querySelector("tbody").innerHTML += `
									<tr>
										<td>${row.clavedelproducto()}</td>
										<td>${row.descripcion()}</td>
										<td>${row.precio()}</td>
										<td>${row.clasificacion()}</td>
										<td>${row.cantidaddeexistencia()}</td>
										<td>${row.existenciaminima()}</td>
										<td>${row.existenciamaxima()}</td>
									</tr>
								`
				}
			}
		}
	}

	const excelInput = document.getElementById('excel-input');

	excelInput.addEventListener('change',async function(){
		const content = await readXlsxFile(excelInput.files[0])

		const excel = new Excel(content);

		ExcelPrinter.print('tablappal',excel)
		//console.log(ExcelPrinter.print('tablappal',excel));

		//console.log(excel.rows().first());
	})
</script>