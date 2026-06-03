window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const btn_devolver_jugada = document.getElementById("btn_devolver_jugada");
const img_jugando = document.querySelectorAll("._fichas_en_juego_");
const _resultado_goles_ = document.getElementById("_resultado_goles_");
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const btn_enviar = document.getElementById("btn_enviar");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const lanzamientos = document.getElementById("lanzamientos");
const resultado_mas_tiros = document.getElementById("resultado_mas_tiros");
const loader = document.getElementById("loader");

const url =
  "https://script.google.com/macros/s/AKfycbx-JrmlLKUqKlSX3TzCVA-ghwfNPnizpuLxjEl6CN9iqMHQzrZJfpS18Gsu05ITMfhm/exec";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosFiebreFutbolera";
const FECHA_KEY = "fechaFiebreFutbolera";
const hoy = new Date().toDateString();
const user = inforUser();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const promocion = "Fiebre Futbolera";

let turnoLength = 0;
let goles = 0;
let turnoImg = 1;
let turnoNuevo = 0;
let limTurnos = 5;
const historialJugadas = [];

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    img_jugando.forEach((img) => {
      img.classList.add("item_disable");
    });
  } else {
    casino.classList.remove("item_disable");
    img_jugando.forEach((img) => {
      img.classList.remove("item_disable");
    });
  }
});

lanzamientos.innerHTML = `0 / 5`;

img_jugando.forEach((img) => {
  img.title = "Fichas en Juego";
  img.addEventListener("click", () => {
    if (!casino.value || !categoria.value) {
      Swal.fire({ icon: "warning", title: "Campos en Blanco" });
      return;
    }

    if (img.classList.contains("item_disable")) return;

    if (turnoLength === limTurnos) {
      Swal.fire({ icon: "warning", title: "Sin lanzamientos" });
      return;
    }

    let huboGol = "No";
    if (img.dataset.gol) {
      goles++;
      huboGol = "Si";
      _resultado_goles_.textContent = goles === 1 ? "1 Gol" : `${goles} Goles`;
    }

    if (img.dataset.penalti) {
      turnoNuevo += 1;
      limTurnos = 7;
    }

    img.classList.add(`posicion_${turnoImg}`);
    img.classList.add("item_disable");

    historialJugadas.push({ elemento: img, turno: turnoImg, gol: huboGol });

    turnoLength = historialJugadas.length;
    lanzamientos.innerHTML = `${turnoLength} / ${limTurnos}`;
    turnoImg += 1;

    // console.log("turnoLength :",turnoLength);
    // console.log("goles :", goles);

    if (turnoLength === limTurnos) {
      let grupoPertenece = Object.keys(gruposCasinos).find((key) =>
        gruposCasinos[key].includes(casino.value),
      );

      if (
        grupoPertenece &&
        tablas[grupoPertenece] &&
        tablas[grupoPertenece][categoria.value]
      ) {
        const premios = tablas[grupoPertenece][categoria.value];
        let valPremio = premios[`ACIERTO_${goles}`] || 0;
        if (valPremio === 0) {
          Swal.fire({
            allowOutsideClick: false,
            customClass: {
              popup: "_content_alerta_",
            },
            html: `<div class="_content_msj_alerta_ _otro_intento_">
            <img src="/dinamicas/promocion-fiebre-futbolera/resources/otro_intento.png" alt="Aladdin">
            <br/>
            <span><b>Sin goles, tienes otro intento.</b></span>
          </div>`,
          }).then((res) => {
            if (res.isConfirmed) {
              resetAllFiebre();
            }
          });
        } else {
          alertaPremio(valPremio, categoria.value, goles);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Configuración de tablas no encontrada",
        });
      }
    }
  });
});

