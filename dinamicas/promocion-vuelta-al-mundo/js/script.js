window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

let widt_screen = window.innerWidth;
// if(widt_screen <= 1280){
// document.body.style.zoom = "67%";
// }

const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const totalLanz = document.getElementById("totalLanz");
const num_bono = document.getElementById("num_bono");
const loader = document.getElementById("loader");
const btn_enviar = document.getElementById("btn_enviar");
const btn_opcion = document.getElementById("btn_opciones");

const avance_1 = document.getElementById("avance_1");
const avance_2 = document.getElementById("avance_2");
const avance_3 = document.getElementById("avance_3");

const acumula_avion = document.getElementById("acumula_avion");

// btn modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");

const btn_validar = document.getElementById("btn_validar");
const btn_reset = document.getElementById("btn_reset");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

// view modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion",
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

const close_modal_icon = document.getElementById("close_modal_icon");
const expandir = document.getElementById("expandir");

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);
notificacion_registro_dia.style.display = "none";

document.getElementById("btn_refrescar").addEventListener("click", () => {
  Swal.fire({
    title: "Seguro de refrescar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si Quiero!",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Exito!",
        text: "Se refrescara todo en pantalla.",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          location.reload();
        }
      });
    }
  });
});

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

let resultadoAvion_1 = "";
let resultadoAvion_2 = "";
let resultadoAvion_3 = "";

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

let turnoAvion = 1; // 1 -> 2 -> 3
let turnoAcumulado = 0;
let totalPremio = 0;

const RANGOS = {
  1: { min: 1, max: 6 },
  2: { min: 7, max: 12 },
  3: { min: 13, max: 18 },
};

function getIndexPosicion(el) {
  // el.id = "posicion_7" es 7
  const m = (el.id || "").match(/^posicion_(\d+)$/);
  return m ? Number(m[1]) : null;
}

function esValidaParaTurno(posIndex, turno) {
  const r = RANGOS[turno];
  if (!r) return false;
  return posIndex >= r.min && posIndex <= r.max;
}

const clasesPosiciones_1 = [
  "posicion_panama", //clase de inicio
  "posicion_buenos_aires",
  "posicion_rio_de_janeiro",
  "posicion_nueva_york",
  "posicion_las_vegas",
  "posicion_quebec", // maxima posicion avance 1
];

const clasesPosiciones_2 = [
  "posicion_madrid", // minima posicion de avance 2
  "posicion_roma",
  "posicion_paris",
  "posicion_londres",
  "posicion_amsterdam",
  "posicion_berlin", // maxima posicion de avance 2
];

const clasesPosiciones_3 = [
  "posicion_el_cairo", // minima posicion de avance 3
  "posicion_dubai",
  "posicion_moscu",
  "posicion_tokyo",
  "posicion_sydney",
  "posicion_beijin", // final
];

const POS_INDEX_TO_CLASS = {};
const POS_CLASS_TO_INDEX = {};

document.querySelectorAll(".ficha_vuelo").forEach((el) => {
  const m = (el.id || "").match(/^posicion_(\d+)$/);
  if (!m) return;
  const idx = Number(m[1]);
  const cls = el.classList[1];
  POS_INDEX_TO_CLASS[idx] = cls;
  POS_CLASS_TO_INDEX[cls] = idx;
});

function minDinamicoPorTurno(turno) {
  if (turno === 1) return 1;
  if (turno === 2) return getAvionIndex(avance_1, 1);
  if (turno === 3) return getAvionIndex(avance_2, 2);
  return 1;
}

function maxPorTurno(turno) {
  if (turno === 1) return 6;
  if (turno === 2) return 12;
  if (turno === 3) return 18;
  return 0;
}

