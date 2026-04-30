document.body.style.zoom = "100%";
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const user = inforUser();
let num_ganador = "";
let valor_multiplicador = "";

const promocion = "Ruleta de Premios";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosRuletaPremios";
const FECHA_KEY = "fechaRuletaPremios";
let url =
  "https://script.google.com/macros/s/AKfycbw3PjXm5OifO5bk7f3qcfMu_oBM_V7MSZNj8RjiJiwG9YG7ZMg29nduJ01OlKTH71llKw/exec";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const btn_opciones = document.getElementById("btn_opciones");
const close_modal_icon = document.getElementById("close_modal_icon");
const expandir = document.getElementById("expandir");

const loader = document.getElementById("loader");

const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");

// botones modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");
const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);
notificacion_registro_dia.style.display = "none";

// vista modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion",
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

const btn_enviar = document.getElementById("btn_enviar");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_reiniciar = document.getElementById("btn_reiniciar");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

btn_reiniciar.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro?",
    text: "Se reiniciara el Tablero!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si quiero!",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Reiniciado!",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    }
  });
});

expandir.addEventListener("click", () => {
  document
    .getElementById("content_modal_dinamica")
    .classList.toggle("item_full_screen");
});

btn_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "flex";
  btn_guardar_registro.classList.add("select_menu");
  view_guardar_registro.style.display = "flex";
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "none";
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

const Num_Rojos = [
  "1",
  "3",
  "5",
  "7",
  "9",
  "12",
  "14",
  "16",
  "18",
  "19",
  "21",
  "23",
  "25",
  "27",
  "30",
  "32",
  "34",
  "36",
];

const Num_Negros = [
  "2",
  "4",
  "6",
  "8",
  "10",
  "11",
  "13",
  "15",
  "17",
  "20",
  "22",
  "24",
  "26",
  "28",
  "29",
  "31",
  "33",
  "35",
];

const Num_Verdes = ["0", "00"];

const ORDEN_RULETA_AMERICANA = [
  "0",
  "28",
  "9",
  "26",
  "30",
  "11",
  "7",
  "20",
  "32",
  "17",
  "5",
  "22",
  "34",
  "15",
  "3",
  "24",
  "36",
  "13",
  "1",
  "00",
  "27",
  "10",
  "25",
  "29",
  "12",
  "8",
  "19",
  "31",
  "18",
  "6",
  "21",
  "33",
  "16",
  "4",
  "23",
  "35",
  "14",
  "2",
];

const contenedor = document.getElementById("contenedor-caracol");
const totalCuadros = 38;

// contenedor.classList.add("item_disable");

let filaInicio = 1,
  filaFin = 10;
let colInicio = 1,
  colFin = 11;

let idx = 0;

while (idx < totalCuadros) {
  for (let i = colInicio; i <= colFin && idx < totalCuadros; i++) {
    crearCuadro(filaInicio, i, ORDEN_RULETA_AMERICANA[idx++]);
  }
  filaInicio++;

  for (let i = filaInicio; i <= filaFin && idx < totalCuadros; i++) {
    crearCuadro(i, colFin, ORDEN_RULETA_AMERICANA[idx++]);
  }
  colFin--;

  for (let i = colFin; i >= colInicio && idx < totalCuadros; i--) {
    crearCuadro(filaFin, i, ORDEN_RULETA_AMERICANA[idx++]);
  }
  filaFin--;

  for (let i = filaFin; i >= filaInicio && idx < totalCuadros; i--) {
    crearCuadro(i, colInicio, ORDEN_RULETA_AMERICANA[idx++]);
  }
  colInicio++;
}

document.getElementById("casino").addEventListener("change", () => {
  if (
    CASOFFMYMAWI.includes(document.getElementById("casino").value) &&
    CATOFFMYMAWI.includes(document.getElementById("categoria").value)
  ) {
    document.getElementById("content_xfichas").style.display = "none";
  } else {
    document.getElementById("content_xfichas").style.display = "flex";
  }
});

document.getElementById("categoria").addEventListener("change", () => {
  if (
    CASOFFMYMAWI.includes(document.getElementById("casino").value) &&
    CATOFFMYMAWI.includes(document.getElementById("categoria").value)
  ) {
    document.getElementById("content_xfichas").style.display = "none";
  } else {
    document.getElementById("content_xfichas").style.display = "flex";
  }
});

