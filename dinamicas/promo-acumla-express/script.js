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

let user = inforUser();

const nivelesOcultos = [1, 2, 6];

if (nivelesOcultos.includes(Number(user.Nivel))) {
  document.querySelector("._est_sche_").classList.remove("dont_screen");
} else {
  document.querySelector("._est_sche_").classList.add("dont_screen");
}

let loader = document.getElementById("loader");
let _rango_fec_estas_ = document.getElementById("_rango_fec_estas_");
let promocion = "Gana Max";

let url =
  "https://script.google.com/macros/s/AKfycbwigsUfYhORCfZHUsx_di5BchKuBhRIh81UE9GV0lP714bnuAl4Itq44_Pvyf_y7Eb_/exec";

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

  if (
    cedula.value == "" ||
    nombre.value == "" ||
    casino.value == "" ||
    telefono.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Completa la información",
    });
    return;
  }

  if (
    _rango_fec_estas_.textContent == "Sin Horario" ||
    _rango_fec_estas_.textContent == "00:00:00 - 00:00:00"
  ) {
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

  let rangoTexto = _rango_fec_estas_.textContent;

  let [strHoraIni, strHoraFin] = rangoTexto.split(" - ");

  let segundosRegistro = horaASegundos(hora);
  let segundosIniRango = horaASegundos(strHoraIni);
  let segundosFinRango = horaASegundos(strHoraFin);

  let tiempoResultadoSegundos = 0;

  if (segundosRegistro < segundosIniRango) {
    tiempoResultadoSegundos = segundosFinRango - segundosIniRango;
  } else if (
    segundosRegistro >= segundosIniRango &&
    segundosRegistro <= segundosFinRango
  ) {
    tiempoResultadoSegundos = segundosFinRango - segundosRegistro;
  } else {
    tiempoResultadoSegundos = 0;
  }

  function segundosAHoras(segundos) {
    let h = Math.floor(segundos / 3600)
      .toString()
      .padStart(2, "0");
    let m = Math.floor((segundos % 3600) / 60)
      .toString()
      .padStart(2, "0");
    let s = (segundos % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  let tiempo_valido = segundosAHoras(tiempoResultadoSegundos);

  if (tiempoResultadoSegundos == 0) {
    Swal.fire({
      icon: "warning",
      title: "Error en la Operación",
      html: "No hay un horario o esta afuera del rango permitido",
    });
    return;
  }
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
    Tiempo_valido: tiempo_valido,
    Tiempo_redimido: rangoTexto,
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
      if (data.length > 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "info",
          title: "Operación incompleta",
          html: "El Jugador ya se encuentra registrado",
        });
        return;
      } else {
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
              hor_sobr_jugador: tiempo_valido,
              Tiempo_redimido: rangoTexto,
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
              hor_sobr_jugador: tiempo_valido,
              Tiempo_redimido: rangoTexto,
            };
            nombre.value = "";
            cedula.value = "";
            casino.value = "";
            telefono.value = "";
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
      }
    });
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

  let horaFinimp = datos.Tiempo_redimido.split("-");

  contenedor.innerHTML = `
        <div class="ticket-pos">
            <div class="pos-header">
            <img src="/dinamicas/grandaladdin/resources/Grand-aladdin-Prestige-Logo-otro.png" alt="GrandAladdin">
            <br />    
            <br />    
            <p><strong>PROMO: GANA MAX</strong></p>
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
                <p><strong>Vence a las: </strong>${horaFinimp[1]} del dia de hoy</p>
                <p><strong>Harario Valido para redimir: </strong></br>${datos.Tiempo_redimido}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-footer">
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
  if (typeof horaStr === "string" && horaStr.includes("T")) {
    const d = new Date(horaStr);
    if (!isNaN(d.getTime())) {
      const h = String(d.getUTCHours()).padStart(2, "0");
      const m = String(d.getUTCMinutes()).padStart(2, "0");
      const s = String(d.getUTCSeconds()).padStart(2, "0");
      return `${h}:${m}:${s}`;
    }
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
                <th>Bono</th>
                <th>Valor Bono</th>
                <th>Premio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map((registro, i) => {
                  const tieneDatos = registro.Bono && registro.PremioObt;
                  return `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${registro.Nombre}</td>
                      <td>${formatearFecha(registro.Fecha)}</td>
                      <td>${formatearHora(registro.Hora)}</td>
                      <td>${registro.Cedula}</td>
                      <td>${registro.Casino}</td>
                      <td>
                        ${
                          tieneDatos
                            ? registro.Bono
                            : `<input class="table_input_bono_portal" type="text" id="input-bono-${i}" value="${registro.Bono || ""}" placeholder="Ingrese bono" />`
                        }
                      </td>
                      <td>
                        ${
                          tieneDatos
                            ? registro.Bono_val || registro.bono_val || ""
                            : `<input class="table_input_bono_portal" type="text" id="input-bono-val-${i}" value="${registro.Bono_val || registro.bono_val || ""}" placeholder="Valor bono" />`
                        }
                      </td>
                      <td>
                        ${
                          tieneDatos
                            ? registro.PremioObt
                            : `<input class="table_input_bono_portal" type="text" id="input-premio-${i}" value="${registro.PremioObt || ""}" placeholder="Ingrese premio" />`
                        }
                      </td>
                      <td>
                        ${
                          tieneDatos
                            ? "Ya tiene premio"
                            : `<button class="table_btn_enviar_bono" type="button" onclick="actualizarRegistro('${registro.Identify}', '${registro.Cedula}', '${registro.Dia}', '${registro.Mes}', '${registro.Anio}', ${i})">Guardar</button>`
                        }
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

async function actualizarRegistro(identify, cedula, dia, mes, anio, index) {
  loader.style.display = "flex";
  const nuevoBono = document.getElementById(`input-bono-${index}`).value.trim();
  const nuevoBonoVal = document
    .getElementById(`input-bono-val-${index}`)
    .value.trim();
  const nuevoPremio = document
    .getElementById(`input-premio-${index}`)
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

  window.datosjugadorRango = JSON.parse(datosStr);

  imprimirTickeHora();
});
