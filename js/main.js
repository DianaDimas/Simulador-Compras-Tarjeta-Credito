const mes = $('#mes'),
      anio = $('#anio'),
      formulario = $('#formularioTarjeta'),
      numeroTarjeta = $('#numTarjeta'),
      nombreTarjeta = $('#nombre'),
	  logoMarca = $('#logoMarca'),
	  compras = $('#totalCompras'),
	  add = $('#btnEnviar'),
	  reinicio = $('#btnReiniciar'),
	  cuota = $('#totalPrimeraCuota'),
	  mostrarTabla = $('#grupoTabla')
	  

let baseDatos = [],
	listaCompras,
	copiaBaseDatos
	
$.ajax({
    type: "GET",
    url: "js/meses.json", 
    dataType: "json",
    success: function(data){
      $.each(data,function(i) {
		selectMes.append(new Option(data[i].id, data[i].valor))
      });        
    },
    error: function(data) {
      alert('error');
    }
  });

const anioActual = new Date().getFullYear();
for(let i = anioActual-4; i <= anioActual + 4; i++){
	
	let optionValue = i,
		optionText =i
	selectAnio.append(new Option(optionText, optionValue))
}


// ----------------- FUNCIONES --------------------
function verificacionNum(e){
    let valorInput = $(e.target).val()

    $('#inputNumero').val( valorInput.replace(/\s/g, '')
    .replace(/\D/g, '')
    .replace(/([0-9]{4})/g, '$1 ')
    .trim())
    
    numeroTarjeta.text(valorInput)
    
    if(valorInput == ''){
		numeroTarjeta.text('#### #### #### ####') 
		logoMarca.html('')
	} else if(valorInput[0] == 4){
		logoMarca.html('')
		const imagen = $('<img>')
		imagen.attr('src','img/logos/visa.png')
		logoMarca.append(imagen)
	} else if(valorInput[0] == 5){
		logoMarca.html('')
		const imagen = $('<img>')
		imagen.attr('src','img/logos/mastercard.png')
		logoMarca.append(imagen)
	}
}

function verificacionNom(e){
    let valorInput = $(e.target).val()

	$('#inputNombre').val(valorInput.replace(/[0-9]/g, '')) 
	nombreTarjeta.text(valorInput)
	
	if(valorInput == ''){
		nombreTarjeta.text('XXXX XXXX') 
	}
}

function agregar(){
	limpiarCampos()
	baseDatos.push(nuevaCompra)
	console.log(baseDatos)
	listaCompras += '<tr><td>' + nuevaCompra.nomCompra + '</td><td>' + nuevaCompra.valor + '</td><td>' + nuevaCompra.ncuotas + '</td><td>' + nuevaCompra.pagar + '</td></tr>'
	$('#tbody').html(listaCompras)
	copiaBaseDatos = JSON.stringify(baseDatos)
	localStorage.setItem("Compras",copiaBaseDatos)
	compras.val(comprasT()) 
	cuota.val(cuotaT())
	mostrarTabla.show()
	$('html, body').animate({
		scrollTop: $("#resultados").offset().top
	}, 2000)
}

function cuotaT(){
	let cuotaTotal = 0
	for(let i in baseDatos){
		cuotaTotal += baseDatos[i].pagar
	}
	return cuotaTotal
} 

function comprasT(){
	let comprasTotales = 0
	for(let i in baseDatos){
		comprasTotales += baseDatos[i].valor
	}
	return comprasTotales
} 

function limpiarCampos(){
	$('#inputMonto').val('')
	$('#selectCuota').val('')
	$('#descripcion').val('')
}

function borrar(){
	numeroTarjeta.text('#### #### #### ####')
	logoMarca.html('')
	nombreTarjeta.text('XXXX XXXX')
	mes.text("MM")
	anio.text("AA")
	baseDatos.length = 0
	localStorage.clear()
	listaCompras = ""
	compras.val("")
	cuota.val("")
	$("#tabla > tbody > tr").remove()
	mostrarTabla.slideUp(1000)
	$('html, body').animate({
		scrollTop: $("#tarjeta").offset().top
	}, 1000)
}

function recuperoCompras() {
	let guardado = JSON.parse(localStorage.getItem('Compras'))
	if (guardado.length > 0) {
		for (let i = 0; i < guardado.length; i++) {
			listaCompras += '<tr><td>' + guardado[i].nomCompra + '</td><td>' + guardado[i].valor + '</td><td>' + guardado[i].ncuotas + '</td><td>' + guardado[i].pagar + '</td></tr>'
			$('#tbody').html(listaCompras)
            
        }    
	}
	mostrarTabla.show()	
}
 

// ------------------- EVENTOS ----------------------------------
$('#inputNumero').keyup(verificacionNum)

$('#inputNombre').keyup(verificacionNom)

$('#selectMes').on('change',(e) => { mes.text($(e.target).val())})

$('#selectAnio').on('change',(e) => { anio.text($(e.target).val().slice(2))})

add.on('click', capturar)

reinicio.on('click', borrar)

document.body.onload = function() {
    recuperoCompras();
}





