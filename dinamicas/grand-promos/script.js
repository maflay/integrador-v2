window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

document.getElementById("btn_send_form_ga").addEventListener("click", () => {
  handleSendPGr();
});

let url =
  "https://script.google.com/macros/s/AKfycbzKitn9dCJBeDtELedGxkU7T0CrsvebTyP5QBpPijVRTosavJbhLr8rZVoPh6JNa-8ung/exec";
let user = inforUser();

function handleSendPGr() {
  let cedula = document.getElementById("cedula");
  let nombre = document.getElementById("nombre");
  let telefono = document.getElementById("telefono");
  let casino = document.getElementById("casino");
  let promo_gr = document.getElementById("promo-gr");

  if (
    cedula.value == "" ||
    nombre.value == "" ||
    telefono.value == "" ||
    casino.value == "" ||
    promo_gr.value == ""
  ) {
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

  let data_send = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Casino: casino.value,
    Telefono: telefono.value,
    Cedula: cedula.value,
    Promocion: promo_gr.value,
    Usuario: user.Nombre,
  };
  loader.style.display = "flex";
  fetch(`${url}?cedula=${cedula.value}&promo=${promo_gr.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length >= 3) {
        loader.style.display = "none";
        Swal.fire({
          icon: "warning",
          title: "El Jugador ya existe",
          html: "El Jugados ya cumplió con la condición de máximos 3 turno por promoción, gracias por participar",
        });
      } else {
        fetch(url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data_send),
        })
          .then((res) => res.text())
          .then(() => {
            loader.style.display = "none";
            nombre.value = "";
            casino.value = "";
            cedula.value = "";
            telefono.value = "";
            promo_gr.value = "";
            Swal.fire({
              icon: "success",
              title: "Envio Exitoso",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error en el envio",
            });
          });
      }
    });
}
