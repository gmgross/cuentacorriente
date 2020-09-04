const $monto = document.getElementById("monto");
const $depositar = document.getElementById("depositar");
const $extraer = document.getElementById("extraer");
const $datos = document.getElementById("datos");
const $balance = document.getElementById("balance");
let balance = 0;

function depositar() {
  let monto = $monto.value;
  monto = parseInt(monto);
  if (revisionMonto() == false) {
    return;
  }
  balance = balance + monto;
  operacion(monto);
};
function revisionMonto(){
    let monto = $monto.value;
    monto = parseInt(monto);
    if (monto < 0 || isNaN(monto)) {
        alert("Ingrese un monto");
        borrarMonto();
        return false;
      }
}

function extraer() {
  let monto = $monto.value;
  monto = parseInt(monto);
  if (revisionMonto() == false) {
    return;
  }
  if (balance - monto < 0) {
    alert("Saldo insuficiente");
    borrarMonto();
    return;
  }
  balance = balance - monto;
  operacion(monto * -1);
};

function operacion(monto) {
  const clase = monto <= 0 ? "text-danger" : "text-success";
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const anio = fecha.getFullYear();
  const tr = document.createElement("tr");
  const template = `
                  <td>${dia}/${mes}/${anio}</td>
                  <td class="${clase} font-weight-bold">$${monto}</td>
                  <td>$${balance}</td>
              `;
  tr.innerHTML = template;
  $datos.appendChild(tr);
  $balance.innerHTML = `$${balance}`;
  borrarMonto();
}

function borrarMonto() {
  $monto.value = "";
}