btn_devolver_jugada.addEventListener("click", () => {
  if (turnoLength === 0) {
    Swal.fire({ icon: "warning", title: "Sin turnos" });
    return;
  }

  casino.classList.remove("item_disable");
  categoria.classList.remove("item_disable");

  const ultimaJugada = historialJugadas.pop();

  if (ultimaJugada.gol === "Si") {
    goles -= 1;
  }

  _resultado_goles_.textContent = goles === 1 ? "1 Gol" : `${goles} Goles`;

  ultimaJugada.elemento.classList.remove(`posicion_${ultimaJugada.turno}`);
  ultimaJugada.elemento.classList.remove("item_disable");

  turnoLength = historialJugadas.length;
  lanzamientos.innerHTML = turnoLength;
  turnoImg = ultimaJugada.turno;
});

function alertaPremio(premio, cate, golesActuales) {
  img_jugando.forEach((img) => {
    img.classList.add("item_disable");
  });
  casino.classList.add("item_disable");
  categoria.classList.add("item_disable");
  confettiAl();
  Swal.fire({
    customClass: {
      popup: "_content_alerta_",
    },
    html: `<div class="_content_msj_alerta_">
            <img src="/dinamicas/promocion-jugada-ganadora/resources/jugador_ala.png" alt="Aladdin">
            <p>¡Con ${cate}!</p>
            <br/>
            <span>Obtuviste : <b>${golesActuales == 0 ? "Cero Goles" : golesActuales == 1 ? `${golesActuales} Gol` : `${golesActuales} Goles`}</b>, Con un Premio: <b>$${premio.toLocaleString()} en Dinero promocional.</b></span>
          </div>`,
  });
}

btn_enviar.addEventListener("click", () => {
  handleSendFiebre();
});

function handleSendFiebre() {
  let data = {};
  if (!nombre.value || !casino.value || !categoria.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
  }

  console.log(goles);
  if (categoria.value != "ADICIONAL") {
    if (goles === 0) {
      Swal.fire({
        icon: "warning",
        title: "Resultado Invalido",
      });
      return;
    }
  }

  return;

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
    valor_7: categoria.value == "ADICIONAL" ? "0" : goles,
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
    resetAllFiebre();
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
  handleSSubmit();
});

function handleSSubmit() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let aciertos_modal = document.getElementById("aciertos_modal");

  let data = {
    tipo: "envio_1",
    valor_1: hora_modal.value,
    valor_2: fecha_modal.value,
    valor_3: nombre_modal.value,
    valor_5: casino_modal.value,
    valor_6: categoria_modal.value,
    valor_7: categoria_modal.value == "ADICIONAL" ? "0" : aciertos_modal.value,
    valor_8: categoria_modal.value == "ADICIONAL" ? "0" : bono_modal.value,
    valor_9: promocion,
    valor_10: user.Nombre,
  };

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !aciertos_modal.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  console.log(data);
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
      bono_modal.value = "";
      aciertos_modal.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envió",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleObsSend();
});