const TABLA_PREMIOS = {
  GRUPO_1: {
    // A43, A53, MP108, A127
    MYMAWI: {
      BRONCE: 500000,
      SILVER: 500000,
      GOLD: 600000,
      LEGENDARIO: 600000,
      TITANIO: 700000,
      GENIUS: 700000,
    },
    X5: {
      BRONCE: 400000,
      SILVER: 400000,
      GOLD: 450000,
      LEGENDARIO: 450000,
      TITANIO: 500000,
      GENIUS: 500000,
    },
    X3: {
      BRONCE: 240000,
      SILVER: 240000,
      GOLD: 270000,
      LEGENDARIO: 270000,
      TITANIO: 300000,
      GENIUS: 300000,
    },
    X2: {
      BRONCE: 160000,
      SILVER: 160000,
      GOLD: 180000,
      LEGENDARIO: 180000,
      TITANIO: 200000,
      GENIUS: 200000,
    },
    X1: {
      BRONCE: 80000,
      SILVER: 80000,
      GOLD: 90000,
      LEGENDARIO: 90000,
      TITANIO: 100000,
      GENIUS: 100000,
    },
  },
  GRUPO_2: {
    // A05, A07, A08, A09, A12, A15, A16
    MYMAWI: {
      BRONCE: 400000,
      SILVER: 400000,
      GOLD: 600000,
      LEGENDARIO: 600000,
      TITANIO: 700000,
      GENIUS: 700000,
    },
    X5: {
      BRONCE: 300000,
      SILVER: 300000,
      GOLD: 400000,
      LEGENDARIO: 400000,
      TITANIO: 500000,
      GENIUS: 500000,
    },
    X3: {
      BRONCE: 180000,
      SILVER: 180000,
      GOLD: 240000,
      LEGENDARIO: 240000,
      TITANIO: 300000,
      GENIUS: 300000,
    },
    X2: {
      BRONCE: 120000,
      SILVER: 120000,
      GOLD: 160000,
      LEGENDARIO: 160000,
      TITANIO: 200000,
      GENIUS: 200000,
    },
    X1: {
      BRONCE: 60000,
      SILVER: 60000,
      GOLD: 80000,
      LEGENDARIO: 80000,
      TITANIO: 100000,
      GENIUS: 100000,
    },
  },
  GRUPO_3: {
    // A36, A781, MP108M, A127M, A12M, MP15M, A36M
    MYMAWI: {
      ESTANDAR: 0,
      SUPERIOR: 500000,
    },
    X5: {
      ESTANDAR: 300000,
      SUPERIOR: 400000,
    },
    X3: {
      ESTANDAR: 180000,
      SUPERIOR: 240000,
    },
    X2: {
      ESTANDAR: 120000,
      SUPERIOR: 160000,
    },
    X1: {
      ESTANDAR: 60000,
      SUPERIOR: 80000,
    },
  },
  GRUPO_4: {
    // A19, A50, A70, A38, A35, A39, A88, A48, A48M, A49, MP100, MP100M,A100
    MYMAWI: {
      ESTANDAR: 0,
      SUPERIOR: 500000,
    },
    X5: {
      ESTANDAR: 250000,
      SUPERIOR: 350000,
    },
    X3: {
      ESTANDAR: 150000,
      SUPERIOR: 210000,
    },
    X2: {
      ESTANDAR: 100000,
      SUPERIOR: 140000,
    },
    X1: {
      ESTANDAR: 50000,
      SUPERIOR: 70000,
    },
  },
};

function obtenerGrupoCasino(casino) {
  if (["A43", "A53", "A108", "A127"].includes(casino)) {
    return "GRUPO_1";
  }
  if (["A05", "A07", "A08", "A09", "A12", "A15", "A16"].includes(casino)) {
    return "GRUPO_2";
  }

  if (
    [
      "A36",
      "A781",
      "MP108-MESAS",
      "A108-MESAS",
      "A127-MESAS",
      "A12-MESAS",
      "A15-MESAS",
      "A36-MESAS",
    ].includes(casino)
  ) {
    return "GRUPO_3";
  }

  if (
    [
      "A19",
      "A50",
      "A70",
      "A38",
      "A35",
      "A39",
      "A88",
      "A48",
      "A48-MESAS",
      "A49",
      "MP100",
      "MP100-MESAS",
      "A100",
      "A100-MESAS",
    ].includes(casino)
  ) {
    return "GRUPO_4";
  }

  return null;
}

const CASOFFMYMAWI = [
  "A19",
  "A50",
  "A70",
  "A38",
  "A35",
  "A39",
  "A88",
  "A48",
  "A48M",
  "A49",
  "MP100",
  "MP100M",
  "A100",
  "A36",
  "A781",
  "MP108-MESAS",
  "A108-MESAS",
  "A127-MESAS",
  "A12-MESAS",
  "A15-MESAS",
  "A36-MESAS",
];

const CATOFFMYMAWI = ["ESTANDAR"];

function getMultiplicadorFromDiv(div) {
  if (div.classList.contains("moneda_x2")) return "X2";
  if (div.classList.contains("moneda_x3")) return "X3";
  if (div.classList.contains("moneda_x5")) return "X5";
  if (div.classList.contains("moneda_mymawi")) return "X-MYMAWI";
  return "X1";
}

