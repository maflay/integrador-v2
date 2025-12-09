// Elimina esto:
// rollButton.addEventListener("click", rollDice);

// Nueva forma: inputs = dados
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});
document.getElementById("input1").addEventListener("input", (e) => {
  const input2 = document.getElementById("input2");
  setTimeout(() => {
    input2.disabled = false;
  }, 1500);
  handleAutoInput(e);
});
document.getElementById("input2").addEventListener("input", (e) => {
  const input3 = document.getElementById("input3");
  setTimeout(() => {
    input3.disabled = false;
  }, 1500);
  handleAutoInput(e);
});
document.getElementById("input3").addEventListener("input", (e) => {
  handleAutoInput(e);
});

document.getElementById("btn_opciones").addEventListener("click", () => {
  document.getElementById("modal_opciones_tren").style.display = "flex";
  btn_guardar_registro.classList.add("select_menu");
  view_guardar_registro.style.display = "flex";
});

document.getElementById("close_modal_icon").addEventListener("click", () => {
  document.getElementById("modal_opciones_tren").style.display = "none";

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia"
);
notificacion_registro_dia.style.display = "none";

const user = inforUser();
const loader = document.getElementById("loader");

// menu modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");

// views modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion"
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

view_envio_secundario.style.display = "none";
view_envia_observacion.style.display = "none";
view_tabla_premios.style.display = "none";
view_registro_dia.style.display = "none";

btn_guardar_registro.addEventListener("click", () => {
  view_guardar_registro.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.add("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_envio_secundario.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_observacion.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_tabla_premios.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_registro_dia.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");
});

// IDs de los campos requeridos
const requiredFields = ["categoria"];
const input1 = document.getElementById("input1");

let checkpoints = [0, 0, 0, 0]; // posición ANTES de cada tirada: [dummy, t1, t2, t3]
let isMoving = false;

// Función que revisa si todos tienen valor
function checkFields() {
  const allFilled = requiredFields.every((id) => {
    const el = document.getElementById(id);
    if (el.value != "ADICIONAL") {
      return el && el.value.trim() !== "";
    }
  });

  input1.disabled = !allFilled;
}

// Asignar el evento "input" a todos los campos
requiredFields.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("input", checkFields);
});

// Deshabilitar por defecto
input1.disabled = true;

var cellMap = {};
let posicionTirada1 = 0;
let posicionTirada2 = 0;
let posicionTirada3 = 0;
let tiradaActual = 1;
const url =
  "https://script.google.com/macros/s/AKfycbzuPWMrhYHdkgmLKztgfMJvfPYItt-zQhsdXRmsEfjH3EUvMfUY9nvRfMU44SxDr6GF/exec";

const promocion = "Tren de Premios";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosTren";
const FECHA_KEY = "fechaTren";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

function emptyInput1() {
  const val1 = document.getElementById("input1");
  const val2 = document.getElementById("input2");
  val1.value = "";
  val1.disabled = false;
  val2.disabled = true;
}

