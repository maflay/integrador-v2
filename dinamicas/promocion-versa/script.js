window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

document.getElementById("send_prim").addEventListener("click", () => {
  handleSendInfo();
});

let loader = document.getElementById("loader");

function handleSendInfo() {
  let nombre = document.getElementById("nombre");
  let cedula = document.getElementById("cedula");
  let casino = document.getElementById("casino");
  let categoria = document.getElementById("categoria");
  let puntaje = document.getElementById("puntaje");
  let bono = document.getElementById("bono");
  let Promocion = "Sorteo VERSA";
  let user = inforUser();

  if (
    nombre.value == "" ||
    cedula.value == "" ||
    casino.value == "" ||
    categoria.value == "" ||
    puntaje.value == ""
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
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: cedula.value,
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: puntaje.value,
    valor_8: bono.value,
    valor_9: Promocion,
    valor_10: user.Nombre,
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
      cedula.value = "";
      casino.value = "";
      categoria.value = "";
      puntaje.value = "";
      bono.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: error,
        title: "Error en el envio",
      });
    });
}
