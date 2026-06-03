window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const user = inforUser();

const IN_FLIGHT = new Set();
const LS_KEY = "registrosjugadaGanadora";
const FECHA_KEY = "fechajugadaGanadora";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}
const promocion = "Jugada Ganadora";
const url =
  "https://script.google.com/macros/s/AKfycbwpuhSLdzmFYNuk545JeUi5iGE4B3bf3Lmj8_gYqIoIX-p7cLEPx649up_-VvP4SFNm/exec";

const _id_balon_ = document.getElementById("_id_balon_");
const _ficha_player_ = document.getElementById("_ficha_player_");
const dado_1 = document.getElementById("dado_1");
const dado_2 = document.getElementById("dado_2");
const dado_3 = document.getElementById("dado_3");
const categoria = document.getElementById("categoria");
const btn_enviar = document.getElementById("btn_enviar");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const _board_jugada_ = document.getElementById("_board_jugada_");
const btn_back_show_number = document.getElementById("btn_back_show_number");

const numeroAfuera = ["9", "10", "11", "12"];
const numeroPalo = ["4", "17", "5", "6", "15", "16", "7", "8", "13", "14"];
const numeroArquero = ["111", "222", "333", "444", "555"];
const numeroGol = ["666", "18"];

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);

let numeroCombi;

let accion1 = "Marcaste un gran gol";
let accion2 = "El arquero te lo tapo";
let accion3 = "El remate pego en el palo";
let accion4 = "El remate salió desviado";

_id_balon_.addEventListener("click", () => {});

categoria.addEventListener("change", () => {
  if (categoria.value == "" || categoria.value == "ADICIONAL") {
    dado_1.disabled = true;
  } else {
    dado_1.disabled = false;
  }
});

function moveBallDina(posi, num) {
  _ficha_player_.src =
    "/dinamicas/promocion-jugada-ganadora/resources/PLAYER_ACCION.png";
  setTimeout(() => {
    _ficha_player_.src =
      "/dinamicas/promocion-jugada-ganadora/resources/PLAYER_SHOT.png";
  }, 150);
  setTimeout(() => {
    _ficha_player_.src =
      "/dinamicas/promocion-jugada-ganadora/resources/PLAYER.png";
  }, 850);
  setTimeout(() => {
    _id_balon_.classList.add(`posicion_${posi}`);
  }, 151);
  let realNum;
  if (posi.includes("suma_")) {
    realNum = posi.split("suma_")[1];
  } else {
    realNum = posi;
  }
  setTimeout(() => {
    validateAlert(realNum);
  }, 800);
}

function validateAlert(num) {
  let Allitem = obtenerPremio(categoria.value, Number(num));
  let valPremio = Allitem.premio;
  let valAccion = Allitem.accion;

  numeroCombi = Number(num);

  Swal.fire({
    html: `<div class="_content_msj_alerta_">
            <img src="/dinamicas/promocion-jugada-ganadora/resources/jugador_ala.png" alt="Aladdin">
            <p>Con ${categoria.value}</p>
            <br/>
            <span>${valAccion} y obtuviste un premio de ${formatoPesos_monto_efectivo.format(valPremio)}, en Dinero Promocional</span>
          </div>`,
    customClass: {
      popup: "_content_alerta_",
    },
    allowOutsideClick: false,
  });
  confettiAl();
}

const premiosCategorias = {
  BRONCE: {
    TRIPLE_6: {
      numeros: [666],
      premio: 500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 200000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 110000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 100000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 90000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 80000,
      accion: accion4,
    },
  },

  SILVER: {
    TRIPLE_6: {
      numeros: [666],
      premio: 700000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 250000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 120000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 110000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 100000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 90000,
      accion: accion4,
    },
  },

  GOLD: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 300000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 130000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 120000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 110000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 100000,
      accion: accion4,
    },
  },

  LEGENDARIO: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1300000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 350000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 140000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 130000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 120000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 110000,
      accion: accion4,
    },
  },

  TITANIO: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 400000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 150000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 140000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 130000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 120000,
      accion: accion4,
    },
  },

  GENIUS: {
    TRIPLE_6: {
      numeros: [666],
      premio: 2000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 500000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 160000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 150000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 140000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 130000,
      accion: accion4,
    },
  },

  ESTANDAR: {
    TRIPLE_6: {
      numeros: [666],
      premio: 500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 200000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 120000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 100000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 90000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 80000,
      accion: accion4,
    },
  },

  SUPERIOR: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 300000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 150000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 120000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 110000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 100000,
      accion: accion4,
    },
  },
};

function obtenerPremio(categoria, numero) {
  const premios = premiosCategorias[categoria];

  if (!premios) {
    return "Categoría no existe";
  }

  for (const key in premios) {
    const jugada = premios[key];

    if (jugada.numeros.includes(numero)) {
      return {
        premio: jugada.premio,
        accion: jugada.accion,
      };
    }
  }

  return "No ganó";
}

dado_1.addEventListener("change", () => {
  if (dado_1.value == "") {
    dado_2.disabled = true;
  } else {
    dado_2.disabled = false;
  }
});

dado_2.addEventListener("change", () => {
  if (dado_2.value == "") {
    dado_3.disabled = true;
  } else {
    dado_3.disabled = false;
  }
});

