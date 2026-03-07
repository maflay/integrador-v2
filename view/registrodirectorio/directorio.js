const u = metodoprueba();
const url =
  "https://script.google.com/macros/s/AKfycbzm21nyUv2px9kwUQoOCVd6M0usuN2WkqaNN6SQ4Iy6HzafpAaAAdIF7T_sOs8xtMCs/exec";
const btn_create_user = document.getElementById("btn_create_user");
const nombre = document.getElementById("nombre");
const numero = document.getElementById("numero");
const content_form = document.getElementById("content_form");

btn_create_user.addEventListener("click", () => {
  handleDirectorio();
});

function handleDirectorio() {
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

  if (!nombre.value || !numero.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "directorio",
    Hora: hora,
    Fecha: fecha,
    Numero: numero.value,
    Nombre: nombre.value,
  };

  btn_create_user.textContent = "Enviando...";
  content_form.classList.add("item_disable");
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      nombre.value = "";
      numero.value = "";
      btn_create_user.textContent = "Enviar";
      content_form.classList.remove("item_disable");
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      btn_create_user.textContent = "Error en el envió";
      content_form.classList.remove("item_disable");
      setTimeout(() => {
        btn_create_user.textContent = "Enviar";
      }, 2500);
    });
}
