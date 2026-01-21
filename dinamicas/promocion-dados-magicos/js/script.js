window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// btn modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");

const btn_validar = document.getElementById("btn_validar");
const btn_enviar = document.getElementById("btn_enviar");
const btn_reset = document.getElementById("btn_reset");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

const loader = document.getElementById("loader");

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);
notificacion_registro_dia.style.display = "none";

const url =
  "https://script.google.com/macros/s/AKfycbwPxA5SyEwuM4hUBR5xthHk124AsmgXHmWbF655xQVbaUQAg-6c08De9gMGkw-F_usHjA/exec";
const promocion = "Dados Mágicos";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosDadosMagicos";
const FECHA_KEY = "fechaDadosMagicos";

const cateGlobal = document.getElementById("categoria");
const casinoGlobal = document.getElementById("casino");

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const user = inforUser();

const items_hide = document.querySelectorAll(".item_hide");

// view modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion",
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

const btn_opcion = document.getElementById("btn_opcion");
const close_modal_icon = document.getElementById("close_modal_icon");
const expandir = document.getElementById("expandir");

btn_opcion.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "flex";
  btn_guardar_registro.classList.add("select_menu");
  view_guardar_registro.style.display = "flex";
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

expandir.addEventListener("click", () => {
  document
    .getElementById("content_modal_dinamica")
    .classList.toggle("item_full_screen");
});

cateGlobal.addEventListener("change", () => {
  if (cateGlobal.value == "ADICIONAL") {
    items_hide.forEach((item) => {
      item.classList.add("item_disable");
    });
    cateGlobal.classList.remove("item_disable");
    casinoGlobal.classList.remove("item_disable");
  } else {
    items_hide.forEach((item) => {
      item.classList.remove("item_disable");
    });
  }
});

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
      this.imgElement.src = `/dinamicas/promocion-dados-magicos/resource/${this.currentIndex}.png`;
      this.imgElement.alt = `${this.prefix} ${this.currentIndex}`;
    }, 500);
  }

  stopOnNumber(number) {
    if (this.stopping) return;
    this.stopping = true;
    this.targetNumber = number;
    clearInterval(this.interval);
    const valselect1 = document.getElementById("num_dado_1").value;
    const valselect2 = document.getElementById("num_dado_2").value;
    const valselect3 = document.getElementById("num_dado_3").value;
    // ValorFinal_lamp.textContent = "prueba de que gano"

    // Empezamos a bajar la velocidad y después quedamos en la imagen final
    let current = this.currentIndex;
    const slowDown = () => {
      if (current === number) {
        this.imgElement.src = `/dinamicas/promocion-dados-magicos/resource/${number}.png`;
        this.imgElement.alt = `${this.prefix} ${number}`;
        return;
      }
      current = (current % this.imagesCount) + 1;
      this.imgElement.src = `/dinamicas/promocion-dados-magicos/resource/${current}.png`;
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
  document.getElementById("num_dado_1"),
);
const slot2 = new SlotMachine(
  document.getElementById("slot-2do"),
  "2do",
  document.getElementById("num_dado_2"),
);
const slot3 = new SlotMachine(
  document.getElementById("slot-3er"),
  "3er",
  document.getElementById("num_dado_3"),
);

// Iniciar slots al cargar la página
slot1.start();
slot2.start();
slot3.start();

document.getElementById("num_dado_1").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot1.stopOnNumber(val);
});

document.getElementById("num_dado_2").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot2.stopOnNumber(val);
});

document.getElementById("num_dado_3").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot3.stopOnNumber(val);
});

btn_validar.addEventListener("click", () => {
  let DadoVal1 = document.getElementById("num_dado_1").value;
  let DadoVal2 = document.getElementById("num_dado_2").value;
  let DadoVal3 = document.getElementById("num_dado_3").value;
  let categoria = document.getElementById("categoria").value;

  if (categoria == "") {
    Swal.fire({
      icon: "warning",
      title: "Selecciona una categoría valida",
    });
    return;
  }
  if (DadoVal1 == "" || DadoVal2 == "" || DadoVal3 == "") {
    Swal.fire({
      icon: "warning",
      title: "Dados sin valor",
    });
    return;
  }
  validatePremio();
});

const CASINOS_VALIDOS = [
  "A19",
  "A50",
  "A70",
  "A38",
  "A35",
  "A36",
  "A39",
  "A88",
  "A48",
  "A49",
  "MP100",
  "A100",
  "A781",
  "A12-MESAS",
  "MP15-MESAS",
  "MP108-MESAS",
  "A127-MESAS",
];

const CASINOS_ALL = [
  "A05",
  "A07",
  "A08",
  "A09",
  "A12",
  "MP15",
  "A16",
  "MP108",
  "MP127",
  "A43",
  "A53",
];

