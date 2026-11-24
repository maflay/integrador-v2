window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
//   const fechaCompleta = new Date().toLocaleString("es-CO", {
//     timeZone: "America/Bogota",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });
//   const [fecha, hora] = fechaCompleta.split(", ");
document.getElementById("_send_sched_").addEventListener("click", () => {
  handleSendSched();
});

let HORAS_ASIGNADA = 0;

document
  .getElementById("_btn_generar_horario_")
  .addEventListener("click", () => {
    document.getElementById("ruleta").style.display = "flex";
  });

document.getElementById("_close_ruleta_").addEventListener("click", () => {
  document.getElementById("ruleta").style.display = "none";
});

const canvas = document.getElementById("ruletaCanvas");
const ctx = canvas.getContext("2d");

const inputsOpciones = [
  document.getElementById("opcion1"),
  document.getElementById("opcion2"),
  document.getElementById("opcion3"),
];

const btnGirar = document.getElementById("btnGirar");
const btnGirarSecundario = document.getElementById("btnGirarSecundario");
const displayResultado = document.getElementById("valorCapturado");
const inputOcultoResultado = document.getElementById("inputOcultoResultado");

const colores = ["#d90429", "#f4a261", "#4b0082"];
const textosColor = ["#ffffff", "#111111", "#ffffff"];
const numSectores = 3;
const anguloSector = (2 * Math.PI) / numSectores;

let anguloActual = 0;
let girando = false;

function dibujarRuleta() {
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  const radio = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSectores; i++) {
    const anguloInicio = anguloActual + i * anguloSector;
    const anguloFin = anguloInicio + anguloSector;

    ctx.beginPath();
    ctx.moveTo(centroX, centroY);
    ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
    ctx.closePath();
    ctx.fillStyle = colores[i];
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffd700";
    ctx.stroke();

    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(anguloInicio + anguloSector / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = textosColor[i];
    ctx.font = 'bold 18px "Segoe UI", sans-serif';

    const texto = inputsOpciones[i].value.trim() || `Opción ${i + 1}`;
    ctx.fillText(texto, radio - 28, 6);
    ctx.restore();
  }
}

function iniciarGiro() {
  if (girando) return;
  girando = true;
  toggleBotones(true);
  displayResultado.textContent = "Girando...";

  const vueltasExtra = (Math.floor(Math.random() * 4) + 5) * 2 * Math.PI;
  const anguloAleatorio = Math.random() * 2 * Math.PI;
  const rotacionTotal = vueltasExtra + anguloAleatorio;

  const anguloInicial = anguloActual;
  const duracion = 4000;
  const tiempoInicio = performance.now();

  function animar(tiempoActual) {
    const transcurrido = tiempoActual - tiempoInicio;
    const progreso = Math.min(transcurrido / duracion, 1);

    const easeOut = 1 - Math.pow(1 - progreso, 4);
    anguloActual = anguloInicial + rotacionTotal * easeOut;

    dibujarRuleta();

    if (progreso < 1) {
      requestAnimationFrame(animar);
    } else {
      girando = false;
      toggleBotones(false);
      capturarGanador();
    }
  }

  requestAnimationFrame(animar);
}

function capturarGanador() {
  const anguloPuntero = (3 * Math.PI) / 2;
  const anguloNormalizado = anguloActual % (2 * Math.PI);

  let diferencia = (anguloPuntero - anguloNormalizado) % (2 * Math.PI);
  if (diferencia < 0) diferencia += 2 * Math.PI;

  const indiceGanador = Math.floor(diferencia / anguloSector);
  const valorGanador =
    inputsOpciones[indiceGanador].value.trim() || `Opción ${indiceGanador + 1}`;

  displayResultado.textContent = valorGanador;
  HORAS_ASIGNADA = valorGanador;
  inputOcultoResultado.value = valorGanador;

  onResultadoCapturado(valorGanador, indiceGanador);
}

function onResultadoCapturado(valor, indice) {
  // console.log(`Pieza #${indice + 1} seleccionada -> Valor: "${valor}"`);
}

