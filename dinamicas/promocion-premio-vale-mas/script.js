window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

let nombre = document.getElementById("nombre");
let cedula = document.getElementById("cedula");
let casino = document.getElementById("casino");
let categoria = document.getElementById("categoria");
let num_bono = document.getElementById("num_bono");
let val_bono = document.getElementById("val_bono");
let premio = document.getElementById("premio");
let num_maqui = document.getElementById("num_maqui");
let loader = document.getElementById("loader");
let promocion = "Tu premio vale Más";
let btn_send_pvm = document.getElementById("btn_send_pvm");
let url = "https://script.google.com/macros/s/AKfycbx8u085SJYtVJqt3sOIFmacbqi-GQaOVteo1iADPNT30qv2Gi2tPj4drOfZC0ATOK0nBA/exec";

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

val_bono.addEventListener("input", (e) => {
  let soloDigitos = e.target.value.replace(/\D/g, "");
  if (!soloDigitos) {
    e.target.value = "";
    return;
  }
  e.target.value = formatoPesos_monto_efectivo.format(Number(soloDigitos));
});

premio.addEventListener("input", (e) => {
  let soloDigitos = e.target.value.replace(/\D/g, "");
  if (!soloDigitos) {
    e.target.value = "";
    return;
  }
  e.target.value = formatoPesos_monto_efectivo.format(Number(soloDigitos));
});

let user = inforUser();

btn_send_pvm.addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  if (
    cedula.value == "" ||
    nombre.value == "" ||
    casino.value == "" ||
    categoria.value == "" ||
    num_bono.value == "" ||
    val_bono.value == "" ||
    premio.value == "" ||
    num_maqui.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campós Incompleto",
    });
    return;
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  let data_body = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Cedula: cedula.value,
    Casino: casino.value,
    Categoria: categoria.value,
    Num_bono: num_bono.value,
    Val_bono: val_bono.value,
    Premio: premio.value,
    Num_maquina: num_maqui.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data_body),
  })
    .then((res) => res.text())
    .then(() => {
      nombre.value = "";
      cedula.value = "";
      casino.value = "";
      categoria.value = "";
      num_bono.value = "";
      val_bono.value = "";
      premio.value = "";
      num_maqui.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}