function handleAutoInput(e) {
  const valor = parseInt(e.target.value);
  const valCategoria = document.getElementById("categoria").value;
  const valGanador = document.getElementById("resultado-ganador");
  valGanador.innerHTML = ``;

  if (!isNaN(valor) && valor >= 1 && valor <= 6) {
    checkpoints[tiradaActual] = playerPosition;
    e.target.disabled = true;

    movePlayer(valor, () => {
      if (tiradaActual === 1) {
        posicionTirada1 = playerPosition;
        document.getElementById(
          "pos1"
        ).innerText = `Lanz 1: ${posicionTirada1}`;
        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada1}`;
        message.innerText = htmlTiro;
      } else if (tiradaActual === 2) {
        posicionTirada2 = playerPosition;
        document.getElementById(
          "pos2"
        ).innerText = `Tirada 2: ${posicionTirada2}`;
        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada2}`;
        message.innerText = htmlTiro;
      } else if (tiradaActual === 3) {
        posicionTirada3 = playerPosition;
        document.getElementById(
          "pos3"
        ).innerText = `Tirada 3: ${posicionTirada3}`;

        let htmlTiro = `${playerName} Lanzó y obtuvo ${valor}, estas en la estación ${posicionTirada3}`;
        message.innerText = htmlTiro;

        const ValBono = document.getElementById("valBono");

        // PREMIOS

        if (valCategoria == "GENIUS") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$220.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$190.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$220.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$500.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$600.000");
          }
        } else if (valCategoria == "TITANIO") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$170.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$550.000");
          }
        } else if (valCategoria == "LEGENDARIO") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$180.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$500.000");
          }
        } else if (valCategoria == "GOLD") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$130.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$160.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$350.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$450.000");
          }
        } else if (valCategoria == "SILVER") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$140.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          }
        } else if (valCategoria == "BRONCE") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          }
        } else if (valCategoria == "SUPERIOR") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$110.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$150.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$400.000");
          }
        } else if (valCategoria == "ESTANDAR") {
          if (posicionTirada3 == 3) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 4) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 5) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 6) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 7) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 8) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 9) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 10) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 12) {
            alertaExito(posicionTirada3, valCategoria, "$80.000");
          } else if (posicionTirada3 == 13) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 14) {
            alertaExito(posicionTirada3, valCategoria, "$90.000");
          } else if (posicionTirada3 == 15) {
            alertaExito(posicionTirada3, valCategoria, "$100.000");
          } else if (posicionTirada3 == 17) {
            alertaExito(posicionTirada3, valCategoria, "$120.000");
          } else if (posicionTirada3 == 18) {
            alertaExito(posicionTirada3, valCategoria, "$200.000");
          } else if (posicionTirada3 == 19) {
            alertaExito(posicionTirada3, valCategoria, "$250.000");
          } else if (posicionTirada3 == 20) {
            alertaExito(posicionTirada3, valCategoria, "$300.000");
          }
        }

        // ValBono.innerHTML =
        //   '<div style="display: flex;flex-direcction: column gap: 30px;"><div class="content-btn-enviar"><input class="form-control" id="valBono-promo" type="text" placeholder="# bono." /></div></div>';
      }
      tiradaActual++;
    });
  } else if (e.target.value.length >= 1) {
    alert("Ingresa un número entre 1 y 6");
    e.target.value = "";
  }
}

const board = document.getElementById("board");
const rollButton = document.getElementById("roll-button");
const message = document.getElementById("message");

const boardSize = 20;
let playerPosition = 0;
let playerName = "Jugador";

const fondoTablero = document.createElement("img");

fondoTablero.src = "/dinamicas/promocion-Escaleras/resources/fondo-borrar.png";
fondoTablero.alt = "fondo-tablero";
fondoTablero.className = "fondo-tablero";
board.appendChild(fondoTablero);

//las escaleras y las serpientes
const snakes = {};
const ladders = {
  11: 14,
  16: 17,
};

