window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const url =
  "https://script.google.com/macros/s/AKfycbyK01LB6fnSiZeLK1Eg7cHoxupfXmLvrUXObcso2EXhXg9Ac98cIXd-QDOLEm_uFqSiwQ/exec";

function mostrarLoader(container, mensaje) {
  container.innerHTML = `
    <div class="loader-local">
      <div class="spinner2"></div>
      <p>${mensaje}</p>
    </div>
  `;
}

const u = inforUser();

function handleSendInfo() {
  const nombre = document.getElementById("nombre");
  const casino = document.getElementById("casino");
  const numFiche = document.getElementById("numFiche");
  const loader = document.getElementById("loader");
  // const bono = document.getElementById("bono");

  const urlBase = url;

  const nombreVal = nombre.value.trim();
  const casinoVal = casino.value.trim();
  const numFicheVal = numFiche.value.trim();
  // const bonoVal = bono.value.trim();

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

  if (!nombreVal || !casinoVal || !numFicheVal) {
    Swal.fire({
      icon: "warning",
      title: `Campos vacíos.`,
      text: `Por favor, completa toda la información`,
      confirmButtonColor: "#a13b22",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(`${urlBase}?numero=${numFicheVal}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "info",
          title: "Registro existente",
          text: `Ya existe un registro con este Número.`,
          confirmButtonColor: "#a13b22",
        });
      } else {
        fetch(`${urlBase}?nombre=${nombreVal}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length >= 3) {
              loader.style.display = "none";
              Swal.fire({
                icon: "info",
                title: "Limite",
                text: `El jugador ya cuento con 3 números.`,
                confirmButtonColor: "#a13b22",
              });
            } else {
              const dataToSend = {
                tipo: "registro",
                Nombre: nombreVal,
                Fecha: fecha + " - " + hora,
                Casino: casinoVal,
                Numero: numFicheVal,
                Usuario: u.Nombre,
              };
              fetch(urlBase, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(dataToSend),
              })
                .then(() => {
                  nombre.value = "";
                  casino.value = "";
                  numFiche.value = "";
                  getData();
                  setTimeout(() => {
                    loader.style.display = "none";
                    Swal.fire({
                      icon: "success",
                      title: `Envío exitoso.`,
                      text: `La información fue registrada correctamente.`,
                    });
                  }, 2000);
                })
                .catch((error) => {
                  console.warn(error);
                  loader.style.display = "none";
                  Swal.fire({
                    icon: "error",
                    title: `Error en el envío.`,
                    text: `Ocurrió un error. Por favor intenta más tarde.`,
                  });
                });
            }
          });
      }
    })
    .catch((err) => {
      console.error("Error al consultar la cédula:", err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: `Error en la verificación.`,
        text: `No se pudo verificar si el registro existe.`,
      });
    });
}

function cleanTable() {
  const resultCliente = document.getElementById("content-result-cliente");
  resultCliente.innerHTML = "";
  document.getElementById("cedulaGet").value = "";
}

// function getCliente() {
//   const cedula = document.getElementById("cedulaGet").value;
//   const loader = document.getElementById("loader");
//   const resultCliente = document.getElementById("content-result-cliente");

//   loader.style.display = "flex";
//   fetch(`${url}?nombre=${cedula}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.length > 0) {
//         resultCliente.innerHTML = `
//           <div class="table-result table-scrolld">
//           <table class="styled-table">
//             <thead>
//               <tr>
//                 <th># Registro</th>
//                 <th>Nombre</th>
//                 <th>Fecha</th>
//                 <th>Numero</th>
//                 <th>Casino</th>
//               </tr>
//             </thead>
//             <tbody>
//             ${[...data]
//               .reverse()
//               .map(
//                 (registro, i) =>
//                   `<tr>
//                     <td>${i + 1}</td>
//                     <td>${registro.Nombre}</td>
//                     <td>${registro.Fecha.substring(0, 10)}</td>
//                     <td>${registro.Numero}</td>
//                     <td>${registro.Casino || ""}</td>
//                   </tr>
//                 `,
//               )
//               .join("")}
//             </tbody>
//           </table>
//         </div>
//         `;

//         document.querySelectorAll(".btn-enviar-pp-cliente").forEach((btn) => {
//           btn.addEventListener("click", async () => {
//             const fila = btn.closest("tr");
//             const bonoInput = fila.querySelector(
//               ".table_input_bono_pp_cliente",
//             );
//             const bono = (bonoInput?.value || "").trim();

//             if (!bono) {
//               Swal.fire({ icon: "warning", title: "Falta el # de bono" });
//               return; // evita dejar el loader activo
//             }

//             // UI
//             const prevText = btn.textContent;
//             btn.textContent = "Enviando...";
//             btn.disabled = true;
//             loader.style.display = "flex";

