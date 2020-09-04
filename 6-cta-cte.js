
function agregarOperacion(tipoOperacion, montoIngresado){
    if (document.getElementById(montoIngresado).value != 0) {
        let balance = calculoBalance(tipoOperacion, document.getElementById(montoIngresado).value);
        if (balance != -1) {
            agregarLineaTabla(tipoOperacion, document.getElementById(montoIngresado).value, balance);
            document.getElementById("CuentaCorriente").style.display = '';
            cambioBoton("accionado","inicial","balanceTotal")
        }        
    }
    
}

function agregarLineaTabla(tipoOperacion, montoIngresado, balance) {
    let tbody = document.getElementById("bodyMovimientos"); 
    let hilera = document.createElement("tr");
    let textoCelda
    for (var j = 0; j < 3; j++) {
        let celda = document.createElement("td");
      switch (j) {
        case 0:
            textoCelda = document.createTextNode(DateAString(new Date()));
            break;
        case 1:
              if (tipoOperacion == 'extraccion') {
                celda.classList.add("text-danger");
                montoIngresado = montoIngresado * -1;
              } else {
                celda.classList.add("text-success");
              }
              textoCelda = document.createTextNode("$"+montoIngresado);
              break;
        case 2:
              textoCelda = document.createTextNode(balance);
              break;
      
          default:
              break;
      }      
      celda.append(textoCelda);
      hilera.append(celda);
    }
    tbody.append(hilera);
}

function cambioBoton(formulario, bloqueInicial,balanceTotal){
    var blokinicial = document.getElementById(bloqueInicial);
    if (document.getElementById(bloqueInicial).style.display == '' ) {
        document.getElementById(formulario).style.display = '';
        document.getElementById(balanceTotal).style.display = '';
        document.getElementById(bloqueInicial).style.display ='none';

    } else {
        document.getElementById(formulario).style.display = 'none';
        document.getElementById(bloqueInicial).style.display ='';    
    }
}



function calculoBalance( tipoOperacion, montoIngresado){
    let balanceActual = document.querySelector("span.balance").innerHTML.slice(1);
    balanceActual = parseInt(balanceActual,10);
    if (tipoOperacion == 'extraccion') {
        balanceActual = ( balanceActual - montoIngresado );
        if (balanceActual < 0) {
            alert("No posee suficiente dinero, trate depositando");
            balanceActual = -1;
        }
    } else {
        balanceActual = Number(montoIngresado) + Number(balanceActual);        
    }
    if (balanceActual != -1) {
        balanceActual = "$"+balanceActual;
        document.querySelector("span.balance").innerHTML = balanceActual; 
    }    
    return balanceActual;
}

function DateAString(date){
    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    return (dd + "/" + MM + "/" + yyyy);
 }