function toggleBotones(deshabilitar) {
  btnGirar.disabled = deshabilitar;
  btnGirarSecundario.disabled = deshabilitar;
  inputsOpciones.forEach((input) => (input.disabled = deshabilitar));
}

inputsOpciones.forEach((input) => {
  input.addEventListener("input", dibujarRuleta);
});

btnGirar.addEventListener("click", iniciarGiro);
btnGirarSecundario.addEventListener("click", iniciarGiro);

dibujarRuleta();

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

let user = inforUser();

const nivelesOcultos = [1, 2, 6];

  document.querySelector("._est_sche_").classList.add("dont_screen");
  document.querySelector("._est_sche_").style.display = "none";


if (nivelesOcultos.includes(Number(user.Nivel))) {
  document.querySelector("._est_sche_").classList.remove("dont_screen");
} else {
  document.querySelector("._est_sche_").classList.add("dont_screen");
}

let loader = document.getElementById("loader");
let _rango_fec_estas_ = document.getElementById("_rango_fec_estas_");
let promocion = "Gana Mas";

let url =
  "https://script.google.com/macros/s/AKfycbwbET5s1tkTe5bx-do_9O6UuSuCojmKl2WGHDCZ6_YO8f-zG_Pi7Z5RP22fiLV4-peb/exec";

function handleSendSched() {
  let _hor_ini_ = document.getElementById("_hor_ini_");
  let _hor_fin_ = document.getElementById("_hor_fin_");

  if (_hor_ini_.value == "" || _hor_fin_.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Horario incorrecto",
    });
    return;
  }

  let valIni = parseInt(_hor_ini_.value);
  let valFin = parseInt(_hor_fin_.value);

  if (
    _hor_ini_.value == "" ||
    _hor_fin_.value == "" ||
    valIni < 1 ||
    valIni > 24 ||
    valFin < 1 ||
    valFin > 24
  ) {
    Swal.fire({
      icon: "warning",
      title: "Horario incorrecto",
      text: "Las horas deben estar entre 1 y 24.",
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

  let dataHor = {
    tipo: "horario",
    Hora: hora,
    Fecha: fecha,
    Hora_ini: _hor_ini_.value,
    Hora_final: _hor_fin_.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";

  fetch(`${url}?hoja=horario`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(dataHor),
  })
    .then((res) => res.text())
    .then(() => {
      _hor_ini_.value = "";
      _hor_fin_.value = "";
      loader.style.display = "none";
      _rango_fec_estas_.textContent = `Cargando...`;
      getHorario();
      Swal.fire({
        icon: "success",
        title: "Horario Creado",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Erro en el Envio",
      });
    });
}
getHorario();

function getHorario() {
  fetch(`${url}?hoja=horario`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        _rango_fec_estas_.textContent = `Sin Horario`;
        return;
      }
      let getData = [...data].reverse();
      let horainiGet = getData[0].Hora_ini ? getData[0].Hora_ini : "00";
      let horafinGet = getData[0].Hora_final ? getData[0].Hora_final : "00";
      _rango_fec_estas_.textContent = `${horainiGet}:00:00 - ${horafinGet}:00:00`;
    });
}

document.getElementById("_btn_crear_player_").addEventListener("click", () => {
  handleCrearPlayer();
});