function validaMovimientoDinamico(turno, destino) {
  const min = minDinamicoPorTurno(turno);
  const max = maxPorTurno(turno);
  return destino >= min && destino <= max;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let MOVIENDO = false;
function getAvionIndex(avion, turno) {
  const found = [...avion.classList].find((c) => POS_CLASS_TO_INDEX[c]);
  if (found) return POS_CLASS_TO_INDEX[found];

  const RANGOS = { 1: { min: 1 }, 2: { min: 7 }, 3: { min: 13 } };
  return (RANGOS[turno]?.min ?? 1) - 1;
}

function getPosClassDeAvion(avion) {
  return [...avion.classList].find((c) => POS_CLASS_TO_INDEX[c]) || null;
}

function setPosClassDeAvion(avion, posClass) {
  if (!posClass) return;

  [...avion.classList].forEach((c) => {
    if (POS_CLASS_TO_INDEX[c]) avion.classList.remove(c);
  });

  avion.classList.add(posClass);
}

async function moverAvionPasoAPaso(avion, turno, destinoIndex) {
  const actual = getAvionIndex(avion, turno);

  if (destinoIndex <= actual) return;

  avion.classList.remove("avance_1", "avance_2", "avance_3");

  for (let i = actual + 1; i <= destinoIndex; i++) {
    [...avion.classList].forEach((c) => {
      if (POS_CLASS_TO_INDEX[c]) avion.classList.remove(c);
    });

    avion.classList.add(POS_INDEX_TO_CLASS[i]);

    await sleep(430);
  }
}

const posiciones = document.querySelectorAll(".ficha_vuelo");

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    document.querySelector(".board").classList.add("item_disable");
  } else {
    document.querySelector(".board").classList.remove("item_disable");
  }
  posiciones.forEach((val) => {
    if (
      categoria.value == "BRONCE" ||
      categoria.value == "SILVER" ||
      categoria.value == "ESTANDAR"
    ) {
      document.getElementById(`posicion_1`).dataset.valor = "30";
      document.getElementById(`posicion_2`).dataset.valor = "20";
      document.getElementById(`posicion_3`).dataset.valor = "20";
      document.getElementById(`posicion_4`).dataset.valor = "20";
      document.getElementById(`posicion_5`).dataset.valor = "20";
      document.getElementById(`posicion_6`).dataset.valor = "40";
      document.getElementById(`posicion_7`).dataset.valor = "30";
      document.getElementById(`posicion_8`).dataset.valor = "30";
      document.getElementById(`posicion_9`).dataset.valor = "30";
      document.getElementById(`posicion_10`).dataset.valor = "30";
      document.getElementById(`posicion_11`).dataset.valor = "40";
      document.getElementById(`posicion_12`).dataset.valor = "50";
      document.getElementById(`posicion_13`).dataset.valor = "40";
      document.getElementById(`posicion_14`).dataset.valor = "40";
      document.getElementById(`posicion_15`).dataset.valor = "50";
      document.getElementById(`posicion_16`).dataset.valor = "80";
      document.getElementById(`posicion_17`).dataset.valor = "200";
      document.getElementById(`posicion_18`).dataset.valor = "310";
    } else if (
      categoria.value == "GOLD" ||
      categoria.value == "LEGENDARIO" ||
      categoria.value == "SUPERIOR"
    ) {
      document.getElementById(`posicion_1`).dataset.valor = "40";
      document.getElementById(`posicion_2`).dataset.valor = "20";
      document.getElementById(`posicion_3`).dataset.valor = "20";
      document.getElementById(`posicion_4`).dataset.valor = "30";
      document.getElementById(`posicion_5`).dataset.valor = "40";
      document.getElementById(`posicion_6`).dataset.valor = "50";
      document.getElementById(`posicion_7`).dataset.valor = "30";
      document.getElementById(`posicion_8`).dataset.valor = "30";
      document.getElementById(`posicion_9`).dataset.valor = "30";
      document.getElementById(`posicion_10`).dataset.valor = "30";
      document.getElementById(`posicion_11`).dataset.valor = "40";
      document.getElementById(`posicion_12`).dataset.valor = "100";
      document.getElementById(`posicion_13`).dataset.valor = "50";
      document.getElementById(`posicion_14`).dataset.valor = "50";
      document.getElementById(`posicion_15`).dataset.valor = "100";
      document.getElementById(`posicion_16`).dataset.valor = "200";
      document.getElementById(`posicion_17`).dataset.valor = "250";
      document.getElementById(`posicion_18`).dataset.valor = "350";
    } else if (categoria.value == "TITANIO" || categoria.value == "GENIUS") {
      document.getElementById(`posicion_1`).dataset.valor = "50";
      document.getElementById(`posicion_2`).dataset.valor = "20";
      document.getElementById(`posicion_3`).dataset.valor = "20";
      document.getElementById(`posicion_4`).dataset.valor = "40";
      document.getElementById(`posicion_5`).dataset.valor = "60";
      document.getElementById(`posicion_6`).dataset.valor = "60";
      document.getElementById(`posicion_7`).dataset.valor = "30";
      document.getElementById(`posicion_8`).dataset.valor = "30";
      document.getElementById(`posicion_9`).dataset.valor = "30";
      document.getElementById(`posicion_10`).dataset.valor = "30";
      document.getElementById(`posicion_11`).dataset.valor = "40";
      document.getElementById(`posicion_12`).dataset.valor = "150";
      document.getElementById(`posicion_13`).dataset.valor = "60";
      document.getElementById(`posicion_14`).dataset.valor = "60";
      document.getElementById(`posicion_15`).dataset.valor = "150";
      document.getElementById(`posicion_16`).dataset.valor = "250";
      document.getElementById(`posicion_17`).dataset.valor = "300";
      document.getElementById(`posicion_18`).dataset.valor = "490";
    }
  });
});

