window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

function abrirModal() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
}

function cerraModal() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function openmodalfinalista() {
  document.getElementById("datos-modal-finalista").style.display = "flex";
}

function closemodalfinalista() {
  document.getElementById("datos-modal-finalista").style.display = "none";
}

const url =
  "https://script.google.com/macros/s/AKfycbwqtTZ2OkK-lnAvI0lsu_3An8koosJhTDZzhLgPVcBPxRD7FTiFn2Wd4zAD8jEFMezCCw/exec";
const loader = document.getElementById("loader");

function mostrarLoader(container, mensaje) {
  container.innerHTML = `
    <div class="loader-local">
      <div class="spinner"></div>
      <p>${mensaje}</p>
    </div>
  `;
}

const user = inforUser();

const AllCasinos = {
  CALI: [
    "A07",
    "A08",
    "A12",
    "A12-MESAS",
    "A16",
    "A15",
    "A19",
    "A50",
    "A58",
    "A70",
    "A108",
    "A108-MESAS",
    "A05",
  ],
  TULUA: ["A38"],
  PEREIRA: ["A35", "A36", "A36-MESAS", "A39", "A88"],
  BOGOTA: ["A48", "A48-MESAS", "A49", "A127", "A127-MESAS", "A100"],
  BARRANQUILLA: ["A43", "A53"],
  MONTERIA: ["A781"],
  BUGA: ["A09"],
};

function obtenerCiudad(codigo) {
  for (const ciudad in AllCasinos) {
    if (AllCasinos[ciudad].includes(codigo)) {
      return ciudad;
    }
  }
  return null; // si no lo encuentra
}

function handleCreateFinalista() {
  const cedula_finalista = document.getElementById("cedula_finalista");
  const nombre_finalista = document.getElementById("nombre_finalista");
  const casino_finalista = document.getElementById("casino_finalista");

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

  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  if (
    !nombre_finalista.value ||
    !casino_finalista.value ||
    !cedula_finalista.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let ciudadCasino = obtenerCiudad(casino_finalista.value);

  loader.style.display = "flex";
  fetch(
    `${url}?hoja=finalista&cedula=${cedula_finalista.value}&mesbus=${fecha_reg}&anobus=${anio_res}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "info",
          title: "Registro existente",
          text: `Ya existe un registro con esta cédula.`,
          confirmButtonColor: "#a13b22",
        });
      } else {
        fetch(`${url}?hoja=finalista&mesbus=${fecha_reg}&anobus=${anio_res}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length == 38) {
              loader.style.display = "none";
              Swal.fire({
                icon: "warning",
                title: "Los 38 participantes ya están Registrados",
              });
            } else {
              let data = {
                tipo: "finalista",
                Nombre: nombre_finalista.value,
                Fecha: fecha + " - " + hora,
                Cedula: cedula_finalista.value,
                Casino: casino_finalista.value,
                Usuario: user.Nombre,
                Mes_registro: fecha_reg,
                Ano_registro: anio_res,
                Ciudad: ciudadCasino,
              };
              fetch(`${url}?hoja=finalista`, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data),
              })
                .then((res) => res.text())
                .then(() => {
                  if (
                    typeof window.notificarEnvioFirebaseFinal === "function"
                  ) {
                    window.notificarEnvioFirebaseFinal();
                  }
                  cedula_finalista.value = "";
                  nombre_finalista.value = "";
                  casino_finalista.value = "";
                  loader.style.display = "none";
                  Swal.fire({
                    icon: "success",
                    title: "Envio Exitoso",
                  });
                })
                .catch(() => {
                  loader.style.display = "none";
                  Swal.fire({
                    icon: "error",
                    title: "Error en el Envio",
                  });
                });
            }
          });
      }
    });
}

