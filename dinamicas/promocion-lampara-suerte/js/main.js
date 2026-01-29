window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const loader = document.getElementById("loader");

const ValorFinal_lamp = document.getElementById("resultado");
const BonosRepartir = document.getElementById("bonos");
const historial = [];
const btn_opciones = document.getElementById("btn_opciones");
const expandir = document.getElementById("expandir");
const close_modal_icon = document.getElementById("close_modal_icon");

const formBox = document.getElementById("formBox");
const toggleBtn = document.getElementById("toggleBtn");
const logo = document.getElementById("prueba");

const user = inforUser();

const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");

const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion",
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

toggleBtn.addEventListener("click", () => {
  formBox.classList.toggle("hidden");

  const oculto = formBox.classList.contains("hidden");
  toggleBtn.textContent = oculto ? "Mostrar" : "Ocultar";

  if (oculto) {
    logo.classList.add("logo-centrado");
  } else {
    logo.classList.remove("logo-centrado");
  }
});

document.getElementById("listad-1er").addEventListener("click", () => {
  validateCampos();
});

document.getElementById("listad-2do").addEventListener("click", () => {
  validateCampos();
});

document.getElementById("listad-3er").addEventListener("click", () => {
  validateCampos();
});

document.getElementById("casino").addEventListener("change", () => {
  aviableBoard();
});
document.getElementById("categoria").addEventListener("change", () => {
  aviableBoard();
});

function validateCampos() {
  if (
    document.getElementById("casino").value == "" ||
    document.getElementById("categoria").value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }
}

function aviableBoard() {
  if (
    document.getElementById("casino").value == "" ||
    document.getElementById("categoria").value == ""
  ) {
    document.getElementById("listad-1er").classList.add("item_disable");
    document.getElementById("listad-2do").classList.add("item_disable");
    document.getElementById("listad-3er").classList.add("item_disable");
  } else {
    document.getElementById("listad-1er").classList.remove("item_disable");
    document.getElementById("listad-2do").classList.remove("item_disable");
    document.getElementById("listad-3er").classList.remove("item_disable");
  }
}

btn_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "flex";
  btn_guardar_registro.classList.add("select_menu");
  view_guardar_registro.style.display = "flex";
});

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);
notificacion_registro_dia.style.display = "none";

const promocion = "Lampara de la Suerte";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosLamparaSuerte";
const FECHA_KEY = "fechaLamparaSuerte";

const url =
  "https://script.google.com/macros/s/AKfycbxaTUBg0CicvSCUDD99_vSQ3RmJWI0pIxtUJNeJgW0xAawiEEn6ocERXKOtGobQkQNI/exec";