posiciones.forEach((item) => {
  item.addEventListener("click", async () => {
    if (!casino.value || !categoria.value) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
        text: "Selecciona un Casino y Categoria Valida.",
      });
      return;
    }
    const tieneAlgunaPosicion_1 = clasesPosiciones_1.some((clase) =>
      avance_1.classList.contains(clase),
    );

    const tieneAlgunaPosicion_2 = clasesPosiciones_2.some((clase) =>
      avance_2.classList.contains(clase),
    );
    const tieneAlgunaPosicion_3 = clasesPosiciones_3.some((clase) =>
      avance_3.classList.contains(clase),
    );

    const destinoIndex = Number(item.id.split("_")[1]);

    let fichaPulsada = item.id.split("_")[1];

    console.log(resultadoAvion_1);

    if (resultadoAvion_1 == destinoIndex) {
      Swal.fire({
        icon: "warning",
        title: "Movimiento invalido",
      });
      return;
    } else if (resultadoAvion_2 == destinoIndex) {
      Swal.fire({
        icon: "warning",
        title: "Movimiento invalido",
      });
      return;
    } else if (resultadoAvion_3 == destinoIndex) {
      Swal.fire({
        icon: "warning",
        title: "Movimiento invalido",
      });
      return;
    }

    casino.classList.add("item_disable");
    categoria.classList.add("item_disable");

    if (turnoAvion == 1) {
      if (fichaPulsada <= 6) {
        if (MOVIENDO) return;
        try {
          MOVIENDO = true;
          await moverAvionPasoAPaso(avance_1, 1, destinoIndex);
          avance_1.classList.remove("avance_1");
          avance_2.classList.add("avance_1");
          avance_2.classList.remove("avance_2");
          avance_3.classList.add("avance_2");
          avance_3.classList.remove("avance_3");
          avance_1.style.pointerEvents = "none";
          if (fichaPulsada == 6) {
            avance_1.classList.add("posicion_6_8");
          }
          turnoAcumulado = Number(fichaPulsada);
          turnoAvion = 2;
          totalPremio += Number(item.dataset.valor);
          acumula_avion.innerHTML =
            formatoPesos_monto_efectivo.format(totalPremio) + ".000";
          resultadoAvion_1 = fichaPulsada;
        } finally {
          MOVIENDO = false;
        }

        // avance_1.classList.remove("avance_1");
        // avance_2.classList.add("avance_1");
        // avance_2.classList.remove("avance_2");
        // avance_3.classList.add("avance_2");
        // avance_3.classList.remove("avance_3");
        // avance_1.classList.add(item.classList[1]);
        // avance_1.style.pointerEvents = "none";
        // turnoAcumulado = Number(fichaPulsada);
        // turnoAvion = 2;
        // totalPremio += Number(item.dataset.valor);

        return;
      } else {
        Swal.fire({
          icon: "warning",
          title: "No se puede mover",
          text: "Posición no valida para el avion 1",
        });
      }
    } else if (turnoAvion == 2) {
      const destino = destinoIndex;
      if (!validaMovimientoDinamico(2, destino)) {
        const min = minDinamicoPorTurno(2);
        Swal.fire({
          icon: "warning",
          title: "No se puede mover",
          text: `Avión 2: solo de ${min} a 12.`,
        });
        return;
      }

      if (MOVIENDO) return;

      try {
        MOVIENDO = true;
        setPosClassDeAvion(avance_2, getPosClassDeAvion(avance_1));

        await moverAvionPasoAPaso(avance_2, 2, destino);

        turnoAcumulado = destino;
        turnoAvion = 3;
        totalPremio += Number(item.dataset.valor);
        resultadoAvion_2 = fichaPulsada;
        acumula_avion.innerHTML =
          formatoPesos_monto_efectivo.format(totalPremio) + ".000";

        avance_3.classList.remove("avance_2");
        avance_3.classList.add("avance_1");

        if (fichaPulsada >= 6 && fichaPulsada <= 8) {
          avance_2.classList.add("posicion_6_8");
        } else {
          avance_2.classList.add("posicion_9_14");
        }

        setPosClassDeAvion(avance_3, getPosClassDeAvion(avance_2));
      } finally {
        MOVIENDO = false;
      }
    } else if (turnoAvion == 3) {
      const destino = destinoIndex;
      if (!validaMovimientoDinamico(3, destino)) {
        const min = minDinamicoPorTurno(3);
        Swal.fire({
          icon: "warning",
          title: "No se puede mover",
          text: `Avión 3: solo de ${min} a 18.`,
        });
        return;
      }

      if (MOVIENDO) return;

      try {
        MOVIENDO = true;
        setPosClassDeAvion(avance_3, getPosClassDeAvion(avance_2));

        await moverAvionPasoAPaso(avance_3, 3, destino);

        turnoAcumulado = destino;
        turnoAvion = 4;
        totalPremio += Number(item.dataset.valor);
        resultadoAvion_3 = fichaPulsada;
        acumula_avion.innerHTML =
          formatoPesos_monto_efectivo.format(totalPremio) + ".000";

        if (fichaPulsada >= 9 && fichaPulsada <= 14) {
          avance_3.classList.add("posicion_9_14");
        } else if (fichaPulsada >= 15 && fichaPulsada <= 17) {
          avance_3.classList.add("posicion_15_17");
        } else if (fichaPulsada == 18) {
          avance_3.classList.add("posicion_18_");
        }

        alertPremio(categoria.value, totalPremio);
      } finally {
        MOVIENDO = false;
      }
    } else if (turnoAvion == 4) {
      Swal.fire({
        icon: "warning",
        title: "Sin Movimiento",
      });
      return;
    }
  });
});