function handleSubmitSemis() {
  const cedula = document.getElementById("cedula");
  const nombre = document.getElementById("nombre");
  const casino = document.getElementById("casino");

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

  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  let ciudadCasino = obtenerCiudad(casino.value);

  if (!nombre.value || !casino.value || !cedula.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(
    `${url}?hoja=semis&cedula=${cedula.value}&mesbus=${fecha_reg}&anobus=${anio_res}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "info",
          title: "Registro existente",
          text: `Ya existe un registro con esta cédula.`,
          confirmButtonColor: "#a13b22",
        });
      } else {
        fetch(`${url}?hoja=semis`)
          .then((res) => res.json())
          .then((resp) => {
            if (resp.length > 168) {
              loader.style.display = "none";
              Swal.fire({
                icon: "warning",
                title: "Limite Alcanzado",
                confirmButtonColor: "#a13b22",
              });
            } else {
              let data = {
                tipo: "semis",
                Nombre: nombre.value,
                Fecha: fecha + " - " + hora,
                Cedula: cedula.value,
                Casino: casino.value,
                Usuario: user.Nombre,
                Mes_registro: fecha_reg,
                Ano_registro: anio_res,
                Ciudad: ciudadCasino,
              };
              fetch(`${url}?hoja=semis`, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data),
              })
                .then((res) => res.text())
                .then(() => {
                  if (typeof window.notificarEnvioFirebase === "function") {
                    window.notificarEnvioFirebase();
                  }
                  cedula.value = "";
                  nombre.value = "";
                  casino.value = "";
                  loader.style.display = "none";
                  Swal.fire({
                    icon: "success",
                    title: "Envio Exitoso",
                  });
                })
                .catch(() => {
                  Swal.fire({
                    icon: "error",
                    title: "Error en el Envio",
                  });
                });
            }
          });
      }
    });
}

function handleObservacionSubmit() {
  const casino_modal_observacion = document.getElementById(
    "casino-modal-observacion",
  );
  const casino_modal_descripcion = document.getElementById(
    "casino-modal-descripcion",
  );

  if (!casino_modal_observacion.value || !casino_modal_descripcion.value) {
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
    hour12: true,
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "observacion",
    Hora: hora,
    Fecha: fecha,
    Casino: casino_modal_observacion.value,
    Observacion: casino_modal_descripcion.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(`${url}?hoja=observacion`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      casino_modal_descripcion.value = "";
      casino_modal_observacion.value = "";
      loader.style.display = "none";

      Swal.fire({
        icon: "success",
        title: "Envío Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envío",
      });
    });
}

function getCliente() {
  const cedula = document.getElementById("cedulaGet").value;
  const loader = document.getElementById("loader");
  const resultCliente = document.getElementById("content-result-cliente");

  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  loader.style.display = "flex";
  fetch(`${url}?cedula=${cedula}&mesbus=${fecha_reg}&anobus=${anio_res}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        resultCliente.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Cédula</th>
                  <th>Casino</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Fecha}</td>
                        <td>${registro.Cedula}</td>
                        <td>${registro.Casino}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
        // Espera a que el DOM interno de la tabla esté renderizado

        const filas = resultCliente.querySelectorAll("tbody tr");

        filas.forEach((fila) => {
          fila.addEventListener("click", () => {
            // Quitar selección previa
            filas.forEach((f) => f.classList.remove("selected"));
            // Agregar selección actual
            fila.classList.add("selected");
          });
        });
      } else {
        console.log("No se encontró ninguna coincidencia.");
        Swal.fire({
          icon: "error",
          title: `Error en la verificación.`,
          text: `No se encontró ninguna coincidencia.`,
        });
      }
      loader.style.display = "none";
    })
    .catch((err) => {
      loader.style.display = "none";
      console.error("Error al consultar la cédula:", err);
    });
}