expandir.addEventListener("click", () => {
  document
    .getElementById("content_modal_dinamica")
    .classList.toggle("item_full_screen");
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "none";
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_guardar_registro.addEventListener("click", () => {
  btn_guardar_registro.classList.add("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_guardar_registro.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_envio_secundario.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_observacion.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_tabla_premios.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";
});

btn_registro_dia.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";
});

const casino_E_S = [
  "A36",
  "A781",
  "A108-MESAS",
  "A127-MESAS",
  "A12-MESAS",
  "A15-MESAS",
  "A36-MESAS",
];
const casino_A_C = ["A43", "A53", "A108", "A127"];

class SlotMachine {
  constructor(slotElement, prefix, selectElement) {
    this.slotElement = slotElement;
    this.prefix = prefix; // '1er', '2do', '3er'
    this.selectElement = selectElement;
    this.imagesCount = 6;
    this.currentIndex = 0;
    this.interval = null;
    this.stopping = false;
    this.targetNumber = null;
    this.imgElement = document.createElement("img");
    this.slotElement.appendChild(this.imgElement);
  }

  start() {
    this.stopping = false;
    this.targetNumber = null;
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex % this.imagesCount) + 1;
      this.imgElement.src = `./images/fichas/${this.prefix} ${this.currentIndex}.png`;
      this.imgElement.alt = `${this.prefix} ${this.currentIndex}`;
    }, 100);
  }

  stopOnNumber(number) {
    if (this.stopping) return;
    this.stopping = true;
    this.targetNumber = number;
    clearInterval(this.interval);
    const valselect1 = document.getElementById("listad-1er").value;
    const valselect2 = document.getElementById("listad-2do").value;
    const valselect3 = document.getElementById("listad-3er").value;
    const valcategoria = document.getElementById("categoria").value;
    const casino = document.getElementById("casino").value;
    // ValorFinal_lamp.textContent = "prueba de que gano"

    if (
      // 2 cereza
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 3) || // 1
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 5) || // 2
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 3) || // 3
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 5) || // 4
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 3) || // 5
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 5) || // 6
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 3) || // 7
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 5) || // 8
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 2) || // 9
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 4) || // 10
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 6) || // 11
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 3) || // 12
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 5) || // 13
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 2) || // 14
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 4) || // 15
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 6) || // 16
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 2) || // 17
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 4) || // 18
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 6) || // 19
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 3) || // 20
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 5) || // 21
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 3) || // 22
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 5) || // 23
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 2) || // 24
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 4) || // 25
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 6) || // 26
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 3) || // 27
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 5) || // 28
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 2) || // 29
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 4) || // 30
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 6) || // 31
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 2) || // 32
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 4) || // 33
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 6) || // 34
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 3) || // 35
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 5) || // 36
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 3) || // 37
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 5) || // 38
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 3) || // 39
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 5) || // 40
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 3) || // 41
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 5) || // 42
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 3) || // 43
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 5) || // 44
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 2) || // 45
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 4) || // 46
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 6) || // 47
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 3) || // 48
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 5) || // 49
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 2) || // 50
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 4) || // 51
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 6) || // 52
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 2) || // 53
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 4) || // 54
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 6) || // 55
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 3) || // 56
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 5) // 57
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$80.000");
          } else {
            alerResult("$50.000");
          }
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$100.000");
          } else {
            alerResult("$70.000");
          }
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$80.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$80.000");
          } else {
            alerResult("$50.000");
          }
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$90.000");
          } else {
            alerResult("$70.000");
          }
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("100.000");
          } else {
            alerResult("$90.000");
          }
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$110.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      }
    } else if (
      // 2 limon
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 2) || // 1
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 4) || // 2
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 2) || // 3
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 4) || // 4
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 1) || // 5
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 2) || // 6
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 4) || // 7
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 1) || // 8
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 2) || // 9
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 4) || // 10
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 1) || // 11
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 2) || // 12
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 4) || // 13
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 1) || // 14
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 2) || // 15
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 4) || // 16
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 3) || // 17
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 5) || // 18
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 6) || // 19
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 1) || // 20
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 2) || // 21
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 4) || // 22
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 2) || // 23
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 4) || // 24
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 1) || // 25
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 2) || // 26
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 4) || // 27
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 1) || // 28
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 2) || // 29
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 4) || // 30
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 3) || // 31
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 5) || // 32
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 6) || // 33
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 3) || // 34
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 5) || // 35
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 2) || // 36
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 4) || // 37
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 2) || // 38
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 4) || // 39
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 2) || // 40
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 4) || // 41
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 3) || // 42
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 5) || // 43
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 1) || // 44
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 2) || // 45
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 4) || // 46
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 1) || // 47
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 2) || // 48
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 4) // 49
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$90.000");
          } else {
            alerResult("$70.000");
          }
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$110.000");
          } else {
            alerResult("$90.000");
          }
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$90.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$110.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$90.000");
          } else {
            alerResult("$70.000");
          }
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$100.000");
          } else {
            alerResult("$90.000");
          }
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$110.000");
          } else {
            alerResult("$100.000");
          }
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$130.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$160.000");
        }, 2000);
      }
    } else if (
      // 2 bar
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 1) || // 1
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 6) || // 2
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 1) || // 3
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 6) || // 4
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 2) || // 5
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 3) || // 6
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 4) || // 7
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 5) || // 8
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 1) || // 9
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 6) || //10
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 1) || //11
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 6) || //12
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 1) || //13
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 6) || //14
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 1) || //15
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 6) || //16
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 1) || //17
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 6) || //18
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 1) || //19
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 6) || //20
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 6) || //21
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 6) || //22
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 2) || //23
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 3) || //24
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 4) || //25
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 5) || //26
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 6) || //27
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 6) || //28
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 6) || //29
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 1) || //30
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 6) //31
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$100.000");
          } else {
            alerResult("$80.000");
          }
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$120.000");
          } else {
            alerResult("$100.000");
          }
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$100.000");
          } else {
            alerResult("$80.000");
          }
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$110.000");
          } else {
            alerResult("$100.000");
          }
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$120.000");
          } else {
            alerResult("$110.000");
          }
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$130.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$140.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$170.000");
        }, 2000);
      }
    } else if (
      // 3 cerezas
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 1) || // 1
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 3) || // 2
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 5) || // 3
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 1) || // 4
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 3) || // 5
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 5) || // 6
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 1) || // 7
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 3) || // 8
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 5) || // 9
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 1) || //10
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 3) || //11
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 5) || //12
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 1) || //13
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 3) || //14
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 5) || //15
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 1) || //16
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 3) || //17
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 5) || //18
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 1) || //19
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 3) || //20
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 5) || //21
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 1) || //22
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 3) || //23
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 5) || //24
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 1) || //25
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 3) || //26
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 5) || //27
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 1) || //28
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 3) || //29
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 5) || //30
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 1) || //31
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 3) || //32
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 5) || //33
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 1) || //34
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 3) || //35
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 5) //36
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          if (casino_E_S.includes(casino)) {
            alerResult("$120.000");
          } else {
            alerResult("$100.000");
          }
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$120.000");
          } else {
            alerResult("$100.000");
          }
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$130.000");
          } else {
            alerResult("$120.000");
          }
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          if (casino_A_C.includes(casino)) {
            alerResult("$150.000");
          } else {
            alerResult("$130.000");
          }
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$160.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$170.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$200.000");
        }, 2000);
      }
    } else if (
      // 3 limones
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 1) || // 1
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 2) || // 2
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 4) || // 3
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 1) || // 4
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 2) || // 5
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 4) || // 6
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 1) || // 7
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 2) || // 8
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 4) || // 9
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 1) || //10
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 2) || //11
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 4) //12
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$180.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$200.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$400.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      }
    } else if (
      // 3 bar
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 1) || // 1
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 6) || // 2
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 1) || // 3
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 6) // 4
    ) {
      if (valcategoria == "ESTANDAR") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SUPERIOR") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$400.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$800.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$900.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$1.000.000");
        }, 2000);
      }
    } else if (valselect3) {
      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: `Combinacion no ganadora, Vuelve y juega 😃`,
          showConfirmButton: false,
          timer: 3000,
        });
        ValorFinal_lamp.innerHTML = `<button style="width: auto;" class="btn-lampara" onclick="vuelveyjuega()">Vuelve y juega</button>`;
      }, 2000);
      // setTimeout(() => {
      //   ValorFinal_lamp.textContent = ``;
      // }, 5000);
    }

    // Empezamos a bajar la velocidad y después quedamos en la imagen final
    let current = this.currentIndex;
    const slowDown = () => {
      if (current === number) {
        this.imgElement.src = `./images/fichas/${this.prefix} ${number}.png`;
        this.imgElement.alt = `${this.prefix} ${number}`;
        return;
      }
      current = (current % this.imagesCount) + 1;
      this.imgElement.src = `./images/fichas/${this.prefix} ${current}.png`;
      this.imgElement.alt = `${this.prefix} ${current}`;

      setTimeout(slowDown, 200);
    };
    slowDown();
  }
}