const PREMIOS = {
  VALIDOS: {
    TRIPLE_1_5: { ESTANDAR: "$ 200.000", SUPERIOR: "$ 250.000" },
    TRIPLE_6: { ESTANDAR: "$ 500.000", SUPERIOR: "$ 700.000" },

    SUMAS: {
      "9,10,11,12": { ESTANDAR: "$ 80.000", SUPERIOR: "$ 100.000" },
      "7,8,13,14": { ESTANDAR: "$ 90.000", SUPERIOR: "$ 110.000" },
      "5,6,15,16": { ESTANDAR: "$ 100.000", SUPERIOR: "$ 120.000" },
      "4,17": { ESTANDAR: "$ 120.000", SUPERIOR: "$ 150.000" },
    },
  },

  ALL: {
    TRIPLE_1_5: {
      BRONCE: "$ 200.000",
      SILVER: "$ 250.000",
      GOLD: "$ 300.000",
      LEGENDARIO: "$ 350.000",
      TITANIO: "$ 400.000",
      GENIUS: "$ 500.000",
    },
    TRIPLE_6: {
      BRONCE: "$ 500.000",
      SILVER: "$ 700.000",
      GOLD: "$ 1.000.000",
      LEGENDARIO: "$ 1.300.000",
      TITANIO: "$ 1.500.000",
      GENIUS: "$ 2.000.000",
    },
    SUMAS: {
      "9,10,11,12": {
        BRONCE: "$ 80.000",
        SILVER: "$ 90.000",
        GOLD: "$ 100.000",
        LEGENDARIO: "$ 110.000",
        TITANIO: "$ 120.000",
        GENIUS: "$ 150.000",
      },
      "7,8,13,14": {
        BRONCE: "$ 90.000",
        SILVER: "$ 100.000",
        GOLD: "$ 110.000",
        LEGENDARIO: "$ 120.000",
        TITANIO: "$ 130.000",
        GENIUS: "$ 160.000",
      },
      "5,6,15,16": {
        BRONCE: "$ 100.000",
        SILVER: "$ 110.000",
        GOLD: "$ 120.000",
        LEGENDARIO: "$ 130.000",
        TITANIO: "$ 140.000",
        GENIUS: "$ 170.000",
      },
      "4,17": {
        BRONCE: "$ 120.000",
        SILVER: "$ 130.000",
        GOLD: "$ 150.000",
        LEGENDARIO: "$ 160.000",
        TITANIO: "$ 170.000",
        GENIUS: "$ 200.000",
      },
    },
  },
};

function normalizarCasino(casino) {
  return String(casino || "")
    .trim()
    .toUpperCase()
    .replace("-MESAS", "");
}

function obtenerGrupoCasino(casinoNorm) {
  if (CASINOS_VALIDOS.includes(casinoNorm)) return "VALIDOS";
  if (CASINOS_ALL.includes(casinoNorm)) return "ALL";
  return null;
}

function buscarPremioPorSuma(grupoCfg, total, categoria) {
  for (const key of Object.keys(grupoCfg.SUMAS)) {
    const nums = key.split(",").map((n) => Number(n.trim()));
    if (nums.includes(total)) {
      return grupoCfg.SUMAS[key]?.[categoria] || null;
    }
  }
  return null;
}

function validatePremio() {
  const d1 = document.getElementById("num_dado_1")?.value?.trim();
  const d2 = document.getElementById("num_dado_2")?.value?.trim();
  const d3 = document.getElementById("num_dado_3")?.value?.trim();

  let casino = document.getElementById("casino")?.value;
  const categoria = document
    .getElementById("categoria")
    ?.value?.trim()
    .toUpperCase();

  if (!d1 || !d2 || !d3 || !casino || !categoria) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos",
      text: "Completa dados, casino y categoría.",
    });
    return;
  }

  const casinoNorm = normalizarCasino(casino);
  const grupo = obtenerGrupoCasino(casinoNorm);

  if (!grupo) {
    Swal.fire({
      icon: "info",
      title: "Sin premio",
      text: "Casino no definido en la tabla.",
    });
    return;
  }

  const grupoCfg = PREMIOS[grupo];

  const esTriple = d1 === d2 && d2 === d3;
  const total = Number(d1) + Number(d2) + Number(d3);

  if (esTriple && ["1", "2", "3", "4", "5"].includes(d1)) {
    const premio = grupoCfg.TRIPLE_1_5?.[categoria] || null;
    if (!premio) {
      Swal.fire({
        icon: "info",
        title: "Sin premio",
        text: "Categoría no definida para este premio.",
      });
      return;
    }
    alertaPremio(`Triple ${d1}`, categoria, premio);
    return;
  }

  if (esTriple && d1 === "6") {
    const premio = grupoCfg.TRIPLE_6?.[categoria] || null;
    if (!premio) {
      Swal.fire({
        icon: "info",
        title: "Sin premio",
        text: "Categoría no definida para este premio.",
      });
      return;
    }
    alertaPremio(`Triple 6`, categoria, premio);
    return;
  }

  const premioSuma = buscarPremioPorSuma(grupoCfg, total, categoria);

  if (premioSuma) {
    alertaPremio(total, categoria, premioSuma);
    return;
  }

  Swal.fire({
    icon: "info",
    title: "Sin premio",
    text: "Para esa combinación no hay valor (N/A o no definido).",
  });
}

