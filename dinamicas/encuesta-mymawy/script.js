window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const si_usa = document.getElementById("si_usa");
const no_usa = document.getElementById("no_usa");
const nombre = document.getElementById("nombre");
const casino = document.getElementById("casino");
const cedula = document.getElementById("cedula");
const _motivo_no_uso_ = document.getElementById("_motivo_no_uso_");
const btn_send_encuesta_m = document.getElementById("btn_send_encuesta_m");
const loader = document.getElementById("loader");
const user = inforUser();
const url =
  "https://script.google.com/macros/s/AKfycbwZuHnOF9ksS8nPQ2xHPgb1elWkQdIWWvsZAZFo0eqnIVMYQvsU2HQUDQ0RP4ehU9oM/exec";

si_usa.addEventListener("click", () => {
  if (no_usa.checked == true) {
    no_usa.checked = false;
    si_usa.checked = true;
  }

  if (si_usa.checked == true) {
    _motivo_no_uso_.style.display = "none";
  }
});

no_usa.addEventListener("click", () => {
  if (si_usa.checked == true) {
    si_usa.checked = false;
    no_usa.checked = true;
  }

  if (no_usa.checked == false) {
    _motivo_no_uso_.style.display = "none";
  }

  if (no_usa.checked == true) {
    _motivo_no_uso_.style.display = "flex";
  }
});

btn_send_encuesta_m.addEventListener("click", () => {
  handleEncuestaMy();
});

function handleEncuestaMy() {
  if (
    !nombre.value ||
    !casino.value ||
    !cedula.value   
  ) {
    Swal.fire({
      icon: "warning",
      title: "Completa la información",
    });
    return;
  }


  if(si_usa.checked == false &&
    no_usa.checked == false ||
    no_usa.checked == true ? !_motivo_no_uso_.value : ""){
    Swal.fire({
      icon: "warning",
      title: "Completa la información",
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
    Cedula: cedula.value,
    Usa_mymawi:
      si_usa.checked == true
        ? "SI"
        : no_usa.checked == true
          ? "No"
          : "Sin Respuesta",
    Motivo_uso:
      no_usa.checked == true ? _motivo_no_uso_.value : "Usa la Tarjeta",
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
      loader.style.display = "none";
      casino.value = "";
      nombre.value = "";
      _motivo_no_uso_.value = "";
      cedula.value = "";
      _motivo_no_uso_.style.display = "none";
      si_usa.checked = false;
      no_usa.checked = false;
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
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