// Instanciar las tres slot machines
const slot1 = new SlotMachine(
  document.getElementById("slot-1er"),
  "1er",
  document.getElementById("listad-1er"),
);
const slot2 = new SlotMachine(
  document.getElementById("slot-2do"),
  "2do",
  document.getElementById("listad-2do"),
);
const slot3 = new SlotMachine(
  document.getElementById("slot-3er"),
  "3er",
  document.getElementById("listad-3er"),
);

// Iniciar slots al cargar la página
slot1.start();
slot2.start();
slot3.start();

// Función para manejar selección y detener slot correspondiente
document.getElementById("listad-1er").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot1.stopOnNumber(val);
});

document.getElementById("listad-2do").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot2.stopOnNumber(val);
});

document.getElementById("listad-3er").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot3.stopOnNumber(val);
});

function alerResult(val) {
  Swal.fire({
    icon: "success",
    title: `Combinación exitosa, Ganaste ${val} en Dinero Promocional `,
    showConfirmButton: false,
    timer: 3000,
  });

  // ValorFinal.textContent = `Ganaste, ${val} `;
  ValorFinal_lamp.innerHTML = `<div><label><strong style="font-size: 2rem">Ganaste, ${val} en Dinero Promocional</strong> </label><div  style="align-items: center;"> </div></div>`;
}
function limpiartabla() {
  BonosRepartir.innerHTML = "";
  ValorFinal_lamp.innerHTML = "";
}

