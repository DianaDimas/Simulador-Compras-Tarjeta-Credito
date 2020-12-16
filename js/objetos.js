function capturar(){
    
    function Compras(nomCompra, valor, ncuotas, pagar) {
        this.nomCompra = nomCompra
        this.valor = valor
        this.ncuotas = ncuotas
        this.pagar = pagar
    }
    
    valorCapturar = Number($('#inputMonto').val())
    cuotaCapturar = Number($('#selectCuota').val())
    descripcionCapturar = $('#descripcion').val()
    let    montoCuotaU

   if (valorCapturar <= 0 &&  cuotaCapturar <= 0){
        alert('Los valores ingresado no son válido')
    } else {
        montoCuotaU = calculoPagar()

        nuevaCompra = new Compras(descripcionCapturar, valorCapturar, cuotaCapturar, montoCuotaU)
        console.log(nuevaCompra)
        agregar()
    }
   
    function calculoPagar(){
        const interes = (2.02 / 100)
        let cuotaMes = Math.round((valorCapturar * interes) / (1 - Math.pow((1 + interes), (-cuotaCapturar))))
        console.log(cuotaMes)
        return cuotaMes
    }
    
   
}