function obtenerPremio({ casino, categoria, multiplicador }) {
  const grupo = obtenerGrupoCasino(casino);
  if (!grupo) return null;

  const mult = multiplicador.replace("X-", "").replace("X", "");
  const key = mult === "MYMAWI" ? "MYMAWI" : `X${mult}`;

  return TABLA_PREMIOS[grupo]?.[key]?.[categoria] ?? null;
}

function crearCuadro(fila, col, valor) {
  const div = document.createElement("div");

  div.className = "cuadro";
  div.classList.add("efect_sele");
  div.textContent = valor;

  div.style.gridRow = fila;
  div.style.gridColumn = col;

  div.id = `cuadro_${String(valor)}`;
  div.title = `Numero ${String(valor)}`;

  if (Num_Negros.includes(String(valor))) {
    div.classList.add("ficha_negro");
  } else if (Num_Rojos.includes(String(valor))) {
    div.classList.add("ficha_rojo");
  } else if (Num_Verdes.includes(String(valor))) {
    div.classList.add("ficha_verde");
  }

  div.addEventListener("click", () => {
    if (
      !document.getElementById("casino").value ||
      !document.getElementById("categoria")
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
      });
      return;
    }
    if (contenedor.classList.contains("item_disable")) return;

    const monedas = [
      "moneda_x2",
      "moneda_x3",
      "moneda_x5",
      "moneda_mymawi",
      "moneda_mymawi_sin",
    ];

    const c2 = document.querySelectorAll(".moneda_x2").length;
    const c3 = document.querySelectorAll(".moneda_x3").length;
    const c5 = document.querySelectorAll(".moneda_x5").length;

    const cm =
      CASOFFMYMAWI.includes(casino.value) &&
      CATOFFMYMAWI.includes(categoria.value)
        ? 1
        : document.querySelectorAll(".moneda_mymawi").length;

    const cg = document.querySelectorAll(".moneda_ganadora").length;

    const todasListas = c2 === 6 && c3 === 1 && c5 === 1 && cm === 1;

    console.log(todasListas);

    if (todasListas) {
      const casinoSel = document.getElementById("casino").value.trim();
      const categoriaSel = document.getElementById("categoria").value.trim();

      const multiplicador = getMultiplicadorFromDiv(div);

      const premio = obtenerPremio({
        casino: casinoSel,
        categoria: categoriaSel,
        multiplicador,
      });

      if (!premio) {
        Swal.fire({
          icon: "info",
          title: "Sin premio",
          text: "Para esa combinación no hay valor (N/A o no definido).",
        });
        return;
      }

      document
        .getElementById(`cuadro_${valor}`)
        .classList.add("moneda_ganadora");
      contenedor.classList.add("item_disable");

      num_ganador = String(div.textContent).trim();
      confettiAl();
      Swal.fire({
        icon: "success",
        html: `<p style="font-size:4rem;margin:0">${num_ganador}</p>
                <p>El Multiplicador de tu Número es <strong> ${multiplicador}</strong></p>
                <p>Con categoría <strong> ${categoriaSel}</strong>, Ganaste <strong> ${
                  premio
                    ? new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      }).format(premio)
                    : "Sin premio"
                }</strong>, en dinero promocional</p>
              `,
        allowOutsideClick: false,
      });

      return;
    }

    if (monedas.some((m) => div.classList.contains(m))) {
      if (div.classList.contains("moneda_mymawi")) {
        document
          .getElementById("moneda_mymawi_1")
          ?.classList.remove("item_disable");
      }

      if (div.classList.contains("moneda_x5")) {
        document.getElementById("moneda_5_1")?.classList.remove("item_disable");
      }

      if (div.classList.contains("moneda_x3")) {
        document.getElementById("moneda_3_1")?.classList.remove("item_disable");
      }

      if (div.classList.contains("moneda_x2")) {
        const c2Actual = document.querySelectorAll(".moneda_x2").length;
        document
          .getElementById(`moneda_2_${c2Actual}`)
          ?.classList.remove("item_disable");
      }

      div.classList.remove(...monedas);
      return;
    }

    if (cm < 1) {
      div.classList.add("moneda_mymawi");
      document.getElementById("moneda_mymawi_1").classList.add("item_disable");
      return;
    }

    if (c5 < 1) {
      div.classList.add("moneda_x5");
      document.getElementById(`moneda_5_1`).classList.add("item_disable");
      return;
    }
    if (c3 < 1) {
      div.classList.add("moneda_x3");
      document.getElementById(`moneda_3_1`).classList.add("item_disable");
      return;
    }
    if (c2 < 6) {
      div.classList.add("moneda_x2");
      document
        .getElementById(`moneda_2_${c2 + 1}`)
        .classList.add("item_disable");
      return;
    }
  });

  contenedor.appendChild(div);
}