function handleSend() {
  const valselect1 = document.getElementById("listad-1er");
  const valselect2 = document.getElementById("listad-2do");
  const valselect3 = document.getElementById("listad-3er");
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  // const now = new Date();
  // const fecha = now.toISOString().split("T")[0];
  // const hora = now.toTimeString().split(" ")[0];

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

  let data = {};

  if (categoria.value == "ADICIONAL") {
    if (!casino.value || !categoria.value || !nombre.value) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
      });
      return;
    }

    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre.value,
      valor_4: "",
      valor_5: "0",
      valBono: "0",
      valor_6: casino.value,
      valor_7: categoria.value,
      valor_8: "0",
      valor_9: "0",
      valor_10: "0",
      valor_11: promocion,
      valor_12: user.Nombre,
    };
  } else {
    if (
      !valselect1 ||
      !valselect2 ||
      !valselect3 ||
      !casino ||
      !categoria ||
      !nombre
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Debes completar todos los campos antes de continuar.",
      });
      return;
    }

    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre.value,
      valor_4: cedula.value,
      valor_6: casino.value,
      valor_7: categoria.value,
      valor_8: valselect1.value,
      valor_9: valselect2.value,
      valor_10: valselect3.value,
      valor_11: promocion,
      valBono: "",
    };
  }

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetResgistroDia === "function") GetResgistroDia();

  if (categoria.value == "ADICIONAL") {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        loader.style.display = "none";
        casino.value = "";
        categoria.value = "";
        nombre.value = "";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
        });
      })
      .catch((err) => {
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el Envio",
        });
      });
    return;
  }

  setTimeout(() => {
    nombre.value = "";
    casino.value = "";
    categoria.value = "";
    valselect1.value = "";
    valselect2.value = "";
    valselect3.value = "";
  }, 1500);

  setTimeout(() => {
    loader.style.display = "none";
    Swal.fire({
      icon: "info",
      title: "Guardado local",
      html: `<div>
              <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
            </div>`,
      allowOutsideClick: false,
      confirmButtonColor: "#dc3545",
    });
  }, 3000);
}

function newGame() {
  const val1 = document.getElementById("listad-1er").value;
  const val2 = document.getElementById("listad-2do").value;
  const val3 = document.getElementById("listad-3er").value;

  document.getElementById("listad-1er").value = "";
  document.getElementById("listad-2do").value = "";
  document.getElementById("listad-3er").value = "";
  document.getElementById("casino").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("cedula").value = "";
  ValorFinal_lamp.textContent = ``;
  BonosRepartir.innerHTML = "";
  if (val1 == "" && val2 == "" && val3 == "") {
  } else {
    slot1.start();
    slot2.start();
    slot3.start();
  }
}

function vuelveyjuega() {
  document.getElementById("listad-1er").value = "";
  document.getElementById("listad-2do").value = "";
  document.getElementById("listad-3er").value = "";
  ValorFinal_lamp.textContent = ``;
  BonosRepartir.innerHTML = "";
  slot1.start();
  slot2.start();
  slot3.start();
}

function restarlanz1() {
  const val1 = document.getElementById("listad-1er").value;

  if (val1) {
    document.getElementById("listad-1er").value = "";
    slot1.start();
  } else {
  }
}