function renderTabla(container, data) {
  const dataMostrar = [...data];
  let cual_contenedor = container.id;
  if (cual_contenedor == "content_ficha_filter_table") {
    while (dataMostrar.length < 6) {
      dataMostrar.push({
        Nombre: "",
        Fecha: "",
        Casino: "",
      });
    }
  }

  container.innerHTML = `
    <div class="table-result table-scrolld">
      <table class="styled-table">
        <thead>
          <tr>
            <th># Registro</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Casino</th>
          </tr>
        </thead>
        <tbody>
        ${[...dataMostrar]
          .reverse()
          .map(
            (registro, i) =>
              `<tr>
                <td>${registro.Nombre || registro.Fecha || registro.Casino ? i + 1 : ""}</td>
                <td>${registro.Nombre || ""}</td>
                <td>${registro.Fecha || ""}</td>
                <td>${registro.Casino || ""}</td>
              </tr>`,
          )
          .join("")}
        </tbody>
      </table>
    </div>
  `;
}

getSemis();
function getSemis() {
  const container = document.getElementById("content-all-result");
  mostrarLoader(container, "Cargando lista de Semi-finalistas...");

  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const containerFiltro = document.getElementById("content_ficha_filter_table");

  containerFiltro.innerHTML = "";

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  fetch(`${url}?hoja=semis&mesbus=${fecha_reg}&anobus=${anio_res}`)
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        return;
      }

      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Casino</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${i + 1}</td>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Fecha}</td>
                    <td>${registro.Casino || ""}</td>
                    <td>${registro.Ciudad || ""}</td>
                  </tr>
                `,
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;

      document.getElementById("filtro_semis").style.display = "flex";

      const actions_semis = document.querySelectorAll(".actions_semis");

      actions_semis.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filtro = btn.id.toLowerCase();

          const dataFiltrada = data.filter(
            (registro) => (registro.Casino || "").toLowerCase() === filtro,
          );

          renderTabla(containerFiltro, dataFiltrada);
        });
      });

      const inputBuscar = document.getElementById("buscar_usuario");
      inputBuscar.style.display = "flex";

      inputBuscar.addEventListener("keyup", () => {
        const texto = inputBuscar.value.toLowerCase().trim();
        // container donde se esta dibujando la tabla
        const contenedorActivo =
          document.querySelector("#content_ficha_filter_table tbody") ||
          container;

        const filas = contenedorActivo.querySelectorAll("tr");

        const columnas = [1, 2, 3, 4, 5, 6];

        filas.forEach((fila) => {
          const textoFila = columnas
            .map(
              (i) =>
                fila.querySelector(`td:nth-child(${i})`)?.textContent || "",
            )
            .join(" ")
            .toLowerCase();

          fila.style.display = textoFila.includes(texto) ? "" : "none";
        });
      });

      // let lvlTest = user.Nivel;

      // if (lvlTest == "2" || lvlTest == "1") {
      //   const filas = container.querySelectorAll("tbody tr");

      //   filas.forEach((fila) => {
      //     fila.addEventListener("click", () => {
      //       filas.forEach((f) => {
      //         f.classList.toggle("selected");
      //       });
      //     });
      //   });
      // }
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

getDataFinalista();
function getDataFinalista() {
  const container = document.getElementById("content-all-result-finalista");
  mostrarLoader(container, "Cargando lista de finalistas...");

  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const containerFiltro = document.getElementById(
    "content_ficha_filter_tabla_finas",
  );
  containerFiltro.innerHTML = "";

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  fetch(`${url}?hoja=finalista&mesbus=${fecha_reg}`)
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos disponibles.</p>`;
        return;
      }

      document.getElementById("ir_dinamica").style.display = "flex";
      container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Casino</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${i + 1}</td>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Fecha}</td>
                    <td>${registro.Casino || ""}</td>
                    <td>${registro.Ciudad || ""}</td>
                  </tr>
                `,
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;

      document.getElementById("filtro_finas").style.display = "flex";

      const actions_semis = document.querySelectorAll(".actions_finas");

      actions_semis.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filtro = btn.id.toLowerCase();
          const containerFiltro = document.getElementById(
            "content_ficha_filter_tabla_finas",
          );

          const dataFiltrada = data.filter(
            (registro) => (registro.Casino || "").toLowerCase() === filtro,
          );

          renderTabla(containerFiltro, dataFiltrada);
        });
      });

      const inputBuscar = document.getElementById("buscar_usuario_fin");

      inputBuscar.addEventListener("keyup", () => {
        const texto = inputBuscar.value.toLowerCase().trim();
        // container donde se esta dibujando la tabla
        const filas = container.querySelectorAll("tbody tr");

        const columnas = [1, 2, 3, 4, 5, 6];

        filas.forEach((fila) => {
          const textoFila = columnas
            .map(
              (i) =>
                fila.querySelector(`td:nth-child(${i})`)?.textContent || "",
            )
            .join(" ")
            .toLowerCase();

          fila.style.display = textoFila.includes(texto) ? "" : "none";
        });
      });
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

// document.getElementById("btn_resultados").addEventListener("click", () => {
//   document.getElementById("modal_resultados").style.display = "flex";
//   lockBodyScroll();
//   fetch(
//     "/dinamicas/promocion_vamos_en_grande/components/getInfoRuleta/getInfoRuleta.html",
//   )
//     .then((res) => res.text())
//     .then((html) => {
//       const contenedor = document.getElementById("modal_resultados_part");
//       contenedor.innerHTML = html;

//       const estilo = document.createElement("link");
//       estilo.rel = "stylesheet";
//       estilo.href =
//         "/dinamicas/promocion_vamos_en_grande/components/getInfoRuleta/getInfoRuleta.css";
//       document.head.appendChild(estilo);
//       // Cargar script dinámicamente
//       const script = document.createElement("script");
//       script.src =
//         "/dinamicas/promocion_vamos_en_grande/components/getInfoRuleta/getInfoRuleta.js";
//       document.body.appendChild(script);
//     });

//   document.getElementById("closeModal").addEventListener("click", () => {
//     document.getElementById("modal_resultados").style.display = "none";
//     unlockBodyScroll();
//   });
// });

// validateGanador();
// function validateGanador() {
//   const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
//     timeZone: "America/Bogota",
//     year: "numeric",
//     month: "long",
//   });

//   const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");
//   fetch(`${url}?hoja=ganador&mesbus=${fecha_reg}&anobus=${anio_res}`)
//     .then((res) => res.json())
//     .then((data) => {

//       document.getElementById("last_ganador").addEventListener("click", () => {
//         if (data.length == 0) {
//           Swal.fire({
//             icon: "warning",
//             title: "Sin Ganadores",
//           });
//           return;
//         }

//         loader.style.display = "flex";
//         const fechaCompleta_validate_register = new Date().toLocaleString(
//           "es-CO",
//           {
//             timeZone: "America/Bogota",
//             year: "numeric",
//             month: "long",
//           },
//         );

//         const [fecha_reg, anio_res] =
//           fechaCompleta_validate_register.split(" de ");

//         document.getElementById("last_ganador").style.display = "flex";
//         loader.style.display = "none";
//         let allData = data.reverse();
//         let last_player = allData[0];
//         let seg_player = allData[1];
//         let ter_player = allData[2];
//         Swal.fire({
//           icon: "info",
//           title: `Ganadores de ${fecha_reg}`,
//           html: `
//                 El ${last_player.Player} es ${last_player.Nombre}, <br/> En el casino ${last_player.Casino} <br/> Con el numero ${last_player.Numero}<br/><br/>
//                 ${!seg_player ? "" : `El ${seg_player.Player} es ${seg_player.Nombre}, <br/> En el casino ${seg_player.Casino} <br/> Con el numero ${seg_player.Numero}<br/><br/>`}
//                 ${!ter_player ? "" : `El ${ter_player.Player} es ${ter_player.Nombre}, <br/> En el casino ${ter_player.Casino} <br/> Con el numero ${ter_player.Numero}<br/>`}
//                 <br/>
//                 En el mes de ${last_player.Mes_registro} - ${last_player.Ano_registro}
//                 `,
//         });
//       });
//     });
// }