function createBoard() {
  const rows = 5;
  const columns = 4;
  // board.innerHTML = "";
  cellMap = {}; // reinicia mapeo si se vuelve a crear

  let currentNumber = 1;
  const allRows = [];

  for (let r = 0; r < rows; r++) {
    const rowCells = [];

    for (let c = 0; c < columns; c++) {
      const cell = document.createElement("div");
      cell.id = `cell${currentNumber}`;
      cell.className = "cell";
      cell.innerText = currentNumber;
      cellMap[currentNumber] = cell;

      if (cell.id == "cell1") {
        cell.className += " cell1";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-1.png";
        imgNumber.alt = "Numero 1";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);
      }

      if (cell.id == "cell2") {
        cell.className += " cell2";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgSemaforo = document.createElement("img");
        imgSemaforo.src =
          "/dinamicas/promocion-Escaleras/resources/semaforo-2.png";
        imgSemaforo.alt = "semaforo-1";
        imgSemaforo.className = "semaforo-1";
        cell.appendChild(imgSemaforo);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-2.png";
        imgNumber.alt = "Numero 2";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell3") {
        cell.className += " cell3";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-3.png";
        imgNumber.alt = "Numero 3";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell4") {
        cell.className += " cell4";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-4.png";
        imgNumber.alt = "Numero 4";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell5") {
        cell.className += " cell5";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-5.png";
        imgNumber.alt = "Numero 5";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }

        // if (screen.width >= 2000) {
        //   const imgSemaforo2 = document.createElement("img");

        //   imgSemaforo2.src =
        //     "/dinamicas/promocion-Escaleras/resources/semaforo-1.png";
        //   imgSemaforo2.alt = "semaforo 2";
        //   imgSemaforo2.className = "semaforo-tv";
        //   cell.appendChild(imgSemaforo2);
        // }
      }

      if (cell.id == "cell6") {
        cell.className += " cell6";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-6.png";
        imgNumber.alt = "Numero 6";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell7") {
        cell.className += " cell7";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-3";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-7.png";
        imgNumber.alt = "Numero 7";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell8") {
        cell.className += " cell8";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril-2";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-8.png";
        imgNumber.alt = "Numero 8";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell9") {
        cell.className += " cell9";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src = "/dinamicas/promocion-Escaleras/resources/numero-9.png";
        imgNumber.alt = "Numero 9";
        imgNumber.className = "numero-1";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell10") {
        cell.className += " cell10";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-10.png";
        imgNumber.alt = "Numero 10";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell11") {
        cell.className += " cell11";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-11.png";
        imgNumber.alt = "Numero 11";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }

        if (screen.width >= 2000) {
          const imgCalleunion = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/calle-union.png";
          img.alt = "calle-union";
          img.className = "calle-union";
          cell.appendChild(imgCalleunion);
        }

        const imgCalle = document.createElement("img");
        imgCalle.src = "/dinamicas/promocion-Escaleras/resources/calle.png";
        imgCalle.alt = "Tablon";
        imgCalle.className = "calle";
        cell.appendChild(imgCalle);
      }

      if (cell.id == "cell12") {
        cell.className += " cell12";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-2.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-12.png";
        imgNumber.alt = "Numero 12";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell13") {
        cell.className += " cell13";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-13.png";
        imgNumber.alt = "Numero 13";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell14") {
        cell.className += " cell14";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-14.png";
        imgNumber.alt = "Numero 14";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }

        const imgSemaforo2 = document.createElement("img");

        imgSemaforo2.src =
          "/dinamicas/promocion-Escaleras/resources/semaforo-1.png";
        imgSemaforo2.alt = "semaforo 2";
        imgSemaforo2.className = "semaforo-2";
        cell.appendChild(imgSemaforo2);
      }

      if (cell.id == "cell15") {
        cell.className += " cell15";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-2";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-15.png";
        imgNumber.alt = "Numero 15";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union-3";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell16") {
        cell.className += " cell16";

        const imgCarril = document.createElement("img");
        imgCarril.src = "/dinamicas/promocion-Escaleras/resources/carril-3.png";
        imgCarril.alt = "Escalera";
        imgCarril.className = "content-union-carril-2";
        cell.appendChild(imgCarril);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-16.png";
        imgNumber.alt = "Numero 16";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla-2.png";
          img.alt = "union";
          img.className = "union-2";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell17") {
        cell.className += " cell17";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-2.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-17.png";
        imgNumber.alt = "Numero 17";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }

        // if (screen.width >= 2000) {
        //   const imgSemaforo2 = document.createElement("img");

        //   imgSemaforo2.src =
        //     "/dinamicas/promocion-Escaleras/resources/semaforo-2.png";
        //   imgSemaforo2.alt = "semaforo 2";
        //   imgSemaforo2.className = "semaforo-tv-2";
        //   cell.appendChild(imgSemaforo2);
        // }
      }

      if (cell.id == "cell18") {
        cell.className += " cell18";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon-3.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-18.png";
        imgNumber.alt = "Numero 18";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);

        if (screen.width >= 2000) {
          const img = document.createElement("img");
          img.src = "/dinamicas/promocion-Escaleras/resources/barilla.png";
          img.alt = "union";
          img.className = "union";
          cell.appendChild(img);
        }
      }

      if (cell.id == "cell19") {
        cell.className += " cell19";

        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/tablon.png";
        img.alt = "Tablon";
        img.className = "tablon-4";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-19.png";
        imgNumber.alt = "Numero 19";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);
      }

      if (cell.id == "cell20") {
        cell.className += " cell20";
        const img = document.createElement("img");
        img.src = "/dinamicas/promocion-Escaleras/resources/confetti.gif";
        img.alt = "Escalera";
        img.className = "content-flecha-curva-5";
        cell.appendChild(img);

        const imgNumber = document.createElement("img");
        imgNumber.src =
          "/dinamicas/promocion-Escaleras/resources/numero-20.png";
        imgNumber.alt = "Numero 20";
        imgNumber.className = "numero-2";
        cell.appendChild(imgNumber);
      }

      rowCells.push(cell);
      currentNumber++;
    }

    if (r % 2 !== 0) rowCells.reverse();
    allRows.push(rowCells);
  }

  allRows.reverse().forEach((row) => {
    row.forEach((cell) => board.appendChild(cell));
  });
}