function handleObsSend() {
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

function resetAllFiebre() {
  nombre.value = "";
  if (goles != 0) {
    casino.value = "";
    categoria.value = "";
  }
  turnoLength = 0;
  goles = 0;
  turnoImg = 1;
  turnoNuevo = 0;
  limTurnos = 5;
  historialJugadas.length = 0;
  _resultado_goles_.textContent = "";
  casino.classList.remove("item_disable");
  categoria.classList.remove("item_disable");
  lanzamientos.innerHTML = `${turnoLength} / ${limTurnos}`;

  img_jugando.forEach((img) => {
    img.classList.remove(
      "item_disable",
      "posicion_1",
      "posicion_2",
      "posicion_3",
      "posicion_4",
      "posicion_5",
      "posicion_6",
      "posicion_7",
    );
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

const gruposCasinos = {
  grupo1: [
    "A50",
    "A38",
    "A35",
    "A39",
    "A88",
    "A48",
    "A48-MESAS",
    "A49",
    "A100",
    "A12-MESAS",
  ],
  grupo2: ["A36", "A781", "A108-MESAS", "A127-MESAS", "A15-MESAS", "A36-MESAS"],
  grupo3: ["A05", "A07", "A08", "A09", "A12", "A15", "A70", "A16", "A19"],
  grupo4: ["A43", "A53", "A108", "A127"],
};

const tablas = {
  grupo1: {
    ESTANDAR: {
      ACIERTO_5: 300000,
      ACIERTO_4: 100000,
      ACIERTO_3: 70000,
      ACIERTO_2: 60000,
      ACIERTO_1: 50000,
    },
    SUPERIOR: {
      ACIERTO_5: 500000,
      ACIERTO_4: 150000,
      ACIERTO_3: 90000,
      ACIERTO_2: 80000,
      ACIERTO_1: 70000,
    },
  },
  grupo2: {
    ESTANDAR: {
      ACIERTO_5: 300000,
      ACIERTO_4: 120000,
      ACIERTO_3: 100000,
      ACIERTO_2: 90000,
      ACIERTO_1: 80000,
    },
    SUPERIOR: {
      ACIERTO_5: 500000,
      ACIERTO_4: 150000,
      ACIERTO_3: 120000,
      ACIERTO_2: 110000,
      ACIERTO_1: 100000,
    },
  },
  grupo3: {
    BRONCE: {
      ACIERTO_5: 300000,
      ACIERTO_4: 100000,
      ACIERTO_3: 70000,
      ACIERTO_2: 60000,
      ACIERTO_1: 50000,
    },
    SILVER: {
      ACIERTO_5: 400000,
      ACIERTO_4: 120000,
      ACIERTO_3: 80000,
      ACIERTO_2: 70000,
      ACIERTO_1: 60000,
    },
    GOLD: {
      ACIERTO_5: 500000,
      ACIERTO_4: 150000,
      ACIERTO_3: 90000,
      ACIERTO_2: 80000,
      ACIERTO_1: 70000,
    },
    LEGENDARIO: {
      ACIERTO_5: 600000,
      ACIERTO_4: 160000,
      ACIERTO_3: 100000,
      ACIERTO_2: 90000,
      ACIERTO_1: 80000,
    },
    TITANIO: {
      ACIERTO_5: 800000,
      ACIERTO_4: 180000,
      ACIERTO_3: 110000,
      ACIERTO_2: 100000,
      ACIERTO_1: 90000,
    },
    GENIUS: {
      ACIERTO_5: 1000000,
      ACIERTO_4: 200000,
      ACIERTO_3: 120000,
      ACIERTO_2: 110000,
      ACIERTO_1: 100000,
    },
  },

  grupo4: {
    BRONCE: {
      ACIERTO_5: 300000,
      ACIERTO_4: 120000,
      ACIERTO_3: 100000,
      ACIERTO_2: 90000,
      ACIERTO_1: 80000,
    },
    SILVER: {
      ACIERTO_5: 400000,
      ACIERTO_4: 150000,
      ACIERTO_3: 110000,
      ACIERTO_2: 100000,
      ACIERTO_1: 90000,
    },
    GOLD: {
      ACIERTO_5: 500000,
      ACIERTO_4: 160000,
      ACIERTO_3: 120000,
      ACIERTO_2: 110000,
      ACIERTO_1: 100000,
    },
    LEGENDARIO: {
      ACIERTO_5: 600000,
      ACIERTO_4: 180000,
      ACIERTO_3: 130000,
      ACIERTO_2: 120000,
      ACIERTO_1: 110000,
    },
    TITANIO: {
      ACIERTO_5: 800000,
      ACIERTO_4: 200000,
      ACIERTO_3: 140000,
      ACIERTO_2: 130000,
      ACIERTO_1: 120000,
    },
    GENIUS: {
      ACIERTO_5: 1000000,
      ACIERTO_4: 220000,
      ACIERTO_3: 150000,
      ACIERTO_2: 140000,
      ACIERTO_1: 130000,
    },
  },
};
