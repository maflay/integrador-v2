window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const btn_send_clinew = document.getElementById("btn_send_clinew");

btn_send_clinew.addEventListener("click", () => {
  handleSendClinew();
});

const user = inforUser();
const url =
  "https://script.google.com/macros/s/AKfycbzgU-J1B06CqU2wMKV-dI2AU8ANccoM1Zb4KZz3ALGiVORyPAZdQaxcLZCeJ7tnIt_Z/exec";

function handleSendClinew() {
  let nombre = document.getElementById("nombre");
  let cedula = document.getElementById("cedula");
  let telefono = document.getElementById("telefono");
  let casino = document.getElementById("casino");

  if (
    nombre.value.trim() === "" ||
    cedula.value.trim() === "" ||
    telefono.value.trim() === "" ||
    casino.value.trim() === ""
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

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Casino: casino.value,
    Telefono: telefono.value,
    Cedula: cedula.value,
    Usuario: user.Nombre,
    Promocion: "Clientes Nuevos",
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      nombre.value = "";
      casino.value = "";
      telefono.value = "";
      cedula.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio Exitóso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}