function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  message.innerText = `${playerName} a sacado ${diceValue}`;
  movePlayer(diceValue);
}

function movePlayer(diceValue, callbackFinal = () => {}) {
  isMoving = true; // === NUEVO ===
  let steps = 0;
  const contentTren = document.getElementById("content-tren");

  const interval = setInterval(() => {
    if (steps < diceValue) {
      playerPosition++;
      if (playerPosition > boardSize) playerPosition = boardSize;

      if (playerPosition == 5)
        contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
      if (playerPosition == 9)
        contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
      if (playerPosition == 13)
        contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
      if (playerPosition == 17)
        contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";

      updateBoard(true);
      steps++;
    } else {
      clearInterval(interval);

      const finish = () => {
        updateBoard(false);
        isMoving = false; // === NUEVO ===
        callbackFinal();
      };

      if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
        message.innerText += ` ¡Ay! Serpiente, ahora estás en ${playerPosition}`;
        finish();
      } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
        Swal.fire({
          icon: "success",
          title: "Gran avance.",
          text: `¡Bien! Carril de atajo, ahora estás en la estación ${playerPosition}`,
          confirmButtonColor: "#a13b22",
          allowOutsideClick: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            if (playerPosition == 14)
              contentTren.src =
                "/dinamicas/promocion-Escaleras/resources/tren-2.png";
            if (playerPosition == 17)
              contentTren.src =
                "/dinamicas/promocion-Escaleras/resources/tren.png";
            message.innerText += `¡Bien! Carril de atajo, ahora estás en la estación ${playerPosition}`;
            finish();
          } else {
            isMoving = false; // seguridad
          }
        });
      } else {
        finish();
      }
    }
  }, 300);
}