function handleCrearPlayer() {
  let cedula = document.getElementById("cedula");
  let nombre = document.getElementById("nombre");
  let casino = document.getElementById("casino");
  let telefono = document.getElementById("telefono");

  if (cedula.value == "" || nombre.value == "" || casino.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Completa la información",
    });
    return;
  }

  if (HORAS_ASIGNADA == 0) {
    Swal.fire({
      icon: "info",
      title: "No hay un horario Disponible",
    });
    loader.style.display = "none";
    return;
  }

  localStorage.removeItem("InfoImprimir");

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

  let hora_curren = hora;
  let fecha_curren = fecha;
  let identify = Date.now();

  const DIA = Number(
    new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      day: "2-digit",
    }),
  );
  const MES = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    month: "long",
    hour12: false,
  });

  const ANIO = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  let maxHorario = calcularHorarioMaximo(hora_curren, HORAS_ASIGNADA);

  let bodyCreate = {
    tipo: "dinamica",
    Hora: hora_curren,
    Fecha: fecha_curren,
    Identify: identify,
    Nombre: nombre.value,
    Cedula: cedula.value,
    Casino: casino.value,
    Telefono: telefono.value,
    Usuario: user.Nombre,
    Promocion: promocion,
    Tiempo_valido: HORAS_ASIGNADA,
    Tiempo_redimido: maxHorario,
    Dia: DIA,
    Mes: MES,
    Anio: ANIO,
  };

  loader.style.display = "flex";
  fetch(
    `${url}?hoja=dinamica&cedula=${cedula.value}&dia=${DIA}&mes=${MES}&anio=${ANIO}`,
  )
    .then((res) => res.json())
    .then((data) => {
      // if (data.length > 0) {
      //   loader.style.display = "none";
      //   Swal.fire({
      //     icon: "info",
      //     title: "Operación incompleta",
      //     html: "El Jugador ya se encuentra registrado",
      //   });
      //   return;
      // } else {
      // }

        fetch(`${url}?hoja=dinamica`, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(bodyCreate),
        })
          .then((res) => res.text())
          .then(() => {
            let bodyImprimir = {
              ident_jugador: identify,
              nom_jugador: nombre.value,
              ced_jugador: cedula.value,
              cas_jugador: casino.value,
              tel_jugador: telefono.value,
              hor_reg_jugador: hora_curren,
              fec_reg_jugador: fecha_curren,
              hor_sobr_jugador: HORAS_ASIGNADA,
              // Tiempo_redimido: rangoTexto,
            };

            localStorage.setItem("InfoImprimir", JSON.stringify(bodyImprimir));

            window.datosjugadorRango = {
              ident_jugador: identify,
              nom_jugador: nombre.value,
              ced_jugador: cedula.value,
              cas_jugador: casino.value,
              tel_jugador: telefono.value,
              hor_reg_jugador: hora_curren,
              fec_reg_jugador: fecha_curren,
              hor_sobr_jugador: HORAS_ASIGNADA,
              // Tiempo_redimido: rangoTexto,
            };
            nombre.value = "";
            cedula.value = "";
            casino.value = "";
            telefono.value = "";
            HORAS_ASIGNADA = 0;
            loader.style.display = "none";
            GetAllData();
            Swal.fire({
              icon: "success",
              title: "Jugador Creado",
              allowOutsideClick: false,
            }).then((res) => {
              if (res.isConfirmed) {
                imprimirTickeHora();
              }
            });
          })
          .catch((erro) => {
            loader.style.display = "none";
            Swal.fire({
              icon: "error",
              title: "Error en el Envió",
            });
          });
    });
}

function calcularHorarioMaximo(horaRegistro, horasSobrantes) {
  if (!horaRegistro) return "---";

  const partesHora = String(horaRegistro).trim().split(":");
  let horas = parseInt(partesHora[0], 10) || 0;
  const minutos = parseInt(partesHora[1], 10) || 0;
  const segundos = parseInt(partesHora[2], 10) || 0;

  const matchHoras = String(horasSobrantes ?? "").match(/\d+/);
  const extraHoras = matchHoras ? parseInt(matchHoras[0], 10) : 0;

  let horaLimite = horas + extraHoras;
  const pasaMedianoche = horaLimite >= 24;
  horaLimite = horaLimite % 24;

  const hh = String(horaLimite).padStart(2, "0");
  const mm = String(minutos).padStart(2, "0");
  const ss = String(segundos).padStart(2, "0");

  return pasaMedianoche ? `${hh}:${mm}:${ss} (día sig.)` : `${hh}:${mm}:${ss}`;
}