dado_3.addEventListener("change", () => {
  if (dado_3.value == "") {
    dado_3.disabled = false;
  } else {
    dado_3.disabled = true;
    let valorPosi = "";
    let totalLanza =
      Number(dado_1.value) + Number(dado_2.value) + Number(dado_3.value);

    if (dado_1.value == "6" && dado_2.value == "6" && dado_3.value == "6") {
      valorPosi = "666";
    } else if (
      dado_1.value == "5" &&
      dado_2.value == "5" &&
      dado_3.value == "5"
    ) {
      valorPosi = "555";
    } else if (
      dado_1.value == "4" &&
      dado_2.value == "4" &&
      dado_3.value == "4"
    ) {
      valorPosi = "444";
    } else if (
      dado_1.value == "3" &&
      dado_2.value == "3" &&
      dado_3.value == "3"
    ) {
      valorPosi = "333";
    } else if (
      dado_1.value == "2" &&
      dado_2.value == "2" &&
      dado_3.value == "2"
    ) {
      valorPosi = "222";
    } else if (
      dado_1.value == "1" &&
      dado_2.value == "1" &&
      dado_3.value == "1"
    ) {
      valorPosi = "111";
    } else {
      valorPosi = "suma_" + totalLanza;
    }
    categoria.disabled = true;
    setTimeout(() => {
      moveBallDina(valorPosi, totalLanza);
    }, 800);
  }
});

function deshabilitarItem(elemento) {
  document.getElementById(elemento).disabled = true;
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
      ficha2 = "",
      ficha3 = "",
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
        },
        valBonoregistr,
      );

      if (tr) {
        const tdBono = tr.querySelector("td:nth-child(5)");
        const tdAcc = tr.querySelector("td:nth-child(6)");
        if (tdBono) tdBono.innerHTML = escapeHtml(valBonoregistr);
        if (tdAcc)
          tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
      }

      Swal.fire({
        icon: ok ? "success" : "info",
        title: ok ? "Bono asignado" : "Registro no encontrado",
        customClass: {
          popup: "",
          title: "",
          confirmButton: "",
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

function getDataObs() {
  const container = document.getElementById("result_observaciones_dinamica");
  container.innerHTML = "Cargando...";

  fetch(`${url}?hoja=observaciones`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "Sin Observaciones.";
        loader.style.display = "none";
        return;
      }

      container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Usuario</th>
                  <th>Hora</th>
                  <th>Fecha</th>
                  <th>Observación</th>
                  <th>Casino</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
               ${data
                 .reverse()
                 .map((registro, i) => {
                   // Formateamos la hora aquí mismo
                   const horaFormateada = new Date(
                     registro.Hora,
                   ).toLocaleTimeString("es-CO", {
                     hour: "2-digit",
                     minute: "2-digit",
                   });

                   return `
            <tr>
              <td>${i + 1}</td>
              <td>${registro.Usuario}</td>
              <td>${horaFormateada}</td> 
              <td>${registro.Fecha.substring(0, 10)}</td>
              <td>${registro.Observacion}</td>
              <td>${registro.Casino}</td>
              ${registro.Estado == "" ? `<td class="pendi_obs">Pendiente</td>` : `<td class="corre_obs">Corregido</td>`}
              
            </tr>
          `;
                 })
                 .join("")}
              </tbody>
            </table>
          </div>
        `;
    });
}
getDataObs();

btn_enviar.addEventListener("click", () => {
  handleSendJugada();
});

function handleSendJugada() {
  let nombreVal = document.getElementById("nombre");
  let casinoVal = document.getElementById("casino");
  let data = {};
  if (categoria.value != "ADICIONAL") {
    if (!dado_1.value || !dado_2.value || !dado_3.value) {
      Swal.fire({
        icon: "warning",
        title: "Completa el mini Juego",
      });
      return;
    }
  }

  if (!categoria.value || !nombreVal.value || !casinoVal.value) {
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

  data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: "",
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: categoria.value == "ADICIONAL" ? "0" : numeroCombi,
    valBono: categoria.value == "ADICIONAL" ? "0" : "",
    ...(categoria.value == "ADICIONAL" ? { valor_8: "0" } : ""),
    valor_9: promocion,
    valor_10: user.Nombre,
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        nombreVal.value = "";
        casinoVal.value = "";
        categoria.value = "";
        dado_1.value = "";
        dado_2.value = "";
        dado_3.value = "";
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
          title: "Error en el envió",
        });
      });
    return;
  }

  setTimeout(() => {
    nombreVal.value = "";
    casinoVal.value = "";
    categoria.value = "";
    dado_1.value = "";
    dado_2.value = "";
    dado_3.value = "";
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
  handleSecondJugada();
});

function handleSecondJugada() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let resultado_modal = document.getElementById("resultado_modal");

  let data = {};

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !resultado_modal.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blancos",
    });
    return;
  }

  data = {
    tipo: "envio_1",
    valor_1: hora_modal.value,
    valor_2: fecha_modal.value,
    valor_3: nombre_modal.value,
    valor_4: "",
    valor_5: casino_modal.value,
    valor_6: categoria_modal.value,
    valor_7: resultado_modal.value,
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
      hora_modal.value = "";
      fecha_modal.value = "";
      nombre_modal.value = "";
      casino_modal.value = "";
      categoria_modal.value = "";
      resultado_modal.value = "";
      bono_modal.value = "";
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
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      getDataObs();
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

btn_back_show_number.addEventListener("click", () => {
  let textLas = btn_back_show_number.textContent;
  btn_back_show_number.textContent = "Cargando...";
  _board_jugada_.classList.add("board_temp");
  btn_back_show_number.classList.add("item_disable");
  _board_jugada_.style.pointerEvents = "none";
  categoria.style.pointerEvents = "none";
  setTimeout(() => {
    btn_back_show_number.textContent = textLas;
    _board_jugada_.classList.remove("board_temp");
    btn_back_show_number.classList.remove("item_disable");
    _board_jugada_.classList.remove("item_disable");
    _board_jugada_.style.pointerEvents = "auto";
    categoria.style.pointerEvents = "auto";
  }, 4000);
});