function alertaPremio(total, categoria, premio) {
  Swal.fire({
    icon: "success",
    title: `Con ${categoria}`,
    html: `Con un total de ${total}, ganaste un premio de ${premio}, en Dinero Promocional`,
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.8 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.8 },
  });

  items_hide.forEach((item) => {
    item.classList.add("item_disable");
  });

  btn_validar.style.display = "none";
}

btn_reset.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro?",
    text: "Se reiniciara el Tablero",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si Quiero!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Reiniciado!",
        text: "El tablero se reiniciara al confirmar.",
        icon: "success",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    }
  });
  // resetBoard();
});

function resetBoard() {
  document.getElementById("casino").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("num_dado_1").value = "";
  document.getElementById("num_dado_2").value = "";
  document.getElementById("num_dado_3").value = "";

  slot1.start();
  slot2.start();
  slot3.start();

  items_hide.forEach((item) => {
    item.classList.remove("item_disable");
  });
}

btn_enviar.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  let casino = document.getElementById("casino");
  let categoria = document.getElementById("categoria");
  let nombre = document.getElementById("nombre");
  const d1 = document.getElementById("num_dado_1")?.value?.trim();
  const d2 = document.getElementById("num_dado_2")?.value?.trim();
  const d3 = document.getElementById("num_dado_3")?.value?.trim();
  let resultado = "";

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

  const esTriple = d1 === d2 && d2 === d3;
  const total = Number(d1) + Number(d2) + Number(d3);
  resultado = total;

  if (esTriple == true) {
    resultado = `TRIPLE ${d1}`;
  }

  if (esTriple && d1 === "6") {
    resultado = "TRIPLE 6";
  }

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
      valor_5: casino.value,
      valor_6: categoria.value,
      valor_7: "0",
      valBono: "0",
      valor_8: "0",
      valor_9: promocion,
      valor_10: user.Nombre,
    };
  } else {
    if (
      !categoria.value ||
      !casino.value ||
      !nombre.value ||
      !d1 ||
      !d2 ||
      !d3
    ) {
      Swal.fire({
        icon: "warning",
        title: "Completa toda la información",
      });
      return;
    }

    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre.value,
      valor_4: "",
      valor_5: casino.value,
      valor_6: categoria.value,
      valor_7: resultado,
      valor_9: promocion,
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
        casino.value = "";
        categoria.value = "";
        nombre.value = "";
        document.getElementById("num_dado_1").value = "";
        document.getElementById("num_dado_2").value = "";
        document.getElementById("num_dado_3").value = "";
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Exito",
          html: "Envió exitoso",
        });
      })
      .catch((err) => {
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error",
          html: `Comunícate con el área de comunicaciones, ${err}`,
        });
      });
    return;
  }

  setTimeout(() => {
    casino.value = "";
    categoria.value = "";
    nombre.value = "";
    document.getElementById("num_dado_1").value = "";
    document.getElementById("num_dado_2").value = "";
    document.getElementById("num_dado_3").value = "";
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

btn_send_secundario.addEventListener("click", () => {
  handleSecoSubmit();
});

function handleSecoSubmit() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let valor_promo_modal = document.getElementById("valor_promo_modal");

  if (categoria_modal.value == "ADICIONAL") {
    bono_modal.value = "0";
    valor_promo_modal.value = "0";
  }

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !valor_promo_modal.value
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
    valor_5: casino_modal.value,
    valor_6: categoria_modal.value,
    valor_7: valor_promo_modal.value,
    valor_8: bono_modal.value,
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
      casino_modal.value = "";
      categoria_modal.value = "";
      hora_modal.value = "";
      fecha_modal.value = "";
      nombre_modal.value = "";
      bono_modal.value = "";
      valor_promo_modal.value = "";
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
        html: `Comunícate con el área de comunicaciones, ${err}`,
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleSubmitObs();
});

function handleSubmitObs() {
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
      icon: "success",
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

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: `Comunícate con el área de comunicaciones, ${err}`,
      });
    });
}

function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_acumula");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

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
    { casino, categoria, nombre, cedula, fecha, hora, resultado },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_7).trim() === String(resultado).trim() &&
        String(r.valor_6).trim() === String(categoria).trim() &&
        String(r.valor_5).trim() === String(casino).trim() &&
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
          resultado,
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