btn_enviar.addEventListener("click", () => {
  handleSubmit();
});

document.getElementById("categoria").addEventListener("change", () => {
  if (document.getElementById("categoria").value == "ADICIONAL") {
    contenedor.classList.add("item_disable");
  } else {
    contenedor.classList.remove("item_disable");
  }
});

function handleSubmit() {
  let casino = document.getElementById("casino");
  let nombre = document.getElementById("nombre");
  let categoria = document.getElementById("categoria");
  let itemV = document.getElementById(`cuadro_${num_ganador}`);

  let data = {};

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

  if (!casino.value || !nombre.value || !categoria.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (categoria.value == "ADICIONAL") {
    valor_multiplicador = "0";

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
      valor_9: "0",
      valor_10: promocion,
      valor_11: user.Nombre,
    };
  }

  if (categoria.value != "ADICIONAL") {
    if (!itemV) {
      Swal.fire({
        icon: "warning",
        title: "Sin juego",
      });
      return;
    } else {
      if (itemV.classList.contains("moneda_x2")) {
        valor_multiplicador = "X2";
      } else if (itemV.classList.contains("moneda_x3")) {
        valor_multiplicador = "X3";
      } else if (itemV.classList.contains("moneda_x5")) {
        valor_multiplicador = "X5";
      } else if (itemV.classList.contains("moneda_mymawi")) {
        valor_multiplicador = "X-MYMAWI";
      } else {
        valor_multiplicador = `X1`;
      }
    }

    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre.value,
      valor_4: "",
      valor_5: casino.value,
      valor_6: categoria.value,
      valor_7: valor_multiplicador,
      valBono: "",
      valor_9: num_ganador,
      valor_10: promocion,
      valor_11: user.Nombre,
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
        contenedor.classList.remove("item_disable");
        ORDEN_RULETA_AMERICANA.forEach((num) => {
          const elemento = document.getElementById(`cuadro_${num}`);
          if (elemento.classList.contains("moneda_x2")) {
            elemento.classList.remove("moneda_x2");
          }
          if (elemento.classList.contains("moneda_x3")) {
            elemento.classList.remove("moneda_x3");
          }
          if (elemento.classList.contains("moneda_x5")) {
            elemento.classList.remove("moneda_x5");
          }
          if (elemento.classList.contains("moneda_mymawi")) {
            elemento.classList.remove("moneda_mymawi");
          }
          if (elemento.classList.contains("moneda_ganadora")) {
            elemento.classList.remove("moneda_ganadora");
          }
        });
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
        });
      })
      .catch(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el Envió",
          html: "Ha ocurrido un error, comunícate con el área de comunicaciones",
        });
      });
    return;
  }

  setTimeout(() => {
    casino.value = "";
    categoria.value = "";
    nombre.value = "";
    ORDEN_RULETA_AMERICANA.forEach((num) => {
      const elemento = document.getElementById(`cuadro_${num}`);

      if (elemento.classList.contains("moneda_x2")) {
        elemento.classList.remove("moneda_x2");
      }
      if (elemento.classList.contains("moneda_x3")) {
        elemento.classList.remove("moneda_x3");
      }
      if (elemento.classList.contains("moneda_x5")) {
        elemento.classList.remove("moneda_x5");
      }
      if (elemento.classList.contains("moneda_mymawi")) {
        elemento.classList.remove("moneda_mymawi");
      }
      if (elemento.classList.contains("moneda_ganadora")) {
        elemento.classList.remove("moneda_ganadora");
      }
    });
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
  handleSecondSubmit();
});

function handleSecondSubmit() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let valor_promo_modal = document.getElementById("valor_promo_modal");
  let numero_mostrado = document.getElementById("numero_mostrado");

  if (categoria_modal.value == "ADICIONAL") {
    bono_modal.value = "0";
    valor_promo_modal.value = "0";
    numero_mostrado.value = "0";
  }

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !valor_promo_modal.value ||
    !numero_mostrado.value
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
    valor_9: numero_mostrado.value,
    valor_10: promocion,
    valor_11: user.Nombre,
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
      hora_modal.value = "";
      fecha_modal.value = "";
      nombre_modal.value = "";
      casino_modal.value = "";
      categoria_modal.value = "";
      valor_promo_modal.value = "";
      numero_mostrado.value = "";
      bono_modal.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
        html: "Error en el envió, comunícate con el Área de comunicaciones",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleSendObs();
});

function handleSendObs() {
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
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: `Error en él envió ${error}, comunícate con el área de comunicaciones.`,
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
                    data-numero="${r.valor_9}"
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
    { casino, categoria, nombre, cedula, fecha, hora, resultado, numero },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_9).trim() === String(numero).trim() &&
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
      numero = "",
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
      valor_9: numero,
      valor_10: promocion,
      valor_11: user.Nombre,
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
          numero,
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
