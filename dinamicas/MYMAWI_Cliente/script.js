window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const casino = document.getElementById("casino");
const btn_send_M_cliente = document.getElementById("btn_send_M_cliente");
const loader = document.getElementById("loader");
const url =
  "https://script.google.com/macros/s/AKfycbzr27Z0h51fDqc9CmLTXrm_GpkG6NTzNW32TC44OKsJYXcpGTbGLtnbrE_ovMtIaD4k/exec";

const user = inforUser();

btn_send_M_cliente.addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  if (!nombre.value || !cedula.value || !casino.value) {
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
    Cedula: cedula.value,
    Casino: casino.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      nombre.value = "";
      cedula.value = "";
      casino.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}