function imprimirTickeHora() {
  let datos = window.datosjugadorRango;
  if (!datos) {
    Swal.fire({ icon: "warning", title: "No hay datos para imprimir" });
    return;
  }

  let contenedor = document.getElementById("print-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "print-container";
    document.body.appendChild(contenedor);
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  // <span><strong>N ${idx + 1}:</strong></span>

  // let horaFinimp = datos.Tiempo_redimido.split("-");

  let maxHorario = calcularHorarioMaximo(
    datos.hor_reg_jugador,
    datos.hor_sobr_jugador,
  );

  contenedor.innerHTML = `
        <div class="ticket-pos">
            <div class="pos-header">
            <img src="/dinamicas/grandaladdin/resources/Grand-aladdin-Prestige-Logo-otro.png" alt="GrandAladdin">
            <br />    
            <br />    
            <p><strong>PROMO: GANA MÁS</strong></p>
                <p>CASINO: ${datos.cas_jugador || "GENERAL"}</p>
                <p>Id UNICO: ${datos.ident_jugador || "GENERAL"}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-info">
                <p><strong>CLIENTE: </strong><strong>${datos.nom_jugador}</strong></p>
                <p><strong>CÉDULA: </strong><strong>${datos.ced_jugador}</strong></p>
                <p><strong>TELEFONO: </strong><strong>${datos.tel_jugador}</strong></p>
                <p><strong>FECHA DE IMPRESION: </strong><strong><br/>${fecha + " - " + hora}</strong></p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-numeros">
                <p><strong>Fecha de registro: </strong>${datos.fec_reg_jugador}</p>
                <p><strong>Hora de registro: </strong>${datos.hor_reg_jugador}</p>
                <p><strong>Vence dentro de: </strong>${datos.hor_sobr_jugador}</p>
                <p><strong>Hora limite para redimir: </strong></br>${maxHorario}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-footer">
                <p>Aplica Términos y Condiciones</p>
                <p>Solo valido en la hora señalada</p>
                <p>NO ES ACUMULABLE CON OTRAS PROMOCIONES</p>
                <p>Es Personal e intransferible</p>
                <p>¡Gracias por participar!</p>
                <p>Conserve este tiquete</p>
            </div>
        </div>
    `;

  const logo = contenedor.querySelector("img");

  const ejecutarImpresion = () => {
    setTimeout(() => {
      window.print();
      contenedor.innerHTML = "";
    }, 500);
  };

  if (logo) {
    if (logo.complete) {
      ejecutarImpresion();
    } else {
      logo.onload = ejecutarImpresion;
      logo.onerror = ejecutarImpresion;
    }
  } else {
    ejecutarImpresion();
  }
}

function horaASegundos(timeStr) {
  if (!timeStr) return 0;
  const partes = timeStr.split(":");
  const horas = parseInt(partes[0], 10) || 0;
  const minutos = parseInt(partes[1], 10) || 0;
  const segundos = parseInt(partes[2], 10) || 0;
  return horas * 3600 + minutos * 60 + segundos;
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return "";
  const d = new Date(fechaStr);
  if (isNaN(d.getTime())) return fechaStr;

  const anio = d.getUTCFullYear();
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(d.getUTCDate()).padStart(2, "0");
  return `${dia}/${mes}/${anio}`;
}

function formatearHora(horaStr) {
  if (!horaStr) return "";

  if (typeof horaStr === "string" && /^\d{1,2}:\d{2}(:\d{2})?$/.test(horaStr)) {
    return horaStr;
  }

  let d = new Date(horaStr);
  if (isNaN(d.getTime())) {
    d = new Date(`1970-01-01T${horaStr}`);
  }

  if (!isNaN(d.getTime())) {
    return d.toLocaleTimeString("es-CO", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return horaStr;
}

GetAllData();

function GetAllData() {
  let _all_register_zxwerz_ = document.getElementById("_all_register_zxwerz_");
  _all_register_zxwerz_.innerHTML = `Cargando...`;
  let inputBuscar = document.getElementById("numero_bus");
  if (inputBuscar) inputBuscar.style.display = "none";

  fetch(`${url}?hoja=dinamica`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        _all_register_zxwerz_.innerHTML = `<p>No hay registros disponibles.</p>`;
        return;
      }
      _all_register_zxwerz_.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cédula</th>
                <th>Casino</th>
                <th>Max. Horario</th>
                <th># Bono</th>
                <th>Valor Bono</th>
                <th>Premio</th>
                <th>Nº Máquina</th>
                <th>Acciones</th>
                <th>ReImprimir</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .reverse()
                .map((registro, i) => {
                  const tieneDatos =
                    registro.Bono &&
                    registro.PremioObt &&
                    registro.Bono_val &&
                    registro.Num_maq;
                  return `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${registro.Nombre}</td>
                      <td>${formatearFecha(registro.Fecha)}</td>
                      <td>${formatearHora(registro.Hora)}</td>
                      <td>${registro.Cedula}</td>
                      <td>${registro.Casino}</td>
                      <td>${formatearHora(registro.Tiempo_redimido)}</td>
                      <td>
                        ${
                          registro.Bono
                            ? registro.Bono
                            : `<input class="table_input_bono_portal" type="text" id="input-bono-${i}" value="${registro.Bono || ""}" placeholder="Ingrese bono" />`
                        }
                      </td>
                      <td>
                        ${
                          registro.Bono_val
                            ? formatoPesos_monto_efectivo.format(registro.Bono_val) || formatoPesos_monto_efectivo.format(registro.bono_val) || ""
                            : `<input class="table_input_bono_portal" type="text" id="input-bono-val-${i}" value="${registro.Bono_val || registro.bono_val || ""}" placeholder="Valor bono" />`
                        }
                      </td>
                      <td>
                        ${
                          registro.PremioObt
                            ? formatoPesos_monto_efectivo.format(registro.PremioObt)
                            : `<input class="table_input_bono_portal" type="text" id="input-premio-${i}" value="${registro.PremioObt || ""}" placeholder="Ingrese premio" />`
                        }
                      </td>
                      <td>
                        ${
                          registro.Num_maq
                            ? registro.Num_maq || registro.num_maq || ""
                            : `<input class="table_input_bono_portal" type="text" id="input-num-maq-${i}" value="${registro.Num_maq || registro.num_maq || ""}" placeholder="Nº Máquina" />`
                        }
                      </td>
                      <td>
                        ${
                          tieneDatos
                            ? "Ya tiene premio"
                            : `<button class="table_btn_enviar_bono" type="button" onclick="actualizarRegistro('${registro.Identify}', '${registro.Cedula}', '${registro.Dia}', '${registro.Mes}', '${registro.Anio}', ${i},'${formatearHora(registro.Tiempo_redimido)}')">Guardar</button>`
                        }
                      </td>
                      <td>
                      <button class="table_btn_enviar_bono" type="button" onclick="reimprimirTicket('${registro.Identify}', '${registro.Cedula}','${registro.Casino}','${formatearFecha(registro.Fecha)}','${formatearHora(registro.Hora)}' ,'${formatearHora(registro.Tiempo_redimido)}','${registro.Nombre}','${registro.Cedula}','${registro.Telefono}','${registro.Tiempo_valido}')">Reimprimir</button>
                      </td>

                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        </div>
      `;

      if (inputBuscar) {
        inputBuscar.style.display = "flex";
        let nuevoInput = inputBuscar.cloneNode(true);
        inputBuscar.parentNode.replaceChild(nuevoInput, inputBuscar);

        nuevoInput.addEventListener("keyup", () => {
          const texto = nuevoInput.value.toLowerCase().trim();
          const filas = _all_register_zxwerz_.querySelectorAll("tbody tr");

          const columnas = [1, 2, 3, 4, 5, 6];

          filas.forEach((fila) => {
            const textoFila = columnas
              .map(
                (colIdx) =>
                  fila.querySelector(`td:nth-child(${colIdx})`)?.textContent ||
                  "",
              )
              .join(" ")
              .toLowerCase();

            fila.style.display = textoFila.includes(texto) ? "" : "none";
          });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      _all_register_zxwerz_.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

function reimprimirTicket(
  Identify,
  Cedula,
  Casino,
  Fecha,
  Hora,
  Tiempo_redimido,
  Nombre,
  Cedula,
  Telefono,
  Tiempo_valido,
) {
  let contenedor = document.getElementById("print-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "print-container";
    document.body.appendChild(contenedor);
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const [fecha, hora] = fechaCompleta.split(", ");



  contenedor.innerHTML = `
        <div class="ticket-pos">
            <div class="pos-header">
            <img src="/dinamicas/grandaladdin/resources/Grand-aladdin-Prestige-Logo-otro.png" alt="GrandAladdin">
            <br />    
            <br />    
            <p><strong>PROMO: GANA MÁS</strong></p>
                <p>CASINO: ${Casino || "GENERAL"}</p>
                <p>Id UNICO: ${Identify || "GENERAL"}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-info">
                <p><strong>CLIENTE: </strong><strong>${Nombre}</strong></p>
                <p><strong>CÉDULA: </strong><strong>${Cedula}</strong></p>
                <p><strong>TELEFONO: </strong><strong>${Telefono}</strong></p>
                <p><strong>FECHA DE IMPRESION: </strong><strong><br/>${fecha + " - " + hora}</strong></p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-numeros">
                <p><strong>Fecha de registro: </strong>${Fecha}</p>
                <p><strong>Hora de registro: </strong>${Hora}</p>
                <p><strong>Vence dentro de: </strong>${Tiempo_valido}</p>
                <p><strong>Hora limite para redimir: </strong></br>${Tiempo_redimido}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-footer">
                <p>Aplica Términos y Condiciones</p>
                <p>Solo valido en la hora señalada</p>
                <p>NO ES ACUMULABLE CON OTRAS PROMOCIONES</p>
                <p>Es Personal e intransferible</p>
                <p>¡Gracias por participar!</p>
                <p>Conserve este tiquete</p>
            </div>
        </div>
    `;

  const logo = contenedor.querySelector("img");

  const ejecutarImpresion = () => {
    setTimeout(() => {
      window.print();
      contenedor.innerHTML = "";
    }, 500);
  };

  if (logo) {
    if (logo.complete) {
      ejecutarImpresion();
    } else {
      logo.onload = ejecutarImpresion;
      logo.onerror = ejecutarImpresion;
    }
  } else {
    ejecutarImpresion();
  }
}

async function actualizarRegistro(
  identify,
  cedula,
  dia,
  mes,
  anio,
  index,
  horaMax,
) {
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

  if (hora > horaMax) {
    Swal.fire({
      icon: "warning",
      title: "Operación incompleta",
      html: "No puedes completa la operacion, estas fuera del horario",
    });
    return;
  }

  loader.style.display = "flex";
  const nuevoBono = document.getElementById(`input-bono-${index}`).value.trim();
  const nuevoBonoVal = document
    .getElementById(`input-bono-val-${index}`)
    .value.trim();
  const nuevoPremio = document
    .getElementById(`input-premio-${index}`)
    .value.trim();
  const nuevoNumMaq = document
    .getElementById(`input-num-maq-${index}`)
    .value.trim();

  if (nuevoBono === "" || nuevoPremio === "") {
    alert("Por favor ingresa tanto el Bono como el Premio.");
    return;
  }

  const payload = {
    tipo: "update_puntaje",
    match: {
      Identify: identify,
      Cedula: cedula,
      Dia: dia,
      Mes: mes,
      Anio: anio,
    },
    bono: nuevoBono,
    bono_val: nuevoBonoVal,
    premio: nuevoPremio,
    num_maq: nuevoNumMaq,
  };

  try {
    const response = await fetch(`${url}?hoja=dinamica`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === "success") {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Campos actulizados",
      });
      GetAllData();
    } else {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    }
  } catch (error) {
    console.error("Error en la petición:", error);
    alert("Error de conexión al intentar guardar.");
  }
}

document.getElementById("_btn_imprimir_last_").addEventListener("click", () => {
  let datosStr = localStorage.getItem("InfoImprimir");
  if (!datosStr) {
    Swal.fire({
      icon: "warning",
      title: "Sin Datos",
      text: "No hay un registro previo guardado para imprimir.",
    });
    return;
  }

    const fechaDia = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    weekday: "long",
  });
  const [dia] = fechaDia.split(", ");


  window.datosjugadorRango = JSON.parse(datosStr);

  imprimirTickeHora();
});
