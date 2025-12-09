window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const casino = document.getElementById("casino");
const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const disfraz = document.getElementById("disfraz");
const loader = document.getElementById("loader");

    const fechaCompleta = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [fecha, hora] = fechaCompleta.split(", ");

const url =
  "https://script.google.com/macros/s/AKfycbxEo-y2smoK_ezmYV4YoeMryE5hRb7Huu5J-hx5FthAVZqCn8QNlpaqL8kSMS31R37d/exec";

function validatePremio() {
  if (nombre.value == "" || cedula.value == "" || disfraz.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      html: "Por favor completa la información antes de enviar",
    });
  }

  const data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: cedula.value,
    valor_5: casino.value,
    valor_6: disfraz.value,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Creado con éxito",
        html: "El registro se ha creado con éxito.",
      });
      loader.style.display = "none";
    });
}