//             const registro = JSON.parse(btn.dataset.info);
//             const data = {
//               tipo: "update_bono",
//               cedula: String(registro.Cedula), // fuerza a string para comparación
//               bono: Number(bono), // vuelve número si corresponde
//             };

//             fetch(url, {
//               method: "POST",
//               mode: "no-cors",
//               body: JSON.stringify(data),
//             })
//               .then((res) => res.text())
//               .then(() => {
//                 btn.textContent = prevText;
//                 loader.style.display = "none";

//                 Swal.fire({
//                   icon: "success",
//                   title: `Envio Exitoso.`,
//                   text: `Información enviada de manera correcta.`,
//                   allowOutsideClick: false,
//                 }).then((result) => {
//                   if (result.isConfirmed) {
//                     getData();
//                     getCliente();
//                   }
//                 });
//               })
//               .catch((error) => {
//                 Swal.fire({
//                   icon: "error",
//                   title: `Error.`,
//                   text: `Ha ocurrido un error.`,
//                   allowOutsideClick: false,
//                 });
//               });
//           });
//         });
//       } else {
//         console.log("No se encontró ninguna coincidencia.");
//         Swal.fire({
//           icon: "error",
//           title: `Error en la verificación.`,
//           text: `No se encontró ninguna coincidencia.`,
//         });
//       }
//       loader.style.display = "none";
//     })
//     .catch((err) => {
//       loader.style.display = "none";
//       console.error("Error al consultar la cédula:", err);
//     });
// }

function getData() {
  const container = document.getElementById("content-all-result");
  mostrarLoader(container, "Cargando lista de jugadores...");
  const loader = document.getElementById("loader");

  fetch(url)
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
                <th>Numero</th>
                <th>Casino</th>
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
                    <td>${registro.Fecha.substring(0, 10)}</td>
                    <td>${String(registro.Numero).padStart(2, "0")}</td>
                    <td>${registro.Casino || ""}</td>
                  </tr>
                `,
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;

      document.getElementById("filtro-casino").style.display = "flex";
      const filtroCasino = document.getElementById("filtroCasino");
      const filas = container.querySelectorAll("tbody tr");

      filtroCasino.addEventListener("change", (e) => {
        const valor = e.target.value.trim();

        filas.forEach((fila) => {
          const casino = fila.cells[6]?.textContent.trim(); // Columna 7 (índice 6)
          if (valor === "" || casino === valor) {
            fila.style.display = "";
          } else {
            fila.style.display = "none";
          }
        });
      });

      const inputBuscar = document.getElementById("buscar_usuario");

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

      document.querySelectorAll(".btn-enviar-pp").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const fila = btn.closest("tr");
          const bonoInput = fila.querySelector(".table_input_bono_pp");
          const bono = (bonoInput?.value || "").trim();

          if (!bono) {
            Swal.fire({ icon: "warning", title: "Falta el # de bono" });
            return; // evita dejar el loader activo
          }

          // UI
          const prevText = btn.textContent;
          btn.textContent = "Enviando...";
          btn.disabled = true;
          loader.style.display = "flex";

          const registro = JSON.parse(btn.dataset.info);
          const data = {
            tipo: "update_bono",
            Nombre: String(registro.Nombre), // fuerza a string para comparación
            Bono: Number(bono), // vuelve número si corresponde
          };
          fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
          })
            .then((res) => res.text())
            .then(() => {
              btn.textContent = prevText;
              loader.style.display = "none";
              Swal.fire({
                icon: "success",
                allowOutsideClick: false,
                title: `Envio Exitoso.`,
                text: `Información enviada de manera correcta.`,
              });
              getData();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                allowOutsideClick: false,
                title: `Error.`,
                text: `Ha ocurrido un error.`,
              });
            });
        });
      });
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}

getData();

function abrirModal() {
  document.getElementById("datos-modal-observacion").style.display = "flex";
}

function cerraModal() {
  document.getElementById("datos-modal-observacion").style.display = "none";
}

function handleObservacionSubmit() {
  const casino = document.getElementById("casino-modal-observacion");
  const observacion = document.getElementById("casino-modal-descripcion");
  const loader = document.getElementById("loader");
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  loader.style.display = "flex";
  const [fecha, hora] = fechaCompleta.split(", ");

  const data = {
    tipo: "observacion",
    Hora: hora,
    Fecha: fecha,
    Casino: casino.value,
    Observacion: observacion.value,
    Usuario: u.Nombre,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casino.value = "";
      observacion.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          allowOutsideClick: false,
          title: `Envio Exitoso.`,
          text: `Observación enviada de manera correcta.`,
        });
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      loader.style.display = "none";
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: `Error.`,
        text: `Ha ocurrido un error.`,
      });
    });
}
