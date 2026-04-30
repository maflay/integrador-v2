window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
const user = inforUser();

(() => {
  if (user.Nivel == 1 || user.Nivel == 2) {
    document.getElementById("btn_consult_all").style.display = "none";
    document.getElementById("btn_consult_me").style.display = "none";
    document.getElementById("btn_consult_all").addEventListener("click", () => {
      document.getElementById("content_view_test").style.display = "flex";
      document.getElementById("content_view_test_m").style.display = "none";
      document.getElementById("buscar_usuario").style.display = "flex";
      if (document.getElementById("content_view_test").innerHTML == "") {
        validateInfo();
      }
    });
  } else {
    document.getElementById("btn_consult_all").style.display = "none";
    document.getElementById("btn_consult_me").style.display = "none";
    document.getElementById("btn_consult_me").addEventListener("click", () => {
      document.getElementById("content_view_test").style.display = "none";
      document.getElementById("content_view_test_m").style.display = "flex";
      document.getElementById("buscar_usuario").style.display = "flex";
      if (document.getElementById("content_view_test_m").innerHTML == "") {
        validateInfoM();
      }
    });
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
    weekday: "long",
  });

  const casinos_ubicacion = {
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

  function obtenerCiudadPorCasino(codigoCasino) {
    // Buscamos la llave (ciudad) donde el array incluya el código
    const ciudad = Object.keys(casinos_ubicacion).find((ciudad) =>
      casinos_ubicacion[ciudad].includes(codigoCasino),
    );

    return ciudad || "No encontrado";
  }

  const [fecha, hora] = fechaCompleta.split(", ");

  const [dia, fec, hor] = fechaCompleta.split(",");

  const loader = document.getElementById("loader");

  const url =
    "https://script.google.com/macros/s/AKfycbwqtTZ2OkK-lnAvI0lsu_3An8koosJhTDZzhLgPVcBPxRD7FTiFn2Wd4zAD8jEFMezCCw/exec";

  function infoNumberAsignado() {
    const content_view_test_last = document.getElementById(
      "content_view_test_last",
    );
    const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "long",
    });

    const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

    fetch(`${url}?hoja=finalistab&mesbus=${fecha_reg}&anobus=${anio_res}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        content_view_test_last.innerHTML = `
            <table class="styled-table-rule">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Cedula</th>
                  <th>Casino</th>
                  <th>Número</th>
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
                        <td>${registro.Num_asignado}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
        `;
      });
  }

  validateInfo();

  function validateInfo() {
    const container = document.getElementById("content_view_test_last");
    container.innerHTML = "Cargando..";
    document.getElementById("btn_consult_all").style.display = "none";

    const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "long",
    });

    const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

    fetch(`${url}?hoja=finalistab&mesbus=${fecha_reg}&anobus=${anio_res}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length == []) {
          container.innerHTML = "Sin Registros..";
          return;
        }

        data.sort((a, b) => a.Num_asignado - b.Num_asignado);
        // const last = data[data.length - 1];
        // const infoHtml = String(last?.Info || "");

        // const lines = infoHtml
        //   .replace(/<br\s*\/?>/gi, "\n")
        //   .split("\n")
        //   .map((s) => s.trim())
        //   .filter(Boolean);

        // const rows = lines.slice(0, 38).map((line) => {
        //   const parts = line.split(" - ").map((p) => p.trim());
        //   return {
        //     Numero: parts[0] || "",
        //     Nombre: parts[1] || "",
        //     Casino: parts[2] || "",
        //     Cedula: parts[3] || "",
        //     Fecha: parts[4] || "",
        //   };
        // });

        // console.table(rows);

        container.innerHTML = `
        <table class="styled-table-rule">
              <thead>
                <tr>
                <th>Casino</th>
                  <th>Nombre</th>
                  <th>Número</th>
                  <th>Cedula</th>
                  <th>Fecha</th>
                  <th>Ciudad</th>
                  <th style="display: none">Opción</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (registro, i) => `
                      <tr>
                      <td>${registro.Casino}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Num_asignado}</td>
                        <td>${registro.Cedula}</td>
                        <td>${registro.Fecha}</td>
                        <td>${obtenerCiudadPorCasino(registro.Casino)}</td>
                        <td style="display: none"><button 
                            data-info='${JSON.stringify(registro)}'
                            class="btn btn-primary btn_ganador">Enviar</button>
                        </td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
        
            `;

        document.getElementById("controls_filtro").style.display = "flex";
        document.getElementById("seccion_out_city").style.display = "flex";

        const btn_ganador = document.querySelectorAll(".btn_ganador");

        // ACA SE HACE EL ENVIO, ESTA ES LA VISTA POST

        btn_ganador.forEach((btn) => {
          btn.addEventListener("click", async () => {
            const fechaCompleta_validate_register = new Date().toLocaleString(
              "es-CO",
              {
                timeZone: "America/Bogota",
                year: "numeric",
                month: "long",
              },
            );

            const [fecha_reg, anio_res] =
              fechaCompleta_validate_register.split(" de ");
            loader.style.display = "flex";
            btn.textContent = "Enviando...";
            let player = "";
            fetch(`${url}?hoja=ganador&mesbus=${fecha_reg}&anobus=${anio_res}`)
              .then((res) => res.json())
              .then((gan) => {
                // if (gan.length == 3) {
                //   loader.style.display = "none";
                //   btn.textContent = "Enviar";
                //   Swal.fire({
                //     icon: "warning",
                //     title: "Premios Asignados",
                //     html: `Los premios para el mes de ${fecha_reg}, ya estan asignados`,
                //   });
                //   return;
                // }

                // if (gan.length == 0) {
                //   player = "Tercer Lugar";
                // } else if (gan.length == 1) {
                //   player = "Segundo Lugar";
                // } else if (gan.length == 2) {
                //   player = "Primer Lugar";
                // }

                const registro = JSON.parse(btn.dataset.info);

                let data = {
                  tipo: "ganador",
                  Fecha: registro.Fecha,
                  Numero:
                    registro.Num_asignado == "0"
                      ? "37"
                      : registro.Num_asignado == "00"
                        ? "38"
                        : registro.Num_asignado,
                  Nombre: registro.Nombre,
                  Casino: registro.Casino,
                  Cedula: registro.Cedula,
                  Mes_registro: fecha_reg,
                  Ano_registro: anio_res,
                  Player: player,
                };

                sendInfoData(data);

                loader.style.display = "flex";
                fetch(url, {
                  method: "POST",
                  mode: "no-cors",
                  body: JSON.stringify(data),
                })
                  .then((res) => res.text())
                  .then(() => {
                    loader.style.display = "none";
                    btn.textContent = "Enviar";

                    Swal.fire({
                      icon: "success",
                      title: "Ganador enviado",
                    });
                    try {
                      const bc = new BroadcastChannel("GANADORES_SYNC");
                      bc.postMessage({
                        type: "WINNER_UPDATED",
                        at: Date.now(),
                      });
                    } catch (e) {
                      localStorage.setItem(
                        "WINNER_UPDATED",
                        String(Date.now()),
                      );
                    }
                  })
                  .catch(() => {
                    loader.style.display = "none";
                    btn.textContent = "Enviar";
                    Swal.fire({
                      icon: "error",
                      title: "No se pudo enviar el ganador",
                    });
                  });
              });
          });
        });

        const checkboxes = document.querySelectorAll(
          '.card_select_out_city input[type="checkbox"]',
        );

        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", function () {
            const filas = container.querySelectorAll("tbody tr");

            const ciudadesMarcadas = Array.from(checkboxes)
              .filter((i) => i.checked)
              .map((i) =>
                i.previousElementSibling.textContent.toLowerCase().trim(),
              );

            filas.forEach((fila) => {
              const columnas = [1, 2, 3, 4, 5, 6];
              const textoFila = columnas
                .map(
                  (i) =>
                    fila.querySelector(`td:nth-child(${i})`)?.textContent || "",
                )
                .join(" ")
                .toLowerCase();

              const debeOcultarse = ciudadesMarcadas.some((ciudad) =>
                textoFila.includes(ciudad),
              );

              fila.style.display = debeOcultarse ? "none" : "";
            });
          });
        });

        const inputBuscar = document.getElementById("buscar_usuario");

        inputBuscar.addEventListener("keyup", () => {
          const texto = inputBuscar.value.toLowerCase().trim();
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

        const casinos = document.getElementById("casinos");

        casinos.addEventListener("change", (e) => {
          const valor = e.target.value.trim();
          const filas = container.querySelectorAll("tbody tr");
          filas.forEach((fila) => {
            const casino = fila.cells[0]?.textContent.trim(); // Columna 7 (índice 6)
            if (valor === "" || casino === valor) {
              fila.style.display = "";
            } else {
              fila.style.display = "none";
            }
          });
        });
      })
      .catch(console.error);
    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  }

  function validateInfoM() {
    const container = document.getElementById("content_view_test_m");
    container.innerHTML = "Cargando..";
    document.getElementById("btn_consult_me").style.display = "none";

    const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "long",
    });

    const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

    fetch(`${url}?hoja=finalistab&mesbus=${fecha_reg}&anobus=${anio_res}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length == []) {
          container.innerHTML = "Sin Registros..";
          return;
        }
        const last = data[data.length - 1];

        const infoHtml = String(last?.Info || "");

        //convertir <br> y <br/> a saltos reales
        const lines = infoHtml
          .replace(/<br\s*\/?>/gi, "\n")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);

        const rows = lines.slice(0, 38).map((line) => {
          const parts = line.split(" - ").map((p) => p.trim());

          return {
            Numero: parts[0] || "",
            Nombre: parts[1] || "",
            Casino: parts[2] || "",
            Cedula: parts[3] || "",
            Fecha: parts[4] || "",
          };
        });

        // console.log(rows);

        container.innerHTML = `
          <table class="styled-table-rule">
            <thead>
              <tr>
                <th># Asignado</th>
                <th>Nombre</th>
                <th>Casino</th>
                <th>Opción</th>
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (r) => `
                    <tr>
                      <td>${escapeHtml(r.Numero)}</td>
                      <td>${escapeHtml(r.Nombre)}</td>
                      <td>${escapeHtml(r.Casino)}</td>
                      <td><button 
                       data-info='${JSON.stringify(r)}'
                       class="btn btn-primary btn_ganador">Enviar</button>
                      </td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
      `;
        document.getElementById("controls_filtro").style.display = "flex";

        const btn_ganador = document.querySelectorAll(".btn_ganador");
        btn_ganador.forEach((btn) => {
          btn.addEventListener("click", async () => {
            const fechaCompleta_validate_register = new Date().toLocaleString(
              "es-CO",
              {
                timeZone: "America/Bogota",
                year: "numeric",
                month: "long",
              },
            );

            const [fecha_reg, anio_res] =
              fechaCompleta_validate_register.split(" de ");
            loader.style.display = "flex";
            btn.textContent = "Enviando...";
            let player = "";
            fetch(`${url}?hoja=ganador&mesbus=${fecha_reg}&anobus=${anio_res}`)
              .then((res) => res.json())
              .then((gan) => {
                const registro = JSON.parse(btn.dataset.info);
                let data = {
                  tipo: "ganador",
                  Fecha: registro.Fecha,
                  Numero:
                    registro.Numero == "0"
                      ? "37"
                      : registro.Numero == "00"
                        ? "38"
                        : registro.Numero,
                  Nombre: registro.Nombre,
                  Casino: registro.Casino,
                  Cedula: registro.Cedula,
                  Mes_registro: fecha_reg,
                  Ano_registro: anio_res,
                  Player: player,
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
                    btn.textContent = "Enviar";
                    Swal.fire({
                      icon: "success",
                      title: "Ganador enviado",
                    });
                  })
                  .catch(() => {
                    loader.style.display = "none";
                    btn.textContent = "Enviar";
                    Swal.fire({
                      icon: "error",
                      title: "No se pudo enviar el ganador",
                    });
                  });
              });
          });
        });

        const inputBuscar = document.getElementById("buscar_usuario");

        inputBuscar.addEventListener("keyup", () => {
          const texto = inputBuscar.value.toLowerCase().trim();
          const filas = container.querySelectorAll("tbody tr");

          const columnas = [1, 3];

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

        const casinos = document.getElementById("casinos");

        casinos.addEventListener("change", (e) => {
          const valor = e.target.value.trim();
          const filas = container.querySelectorAll("tbody tr");
          filas.forEach((fila) => {
            const casino = fila.cells[2]?.textContent.trim(); // Columna 7 (índice 6)
            if (valor === "" || casino === valor) {
              fila.style.display = "";
            } else {
              fila.style.display = "none";
            }
          });
        });
      })
      .catch(console.error);
    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  }
})();