function deshacerTirada() {
  if (isMoving) {
    Swal.fire({
      icon: "info",
      title: "Espera",
      text: "El tren aún está en movimiento.",
      allowOutsideClick: false,
    });
    return;
  }

  // Si no has hecho ninguna tirada, no hay nada que deshacer
  if (tiradaActual <= 1 && checkpoints[1] === 0) {
    Swal.fire({
      icon: "info",
      title: "Nada para deshacer",
      allowOutsideClick: false,
    });
    return;
  }

  // La "última tirada realizada" es tiradaActual - 1
  const ultima = Math.max(1, tiradaActual - 1);
  let volverA = checkpoints[ultima];

  // Volver a la posición guardada (si 0, regresar a la casilla inicial)
  if (volverA === 0) {
    playerPosition = 0;
    placePlayerAtStart();
  } else {
    playerPosition = volverA;
    updateBoard(false);
  }
  setTrainImageByPosition(playerPosition);

  const inp1 = document.getElementById("input1");
  const inp2 = document.getElementById("input2");
  const inp3 = document.getElementById("input3");
  const valGanador = document.getElementById("resultado-ganador");
  const ValBono = document.getElementById("valBono");

  // Limpia UI de premio y bono si estabas en la 3ra tirada
  if (ValBono) ValBono.innerHTML = "";
  valGanador.innerHTML = "";

  if (ultima === 3) {
    // Deshacer la 3ra tirada: reintentar input3
    posicionTirada3 = 0;
    const pos3 = document.getElementById("pos3");
    if (pos3) pos3.innerText = "Tirada 3: -";
    inp3.value = "";
    inp3.disabled = false;
    tiradaActual = 3;
  } else if (ultima === 2) {
    // Deshacer la 2da: reintentar input2 y bloquear input3
    posicionTirada2 = 0;
    const pos2 = document.getElementById("pos2");
    if (pos2) pos2.innerText = "Tirada 2: -";
    inp2.value = "";
    inp2.disabled = false;
    inp3.value = "";
    inp3.disabled = true;
    tiradaActual = 2;
  } else {
    // Deshacer la 1ra: reintentar input1 y bloquear 2 y 3
    posicionTirada1 = 0;
    const pos1 = document.getElementById("pos1");
    if (pos1) pos1.innerText = "Tirada 1: -";
    inp1.value = "";
    inp1.disabled = false;
    inp2.value = "";
    inp2.disabled = true;
    inp3.value = "";
    inp3.disabled = true;
    tiradaActual = 1;
  }

  message.innerText = "Tirada deshecha. Vuelve a ingresar el Lanz.";
}

function reiniciarRonda() {
  if (isMoving) {
    Swal.fire({
      icon: "info",
      title: "Espera",
      text: "El tren aún está en movimiento.",
      allowOutsideClick: false,
    });
    return;
  }
  posicionTirada1 = 0;
  posicionTirada2 = 0;
  posicionTirada3 = 0;
  tiradaActual = 1;
  playerPosition = 0;
  placePlayerAtStart();
  setTrainImageByPosition(playerPosition);

  const pos1 = document.getElementById("pos1");
  const pos2 = document.getElementById("pos2");
  const pos3 = document.getElementById("pos3");
  if (pos1) pos1.innerText = "Tirada 1: -";
  if (pos2) pos2.innerText = "Tirada 2: -";
  if (pos3) pos3.innerText = "Tirada 3: -";

  const inp1 = document.getElementById("input1");
  const inp2 = document.getElementById("input2");
  const inp3 = document.getElementById("input3");
  inp1.value = "";
  inp2.value = "";
  inp3.value = "";
  // respeta tu validación de campos requeridos
  checkFields(); // esto habilita/inhabilita input1 según tus requiredFields
  inp2.disabled = true;
  inp3.disabled = true;

  const valGanador = document.getElementById("resultado-ganador");
  const ValBono = document.getElementById("valBono");
  if (valGanador) valGanador.innerHTML = "";
  if (ValBono) ValBono.innerHTML = "";

  // Limpia checkpoints
  checkpoints = [0, 0, 0, 0];

  message.innerText = "Ronda reiniciada.";
}

function updateBoard() {
  const token = document.getElementById("player-token");
  const cell = cellMap[playerPosition];
  if (!cell || !token) return;

  const left = cell.offsetLeft + cell.offsetWidth / 2 - token.offsetWidth / 2;
  const top = cell.offsetTop + cell.offsetHeight / 2 - token.offsetHeight / 2;

  token.style.left = `${left}px`;
  token.style.top = `${top}px`;
}

