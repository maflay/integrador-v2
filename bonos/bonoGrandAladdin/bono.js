window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const email = document.getElementById("email");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let emailValido = false;
const celular = document.getElementById("celular");

const _check_mayor_ = document.getElementById("_check_mayor_");

const num_one = document.getElementById("num_one");
const num_dos = document.getElementById("num_dos");
let total_cap;
const result_cap = document.getElementById("result_cap");

const _btn_get_bono_ = document.getElementById("_btn_get_bono_");

const BONO_KEY = "4RT&%#B0N0%GR4N414DD1N";

if (!localStorage.getItem("4RT&%#B0N0%GR4N414DD1N")) {
  localStorage.setItem("4RT&%#B0N0%GR4N414DD1N", "OBTENIDO");
}

GenerateCaptcha();
function GenerateCaptcha() {
  num_one.textContent = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  num_dos.textContent = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  total_cap = Number(num_one.textContent) + Number(num_dos.textContent);
}

email.addEventListener("input", () => {
  const val = email.value.trim();

  const ok = emailRegex.test(val);

  email.classList.toggle("invalid", !ok);
  email.classList.toggle("valid", ok);

  email.setCustomValidity(ok ? "" : "Correo inválido");
  // help.textContent = ok
  //   ? ""
  //   : "Escribe un correo válido (ej. usuario@aladdin.com)";
});

function accionRedire() {
  localStorage.removeItem(BONO_KEY);
  window.location.replace("https://grandaladdin.com/");
}

let diasVigencia = 30;

function crearItemConVigencia(dias) {
  const fechaCreacion = new Date();

  const fechaExpiracion = new Date(fechaCreacion);
  fechaExpiracion.setDate(fechaCreacion.getDate() + dias);

  //   return {
  //     item: nombreItem,
  //     creado: fechaCreacion.toLocaleDateString('es-ES'),
  //     expira: fechaExpiracion.toLocaleDateString('es-ES'),
  //     expiraTimestamp: fechaExpiracion.getTime()
  //   };

  return (expira = fechaExpiracion.toLocaleDateString("es-ES"));
}

_btn_get_bono_.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  if (_check_mayor_.checked == false) {
    Swal.fire({
      icon: "warning",
      title: "No eres Mayor de Edad",
    });
    return;
  }

  if (nombre.value == "" || email.value == "" || celular.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (result_cap.value != total_cap) {
    Swal.fire({
      icon: "warning",
      title: "Captcha no Válido",
    });
    return;
  }
  let vigenciaBono = crearItemConVigencia(diasVigencia);

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
    tipo: "bonos",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Cedula: cedula.value,
    Email: email.value,
    Numero: celular.value,
    Fecha_vigencia: vigenciaBono,
    Mayor: _check_mayor_.checked,
    Captcha: result_cap.value,
  };

  document.getElementById("loader").style.display = "flex";

  fetch(
    `https://script.google.com/macros/s/AKfycbz-VLY3H239stpOnjb0WkDEQ6EoB6nWiPTjmmt-sHp9GAmhNpbo4EHo5JUs1AtFLSh4kw/exec?hoja=bonos&cedula=${cedula.value}`,
  )
    .then((res) => res.json())
    .then((info) => {
      if (info.length > 0) {
        Swal.fire({
          icon: "info",
          title: "Bono ya solicitado",
          html: "El número de cédula ya tiene una solicitud, puede acercarse a GrandAladdin para reclamar tu bono.",
        });
        document.getElementById("loader").style.display = "none";
        return;
      }
      fetch(
        "https://script.google.com/macros/s/AKfycbz-VLY3H239stpOnjb0WkDEQ6EoB6nWiPTjmmt-sHp9GAmhNpbo4EHo5JUs1AtFLSh4kw/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        },
      )
        .then((res) => res.text())
        .then(() => {
          document.getElementById("loader").style.display = "none";
          nombre.value = "";
          cedula.value = "";
          email.value = "";
          celular.value = "";
          _check_mayor_.checked = false;
          result_cap.value = "";
          num_one.textContent = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
          num_dos.textContent = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
          total_cap = Number(num_one.textContent) + Number(num_dos.textContent);
          email.classList.remove("invalid");
          email.classList.remove("valid");
          Swal.fire({
            icon: "success",
            title: "Solicitud Enviada",
            html: "La información se envió para la creación del bono, puede acercarse a GrandAladdin para reclamar tu bono.",
          });
        })
        .catch((error) => {
          document.getElementById("loader").style.display = "none";
          Swal.fire({
            icon: "error",
            title: "Error en el Envió",
            html: "Puede acercarse a GrandAladdin para solicitar tu bono.",
          });
        });
    });
}
