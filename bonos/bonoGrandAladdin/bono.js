window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let emailValido = false;
const celular = document.getElementById("celular");

const _check_mayor_ = document.getElementById("_check_mayor_");

const num_one = document.getElementById("num_one");
const num_dos = document.getElementById("num_dos");
const result_cap = document.getElementById("result_cap");

const _btn_get_bono_ = document.getElementById("_btn_get_bono_");

const BONO_KEY = "4RT&%#B0N0%GR4N414DD1N";

// if(!localStorage.getItem(BONO_KEY)){
//       localStorage.setItem(BONO_KEY, "OBTENIDO");
// } else {
//     window.location.replace("https://grandaladdin.com/") ;
// }

function validarEmailAislado() {
  const valor = emailInput.value.trim();

  // 1. Validación de campo vacío
  if (valor === '') {
    mostrarError('El correo electrónico no puede estar vacío.');
    emailValido = false;
    return;
  }

  // 2. Validación de formato estructurado con RegEx
  if (!emailRegex.test(valor)) {
    mostrarError('Introduce un formato válido (ejemplo@correo.com).');
    emailValido = false;
    return;
  }

  // 3. Si todo es correcto, limpia el error
  ocultarError();
  emailValido = true;
}

_btn_get_bono_.addEventListener("click", ()=> {
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
    Email: email.value,
    Numero: celular.value,
    Mayor: _check_mayor_.checked,
    Captcha: result_cap.value
  };

  console.log(data);
}