function alertPremio(categ, valorPremio) {
  Swal.fire({
    icon: "success",
    title: `Con ${categ}`,
    html: `Ganaste un premios de ${formatoPesos_monto_efectivo.format(valorPremio)}.000 en Dinero Promocional`,
  });

  confettiAl();
}

const IN_FLIGHT = new Set();
const LS_KEY = "registrosVueltaMundo";
const FECHA_KEY = "fechaVueltaMundo";
const promocion = "Vuelta al Mundo";

const user = inforUser();

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const url =
  "https://script.google.com/macros/s/AKfycbwH8mXRtqk-AdPcXX7baZedoAdGxvav8O15sUxWVIgZzohVQ_vVPWFcqFrLN8qHFBQS9Q/exec";

btn_enviar.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  if (!casino.value || !categoria.value || !nombre.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let item_1;
  let item_2;
  let item_3;

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
    item_1 = "0";
    item_2 = "0";
    item_3 = "0";
    resultadoAvion_3 = "0";
  } else {
    item_1 = document.getElementById(`posicion_${resultadoAvion_1}`).title;
    item_2 = document.getElementById(`posicion_${resultadoAvion_2}`).title;
    item_3 = document.getElementById(`posicion_${resultadoAvion_3}`).title;
  }

  data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: "",
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: resultadoAvion_3,
    valBono: categoria.value == "ADICIONAL" ? "0" : "",
    ...(categoria.value == "ADICIONAL" ? { valor_8: "0" } : ""),
    valor_9: item_1,
    valor_10: item_2,
    valor_11: item_3,
    valor_12: promocion,
    valor_13: user.Nombre,
  };

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
        loader.style.display = "none";
        document.querySelector(".board").classList.remove("item_disable");
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
          html: "Si el error continúa, comunicate con el area de comunicaciones.",
        });
      });
    return;
  }

  setTimeout(() => {
    casino.value = "";
    categoria.value = "";
    nombre.value = "";
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
  let pais1_modal = document.getElementById("pais1_modal");
  let pais2_modal = document.getElementById("pais2_modal");
  let pais3_modal = document.getElementById("pais3_modal");

  if (categoria_modal.value == "ADICIONAL") {
    bono_modal.value = 0;
    valor_promo_modal.value = 0;
    pais1_modal.value = 0;
    pais2_modal.value = 0;
    pais3_modal.value = 0;
  }

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !valor_promo_modal.value ||
    !pais1_modal.value ||
    !pais2_modal.value ||
    !pais3_modal.value
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
    valor_9: pais1_modal.value,
    valor_10: pais2_modal.value,
    valor_11: pais3_modal.value,
    valor_12: promocion,
    valor_13: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      hora_modal.value = "";
      fecha_modal.value = "";
      nombre_modal.value = "";
      casino_modal.value = "";
      categoria_modal.value = "";
      valor_promo_modal.value = "";
      bono_modal.value = "";
      pais1_modal.value = "";
      pais2_modal.value = "";
      pais3_modal.value = "";
      loader.style.display = "none";
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
        html: "Si el error continúa, comunicate con el area de comunicaciones.",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleObservacion();
});

function handleObservacion() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

  if (!casino_observacion.value || !descripcion_observacion.value) {
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
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: "Si el error continúa, comunicate con el area de comunicaciones.",
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
                    data-pais1="${r.valor_9}"
                    data-pais2="${r.valor_10}"
                    data-pais3="${r.valor_11}"
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
    {
      casino,
      categoria,
      nombre,
      cedula,
      fecha,
      hora,
      resultado,
      pais1,
      pais2,
      pais3,
    },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_11).trim() === String(pais3).trim() &&
        String(r.valor_10).trim() === String(pais2).trim() &&
        String(r.valor_9).trim() === String(pais1).trim() &&
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
      pais1 = "",
      pais2 = "",
      pais3 = "",
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
      valor_9: pais1,
      valor_10: pais2,
      valor_11: pais3,
      valor_12: promocion,
      valor_13: user.Nombre,
    };

    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return;
    IN_FLIGHT.add(key);

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
          pais1,
          pais2,
          pais3,
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

      if (document.body.contains(btn)) {
        btn.disabled = false;
        btn.textContent = prevText;
        delete btn.dataset.sending;
      }
    }
  };
  content_registro_dia.addEventListener(
    "click",
    content_registro_dia._clickHandler,
  );
}
GetResgistroDia();