function alertaExito(posicion, valCate, recompensa) {
  const valGanador = document.getElementById("resultado-ganador");
  valGanador.innerHTML = `Has llegado a la estación ${posicion}, con un premio de ${recompensa} en Dinero Promocional, con categoria ${valCate}
  `;
  Swal.fire({
    icon: "success",
    title: `Categoría ${valCate}.`,
    html: `Has llegado a la estación ${posicion}, con un premio de <span class="valrecompensa">${recompensa} en Dinero Promocional</span>`,
    confirmButtonColor: "#a13b22",
    allowOutsideClick: false,
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}

function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_dados");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();
  const loader = document.getElementById("loader");

  const filtrados = valCasino
    ? registros.filter((item) => item.valor_5)
    : registros;

  if (filtrados.length === 0) {
    content_registro_dia.innerHTML = `<p class="color-gray">No hay registros ${
      valCasino ? "para este casino." : "aún."
    }</p>`;
    info_result_dia.innerHTML = "";
    return;
  }
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));
  console.log(hayBonoVacio);
  notificacion_registro_dia.style.display = hayBonoVacio ? "flex" : "none";

  info_result_dia.innerHTML = `<small class="color-gray"><spam style="color: red">*</spam> Estos registros son temporales (se reinicia a las 00:00), por favor tener en cuenta.</small>`;

  // Render de la tabla (nota: input ahora usa CLASE, no ID repetido)
  content_registro_dia.innerHTML = `
    <div class="table-wrapper">
      <table class="styled-table table-scrolld ajuste_table_result">
        <thead>
          <tr>
            <th># Registro</th>
            <th>Casino</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Bono</th>
            <th>Acciones</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filtrados
            .map((r, i) => {
              const bono = r.valBono ? r.valBono : "";
              const accion =
                bono === ""
                  ? `<button
                    class="table_btn_enviar_bono btn btn-success"
                    data-casino="${r.valor_5}"
                    data-categoria="${r.valor_6}"
                    data-nombre="${r.valor_3}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.valor_2}"
                    data-hora="${r.valor_1}"
                    data-resultado="${r.valor_7}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.valor_5}</td>
                <td>${r.valor_6}</td>
                <td>${r.valor_3}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono_dado" type="text" placeholder="#Bono">`
                }</td>
                <td>${accion}</td>
                <td>${r.valor_2} ${r.valor_1}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    `;

  function getRegs() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      localStorage.setItem(LS_KEY, "[]");
      return [];
    }
  }

  function updateLocalBono(
    { casino, categoria, nombre, cedula, fecha, hora, resultado },
    valBono
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_7).trim() === String(resultado).trim() &&
        String(r.valor_6).trim() === String(categoria).trim() &&
        String(r.valor_5).trim() === String(casino).trim() &&
        String(r.valor_3).trim() === String(nombre).trim() &&
        String(r.valor_2).trim() === String(fecha).trim() &&
        String(r.valor_1).trim() === String(hora).trim()
    );
    if (idx === -1) return false;

    regs[idx].valBono = valBono;
    regs[idx].bonoAsignado = true;
    localStorage.setItem(LS_KEY, JSON.stringify(regs));
    return true;
  }

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }

  if (content_registro_dia._clickHandler) {
    content_registro_dia.removeEventListener(
      "click",
      content_registro_dia._clickHandler
    );
  }

  content_registro_dia._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono_dado");
    const valBonoregistr = bonoInput?.value?.trim() || "";
    if (!valBonoregistr) {
      Swal.fire({
        icon: "warning",
        title: "Falta el bono",
        text: "Ingresa el # de bono antes de enviar.",
        allowOutsideClick: false,
      });
      return;
    }

    const {
      casino = "",
      categoria = "",
      nombre = "",
      cedula = "",
      fecha = "",
      hora = "",
      resultado = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_5: casino,
      valor_6: categoria,
      valor_7: resultado,
      valor_8: valBonoregistr,
      valor_9: promocion,
      valor_10: user.Nombre,
    };

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return;
    IN_FLIGHT.add(key);

    // Evita doble click en el mismo botón
    if (btn.dataset.sending === "1") return;
    btn.dataset.sending = "1";

    const prevText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";
    if (loader?.style) loader.style.display = "flex";

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      const ok = updateLocalBono(
        {
          casino,
          categoria,
          nombre,
          cedula,
          fecha,
          hora,
          resultado,
        },
        valBonoregistr
      );

      if (tr) {
        const tdBono = tr.querySelector("td:nth-child(6)");
        const tdAcc = tr.querySelector("td:nth-child(7)");
        if (tdBono) tdBono.innerHTML = escapeHtml(valBonoregistr);
        if (tdAcc)
          tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
      }

      Swal.fire({
        icon: ok ? "success" : "info",
        title: ok ? "Bono asignado" : "Registro no encontrado",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
        html: `<div>
            <p>${
              ok
                ? "Se envió la información de manera correcta."
                : "No se pudo localizar el registro en localStorage."
            }</p>
            </div>
            `,
        allowOutsideClick: false,
      });
      btn.textContent = prevText;
      GetResgistroDia();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
        html: `
      <div >
      <p>Ha ocurrido un error en el envió.</p>
      </div>
      `,
        allowOutsideClick: false,
      });
      btn.textContent = prevText;
    } finally {
      IN_FLIGHT.delete(key);

      if (loader?.style) loader.style.display = "none";

      // El TR pudo re-renderizarse; valida que el botón aún exista
      if (document.body.contains(btn)) {
        btn.disabled = false;
        btn.textContent = prevText;
        delete btn.dataset.sending;
      }
    }

    // setTimeout(() => {
    //   btn.textContent = "Error en el envio.";
    // }, 4500);

    // setTimeout(() => {
    //   btn.textContent = prevText;
    // }, 6000);
  };
  content_registro_dia.addEventListener(
    "click",
    content_registro_dia._clickHandler
  );
}
GetResgistroDia();

createBoard();
placePlayerAtStart();

function placePlayerAtStart() {
  const token = document.getElementById("player-token");
  const cell = cellMap[1];

  const left = cell.offsetLeft + cell.offsetWidth / 2 - token.offsetWidth / 2;
  const top = cell.offsetTop + cell.offsetHeight / 2 - token.offsetHeight / 2;

  if (!cell || !token) return;

  token.style.left = `${left - 120}px`;
  token.style.top = `${top}px`;
}

function AllReset() {
  cellMap = {};
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaTren");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosTren", JSON.stringify([]));
    localStorage.setItem("fechaTren", hoy);
  }
}
verificarResetRegistro();

function setTrainImageByPosition(pos) {
  const contentTren = document.getElementById("content-tren");
  if (!contentTren) return;
  if (pos >= 17)
    contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
  else if (pos >= 13)
    contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
  else if (pos >= 9)
    contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
  else if (pos >= 5)
    contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren-2.png";
  else contentTren.src = "/dinamicas/promocion-Escaleras/resources/tren.png";
}

document.getElementById("btn_submit").addEventListener("click", () => {
  handleSendInfo();
  const lastposicion = posicionTirada3;
  console.log(lastposicion, " desde el evento del submit");
});

const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const casino = document.getElementById("casino");
const cedula = document.getElementById("cedula");

function handleSendInfo() {
  let categoriaValue = categoria.value;
  let casinoValue = casino.value;
  let nombreValue = nombre.value;
  let cedulaValue = cedula.value;

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

  if (categoriaValue == "" || casinoValue == "" || nombreValue == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: `Por favor, completa la información antes de enviar`,
    });
    return;
  }

  let data = {};

  if (categoriaValue == "ADICIONAL") {
    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreValue,
      valor_4: cedulaValue,
      valor_5: casinoValue,
      valor_6: categoriaValue,
      valor_7: "0",
      valor_8: "0",
      valBono: "0",
      valor_9: promocion,
      valor_10: user.Nombre,
    };
  } else {
    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreValue,
      valor_4: cedulaValue,
      valor_5: casinoValue,
      valor_6: categoriaValue,
      valor_7: posicionTirada3,
      valor_9: promocion,
      valBono: "",
    };
  }

  console.log(data, "data");

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetResgistroDia === "function") GetResgistroDia();

  if (categoriaValue == "ADICIONAL") {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        nombre.value = "";
        cedula.value = "";
        categoria.value = "";
        casino.value = "";
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "success",
            html: `<div class="content_swal_premio">
              <div class="swal_premio_portal">
              <br/>
              </div>
              <h2>Con ${categoriaValue}</h2>
              La información se envio de manera correcta
              </div>`,
            allowOutsideClick: false,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
            },
          });
        }, 2500);
        return;
      });
    return;
  }

  setTimeout(() => {
    nombre.value = "";
    cedula.value = "";
    casino.value = "";
    categoria.value = "";
  }, 1500);

  setTimeout(() => {
    loader.style.display = "none";
    Swal.fire({
      icon: "info",
      title: `Guardado Local`,
      html: ` <div>
                    <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
                </div>
            `,
      allowOutsideClick: false,
    });
  }, 3000);
}

document
  .getElementById("btn_submit_secundario")
  .addEventListener("click", () => {
    handleEnvioSecundario();
  });

function handleEnvioSecundario() {
  const casino_secundario = document.getElementById("casino_secundario");
  const categoria_secundario = document.getElementById("categoria-secundario");
  const cedula_secundario = document.getElementById("cedula_secundario");
  const nombre_secundario = document.getElementById("nombre_secundario");
  const fecha_secundario = document.getElementById("fecha_secundario");
  const hora_secundario = document.getElementById("hora_secundario");
  const bono_secundario = document.getElementById("bono_secundario");
  const resultado_secundario = document.getElementById("posicion-modal-tren");

  let casino = casino_secundario.value;
  let categoria = categoria_secundario.value;
  let cedula = cedula_secundario.value;
  let nombre = nombre_secundario.value;
  let fecha = fecha_secundario.value;
  let hora = hora_secundario.value;
  let bono = bono_secundario.value;
  let resultado = resultado_secundario.value;

  if (resultado > 20) {
    Swal.fire({
      icon: "warning",
      title: "Posición no valida!.",
      html: "Por favor, Digita una posición valida.",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  const fechaFormateada = new Date(fecha).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (categoria == "ADICIONAL") {
    (bono = "0"), (resultado = "0");
  }

  if (
    casino == "" ||
    categoria == "" ||
    nombre == "" ||
    fecha == "" ||
    hora == "" ||
    bono == "" ||
    resultado == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!.",
      html: "Por favor, Completa la información antes de enviar.",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fechaFormateada,
    valor_3: nombre,
    valor_4: cedula,
    valor_5: casino,
    valor_6: categoria,
    valor_7: resultado,
    valor_8: bono,
    valor_9: promocion,
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
      casino_secundario.value = "";
      categoria_secundario.value = "";
      cedula_secundario.value = "";
      nombre_secundario.value = "";
      fecha_secundario.value = "";
      hora_secundario.value = "";
      bono_secundario.value = "";
      resultado_secundario.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
          html: "La información se envio correctamente",
        });
      }, 1500);
    })
    .catch((error) => {
      console.war(error);
    });
}

function confettiVictoria() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.5, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.5 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.5, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.4, x: 0.8 },
  });
}