function restarlanz2() {
  const val2 = document.getElementById("listad-2do").value;

  if (val2) {
    document.getElementById("listad-2do").value = "";
    slot2.start();
  } else {
  }
}

function restarlanz3() {
  const val3 = document.getElementById("listad-3er").value;

  if (val3) {
    document.getElementById("listad-3er").value = "";
    slot3.start();
  } else {
  }
}

function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_acumula");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

  const filtrados = valCasino
    ? registros.filter((item) => item.valor_6)
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
                    class="table_btn_enviar_bono"
                    data-casino="${r.valor_6}"
                    data-categoria="${r.valor_7}"
                    data-nombre="${r.valor_3}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.valor_2}"
                    data-hora="${r.valor_1}"
                    data-resultado1="${r.valor_8}"
                    data-resultado2="${r.valor_9}"
                    data-resultado3="${r.valor_10}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.valor_6}</td>
                <td>${r.valor_7}</td>
                <td>${r.valor_3}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono_portal" type="text" placeholder="#Bono">`
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
    {
      casino,
      categoria,
      nombre,
      cedula,
      fecha,
      hora,
      resultado1,
      resultado2,
      resultado3,
    },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_10).trim() === String(resultado3).trim() &&
        String(r.valor_9).trim() === String(resultado2).trim() &&
        String(r.valor_8).trim() === String(resultado1).trim() &&
        String(r.valor_7).trim() === String(categoria).trim() &&
        String(r.valor_6).trim() === String(casino).trim() &&
        String(r.valor_3).trim() === String(nombre).trim() &&
        String(r.valor_2).trim() === String(fecha).trim() &&
        String(r.valor_1).trim() === String(hora).trim(),
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
        })[m],
    );
  }

  if (content_registro_dia._clickHandler) {
    content_registro_dia.removeEventListener(
      "click",
      content_registro_dia._clickHandler,
    );
  }

  content_registro_dia._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono_portal");
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
      resultado1 = "",
      resultado2 = "",
      resultado3 = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_5: valBonoregistr,
      valor_6: casino,
      valor_7: categoria,
      valor_8: resultado1,
      valor_9: resultado2,
      valor_10: resultado3,
      valor_11: promocion,
      valor_12: user.Nombre,
    };

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
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
          resultado1,
          resultado2,
          resultado3,
        },
        valBonoregistr,
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
        html: `<div >
                <p>Ha ocurrido un error en el envió.</p>
              </div>`,
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
    content_registro_dia._clickHandler,
  );
}
GetResgistroDia();

function secondSubmit() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let resultado_1_modal = document.getElementById("resultado_1_modal");
  let resultado_2_modal = document.getElementById("resultado_2_modal");
  let resultado_3_modal = document.getElementById("resultado_3_modal");

  if (categoria_modal.value == "ADICIONAL") {
    resultado_1_modal.value = "0";
    resultado_2_modal.value = "0";
    resultado_3_modal.value = "0";
  }

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal ||
    !fecha_modal ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !resultado_1_modal.value ||
    !resultado_2_modal.value ||
    !resultado_3_modal.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora_modal.value,
    valor_2: fecha_modal.value,
    valor_3: nombre_modal.value,
    valor_4: "",
    valor_5: bono_modal.value,
    valor_6: casino_modal.value,
    valor_7: categoria_modal.value,
    valor_8: resultado_1_modal.value,
    valor_9: resultado_2_modal.value,
    valor_10: resultado_3_modal.value,
    valor_11: promocion,
    valor_12: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      fecha_modal.value = "";
      hora_modal.value = "";
      casino_modal.value = "";
      categoria_modal.value = "";
      nombre_modal.value = "";
      bono_modal.value = "";
      casino_modal.value = "";
      categoria_modal.value = "";
      resultado_1_modal.value = "";
      resultado_2_modal.value = "";
      resultado_3_modal.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envió",
      });
    });
}

function handleObservacion() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

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

  if (!casino_observacion.value || !descripcion_observacion.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casino_observacion.value,
    valor_4: descripcion_observacion.value,
    valor_5: user.Nombre,
  };

  loader.style.display = "";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}
