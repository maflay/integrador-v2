window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const loader = document.getElementById("loader");
const nombre = document.getElementById("nombre");
const casino = document.getElementById("casino");
const _valor_apostado_ = document.getElementById("_valor_apostado_");
const _valor_apostado_int_ = document.getElementById("_valor_apostado_int_");
const _btn_send_wplay_ = document.getElementById("_btn_send_wplay_");
const Promocion = "W Play";
const user = inforUser();
const url =
  "https://script.google.com/macros/s/AKfycbwDld25MHRHAMWczFu6rHQDSL0uBm_Q9AqhKR49MvFm75Dt4OfU9T1_3T2N7CR4GQQO/exec";

_btn_send_wplay_.addEventListener("click", () => {
  handleSendWplay();
});

_valor_apostado_.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor === "") {
    e.target.value = "";
    return;
  }
  _valor_apostado_int_.value = valor;

  let numero = parseInt(valor, 10);

  let valorFormateado = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numero);

  e.target.value = valorFormateado;
});

function handleSendWplay() {
  if (!nombre.value || !casino.value || !_valor_apostado_.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
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

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Casino: casino.value,
    Promocion: Promocion,
    Usuario: user.Nombre,
    Valor: _valor_apostado_int_.value,
  };

  loader.style.display = "flex";

  fetch(`${url}?hoja=dinamica`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      nombre.value = "";
      casino.value = "";
      _valor_apostado_.value = "";
      _valor_apostado_int_.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envio",
      });
    });
}
