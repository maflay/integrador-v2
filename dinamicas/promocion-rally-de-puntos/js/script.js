window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const btn_submit_rally = document.getElementById("btn_submit");
  const btn_envia_observacion = document.getElementById(
    "btn_envia_observacion"
  );

  const container = document.getElementById("content_info_rally");
  const opciones_rally = document.getElementById("opciones_rally");
  const close_modal_icon = document.getElementById("close_modal_icon");

  const loader = document.getElementById("loader");

  const casino = document.getElementById("casino");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const puntaje = document.getElementById("puntaje");
  const promocion = "Rally de Puntos";
  const barra_vida_ciclo = document.getElementById("barra_vida_ciclo");
  const data_info_historial = document.getElementById("data_info_historial");
  const close_modal_icon_H = document.getElementById("close_modal_icon_H");

  const casino_puntaje = document.getElementById("casino_puntaje");
  const casino_bono = document.getElementById("casino_bono");

  const user = inforUser();

  const btn_refresh = document.getElementById("btn_refresh");

  // Linea de vida
  const lunes = document.getElementById("lunes_rally");
  const martes = document.getElementById("martes_rally");
  const miercoles = document.getElementById("miercoles_rally");
  const jueves = document.getElementById("jueves_rally");
  const viernes = document.getElementById("viernes_rally");
  const sabado = document.getElementById("sabado_rally");
  const domingo = document.getElementById("domingo_rally");

  // btn modal
  const btn_guardar_registro = document.getElementById("btn_guardar_registro");
  const btn_observacion = document.getElementById("btn_observacion");
  const btn_actualizar_puntaje = document.getElementById(
    "btn_actualizar_puntaje"
  );
  const btn_enviar_bono = document.getElementById("btn_enviar_bono");

  // view modal
  const view_guardar_registro = document.getElementById(
    "view_guardar_registro"
  );
  const view_envia_observacion = document.getElementById(
    "view_envia_observacion"
  );
  const view_envia_puntaje = document.getElementById("view_envia_puntaje");
  const view_envia_bono = document.getElementById("view_envia_bono");

  view_guardar_registro.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_envia_puntaje.style.display = "none";
  view_envia_bono.style.display = "none";

  btn_guardar_registro.addEventListener("click", () => {
    view_guardar_registro.style.display = "flex";
    view_envia_observacion.style.display = "none";
    view_envia_puntaje.style.display = "none";
    view_envia_bono.style.display = "none";

    btn_guardar_registro.classList.add("select_menu");
    btn_observacion.classList.remove("select_menu");
    btn_actualizar_puntaje.classList.remove("select_menu");
    btn_enviar_bono.classList.remove("select_menu");
  });

  btn_observacion.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envia_observacion.style.display = "flex";
    view_envia_puntaje.style.display = "none";
    view_envia_bono.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_observacion.classList.add("select_menu");
    btn_actualizar_puntaje.classList.remove("select_menu");
    btn_enviar_bono.classList.remove("select_menu");
  });

  btn_actualizar_puntaje.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envia_observacion.style.display = "none";
    view_envia_puntaje.style.display = "flex";
    view_envia_bono.style.display = "none";

    btn_guardar_registro.classList.remove("select_menu");
    btn_observacion.classList.remove("select_menu");
    btn_actualizar_puntaje.classList.add("select_menu");
    btn_enviar_bono.classList.remove("select_menu");
  });

  btn_enviar_bono.addEventListener("click", () => {
    view_guardar_registro.style.display = "none";
    view_envia_observacion.style.display = "none";
    view_envia_puntaje.style.display = "none";
    view_envia_bono.style.display = "flex";

    btn_guardar_registro.classList.remove("select_menu");
    btn_observacion.classList.remove("select_menu");
    btn_actualizar_puntaje.classList.remove("select_menu");
    btn_enviar_bono.classList.add("select_menu");
  });

  barra_vida_ciclo.addEventListener("click", () => {
    data_info_historial.style.display = "flex";
    getDataHistorial();
  });

  close_modal_icon_H.addEventListener("click", () => {
    data_info_historial.style.display = "none";
    document.getElementById("filtro_nombre_historial").value = "";
  });

  const url =
    "https://script.google.com/macros/s/AKfycbygLuxBSdQ4pEL1X3RX78fK6AGXRc1pDLEvFbKYwoLZOS2OSKyXB81QSKds1NQDHUvu/exec";

  const weekday = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  validateLineaDia();

  function validateLineaDia() {
    const d = new Date();
    let day = weekday[d.getDay()];

    if (day == "Sabado") {
      lunes.classList.add("lunes_rally");
      martes.classList.add("martes_rally");
      miercoles.classList.add("miercoles_rally");
      jueves.classList.add("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.add("domingo_rally");
    } else if (day == "Domingo") {
      lunes.classList.add("lunes_rally");
      martes.classList.add("martes_rally");
      miercoles.classList.add("miercoles_rally");
      jueves.classList.add("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    } else if (day == "Lunes") {
      lunes.classList.remove("lunes_rally");
      martes.classList.add("martes_rally");
      miercoles.classList.add("miercoles_rally");
      jueves.classList.add("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    } else if (day == "Martes") {
      lunes.classList.remove("lunes_rally");
      martes.classList.remove("martes_rally");
      miercoles.classList.add("miercoles_rally");
      jueves.classList.add("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    } else if (day == "Miercoles") {
      lunes.classList.remove("lunes_rally");
      martes.classList.remove("martes_rally");
      miercoles.classList.remove("miercoles_rally");
      jueves.classList.add("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    } else if (day == "Jueves") {
      lunes.classList.remove("lunes_rally");
      martes.classList.remove("martes_rally");
      miercoles.classList.remove("miercoles_rally");
      jueves.classList.remove("jueves_rally");
      viernes.classList.add("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    } else if (day == "Viernes") {
      lunes.classList.remove("lunes_rally");
      martes.classList.remove("martes_rally");
      miercoles.classList.remove("miercoles_rally");
      jueves.classList.remove("jueves_rally");
      viernes.classList.remove("viernes_rally");
      sabado.classList.remove("sabado_rally");
      domingo.classList.remove("domingo_rally");
    }
  }

  opciones_rally.addEventListener("click", () => {
    document.getElementById("modal_opciones_rally").style.display = "flex";
    view_guardar_registro.style.display = "flex";
    view_envia_observacion.style.display = "none";
    view_envia_puntaje.style.display = "none";
    view_envia_bono.style.display = "none";

    btn_guardar_registro.classList.add("select_menu");
    btn_observacion.classList.remove("select_menu");
    btn_actualizar_puntaje.classList.remove("select_menu");
    btn_enviar_bono.classList.remove("select_menu");
  });

  close_modal_icon.addEventListener("click", () => {
    document.getElementById("modal_opciones_rally").style.display = "none";
  });

  if (casino.value != "") {
    getDataRaly();
  }

  setInterval(() => {
    if (casino.value != "") {
      getDataRaly();
    }
  }, 1800000);

  casino.addEventListener("change", () => {
    if (casino.value != "") {
      getDataRaly();
      casino.classList.add("table_loading");
    }
  });

  btn_refresh.addEventListener("click", () => {
    if (casino.value == "") {
      Swal.fire({
        icon: "warning",
        title: "Por favor, Selecciona un casino",
      });
      return;
    } else {
      btn_refresh.textContent = "Consultado...";
      getDataRaly();
    }
  });

  function getDataRaly() {
    let casinoGet = casino.value;
    if (document.getElementById("indicador_tabla_rally_princi")) {
      document.getElementById("indicador_tabla_rally_princi").textContent =
        "Cargando...";
    }
    container.classList.add("table_loading");
    btn_refresh.classList.add("table_loading");
    fetch(`${url}?casino=${casinoGet}`)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Error en la consulta",
            html: "Ha ocurrido un error en la carga de la información, si continua el problema, refrescar el sitio.",
          }).then((result) => {
            if (result.isConfirmed) {
              getDataRaly();
            }
          });
          container.classList.remove("table_loading");
          btn_refresh.classList.remove("table_loading");
          console.log("entro al error");
          return;
        }

        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No hay datos disponibles.</p>`;
          return;
        }
        casino.classList.remove("table_loading");
        data.sort((a, b) => {
          const puntajeA = Number(a.Puntaje) || 0;
          const puntajeB = Number(b.Puntaje) || 0;
          return puntajeB - puntajeA; // mayor a menor
        });

        //         const texto = registro.Cedula;
        // const ultimos4 = texto.substring(texto.length - 4);
        // console.log(ultimos4); // "1234"

        container.classList.remove("table_loading");
        btn_refresh.classList.remove("table_loading");
        container.innerHTML = `
        <div class="table-result-rally table-scrolld-rally">
          <table class="styled-table-rally">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Corredor</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .slice(0, 10)
                .map(
                  (registro, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td>${"..." + String(registro.Cedula).slice(-4)}</td>
                    <td>${registro.Puntaje || 0}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
        const filas = container.querySelectorAll("tbody tr");

        filas.forEach((fila, i) => {
          // Solo los 3 primeros
          if (i < 6) fila.classList.add(`top${i + 1}`);

          // Buscar la celda donde pondremos la imagen (por ejemplo, en la columna del nombre)
          const celdaDestino = fila.querySelector("td:nth-child(1)");
          if (!celdaDestino) return;

          // Seleccionar la imagen según la posición
          let src = null;
          if (i === 0)
            src =
              "/dinamicas/promocion-rally-de-puntos/resources/cara_verde.png"; // 🥇 1er lugar
          if (i === 1)
            src =
              "/dinamicas/promocion-rally-de-puntos/resources/cara_roja.png"; // 🥈 2do lugar
          if (i === 2)
            src =
              "/dinamicas/promocion-rally-de-puntos/resources/cara_azul.png"; // 🥉 3er lugar

          // Crear y agregar imagen solo si aplica
          if (src) {
            const img = document.createElement("img");
            celdaDestino.style.position = "relative";
            img.src = src;
            img.alt = "";
            img.className = "cara_listado";
            celdaDestino.appendChild(img);
          }
        });

        btn_refresh.textContent = "Refrescar Tabla";
      })
      .catch((error) => {
        console.warn("Error al cargar los datos:", error);
        container.innerHTML = `<p>Error al cargar los datos.</p>`;
      });
  }

  // <td>${
  //                     registro.Bono === ""
  //                       ? `<input placeholder="# Bono" class="table_input_bono_pp" type="text" name="Bono Ganador">`
  //                       : registro.Bono
  //                   }</td>
  //                   <td>${
  //                     registro.Bono === ""
  //                       ? `<button class="btn btn-primary btn-enviar-pp" data-info='${JSON.stringify(
  //                           registro
  //                         )}'>
  //                           Enviar
  //                         </button>`
  //                       : `Ya contiene Bono`
  //                   }</td>
  //                   <td>${registro.Puntaje || 0}</td>
  //                   <td>${String(registro.Cedula || "").substring(0, 4)}...</td>

  btn_submit_rally.addEventListener("click", () => {
    testPost();
  });

  function testPost() {
    let casinoVal = casino.value;
    let nombreVal = nombre.value;
    let cedulaVal = cedula.value;
    let puntajeVal = puntaje.value;

    const fechaCompletaC = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [fechaC, horaC] = fechaCompletaC.split(", ");

    if (
      casinoVal == "" ||
      nombreVal == "" ||
      cedulaVal == "" ||
      puntajeVal == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
        html: "Completa los campos para poder enviar la información",
      });
      return;
    }

    const data = {
      tipo: "dinamica",
      Hora: horaC,
      Fecha: fechaC,
      Nombre: nombreVal,
      Cedula: cedulaVal,
      Casino: casinoVal,
      Categoria: "MYMAWI",
      Puntaje: puntajeVal,
      Bono: "",
      Promocion: promocion,
      Usuario: user.Nombre,
      Nom_casino: "MarcoPolo",
    };

    loader.style.display = "flex";
    fetch(`${url}?hoja=dinamica&cedula=${cedulaVal}`)
      .then((res) => res.json())
      .then((item) => {
        if (item.length > 0) {
          loader.style.display = "none";
          Swal.fire({
            icon: "info",
            title: "Registro existente",
            text: `Ya existe un registro con esta cédula.`,
            confirmButtonColor: "#a13b22",
          });
        } else {
          fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
          })
            .then((res) => res.text())
            .then(() => {
              nombre.value = "";
              cedula.value = "";
              createDataHistorial(data);
              puntaje.value = "";
              loader.style.display = "none";
              getDataRaly();
              Swal.fire({
                icon: "success",
                title: "Envio Correcto",
                html: "La información se envio correctamente.",
              });
            })
            .catch((errr) => {
              alert("Error, Por favor refrescar la pagina");
              console.log("entro al error");
            });
        }
      });
  }

  btn_envia_observacion.addEventListener("click", () => {
    handleSendObservacion();
  });

  function handleSendObservacion() {
    let casinoV = document.getElementById("casino_observacion");
    let descripcionV = document.getElementById("descripcion_observacion");

    const fechaCompleta = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [fecha, hora] = fechaCompleta.split(", ");

    if (casinoV.value == "" || descripcionV == "") {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
        html: "Debes completar la información.",
      });
      return;
    }

    let data = {
      tipo: "observacion",
      Hora: hora,
      Fecha: fecha,
      Casino: casinoV.value,
      Observacion: descripcionV.value,
      Usuario: user.Nombre,
    };

    loader.style.display = "flex";

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        casinoV.value = "";
        descripcionV.value = "";
        Swal.fire({
          icon: "warning",
          title: "Envió Correcto",
          html: "Se Envió la Observación.",
        });
        loader.style.display = "none";
      })
      .catch((error) => {
        console.log("error", error);
        loader.style.display = "none";
      });
  }

  casino_puntaje.addEventListener("change", () => {
    if (casino_puntaje.value != "") {
      getDataUPuntaje();
      document.getElementById("msj_cargando").style.display = "flex";
    }
  });

  function createDataHistorial(data) {
    const fechaCompleta = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [fecha, hora] = fechaCompleta.split(", ");

    let bodyH = {
      tipo: "historial",
      Hora: hora,
      Fecha: fecha,
      Nombre: data.Nombre,
      Cedula: data.Cedula,
      Casino: data.Casino,
      Categoria: "MYMAWI",
      Puntaje: data.Puntaje,
      Promocion: data.Promocion,
      Usuario: data.Usuario,
      Nom_casino: "MarcoPolo",
    };

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(bodyH),
    })
      .then((res) => res.text())
      .then(() => {
        console.log("Creo el Historial.");
      });
  }

  function getDataHistorial() {
    const filtro = document.getElementById("filtro_nombre_historial");
    const container = document.getElementById("info_historial_rally");
    filtro.style.display = "none";
    container.textContent = "Cargando...";
    fetch(`${url}?hoja=historial`)
      .then((res) => {
        if (!res.ok) {
          Swal.fire({
            icon: "error",
            title: "Error en la consulta",
            html: "Ha ocurrido un error en la carga de la información, si continua el problema, refrescar el sitio.",
          }).then((result) => {
            if (result.isConfirmed) {
              getDataHistorial();
            }
          });
          console.log("entro al error");
          return;
        }

        return res.json();
      })
      .then((data) => {
        container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Puntaje <br /></th>
                <th>Promoción <br /> </th>
                <th>Casino</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .reverse()
                .map(
                  (registro, i) => `
                  <tr>
                  <td>${i + 1}</td>
                    <td>${
                      registro.Nombre ? registro.Nombre.substring(0, 10) : ""
                    }</td>
                    <td>${
                      registro.Fecha ? registro.Fecha.substring(0, 10) : ""
                    }</td>
                    <td>${registro.Puntaje || 0}</td>
                    <td>${registro.Promocion || 0}</td>
                    <td>${
                      registro.Nom_casino + " / " + registro.Casino || ""
                    }</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;

        filtro.style.display = "flex";

        if (filtro) {
          filtro.addEventListener("input", () => {
            const texto = filtro.value.toLowerCase();
            const filas = container.querySelectorAll("tbody tr");
            filas.forEach((fila) => {
              const nombre = fila.children[1]?.textContent.toLowerCase() || "";
              fila.style.display = nombre.includes(texto) ? "" : "none";
            });
          });
        }
      });
  }

  function getDataUPuntaje() {
    const container = document.getElementById("content_table_puntaje");
    let casinoGet = casino_puntaje.value;
    container.classList.add("table_loading");

    fetch(`${url}?casino=${casinoGet}`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No hay datos disponibles.</p>`;
          document.getElementById("msj_cargando").style.display = "none";
          return;
        }
        document.getElementById("msj_cargando").style.display = "none";

        container.classList.remove("table_loading");
        data.sort((a, b) => {
          const puntajeA = Number(a.Puntaje) || 0;
          const puntajeB = Number(b.Puntaje) || 0;
          return puntajeB - puntajeA; // mayor a menor
        });

        container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>Fecha</th>
                <th>Puntaje <br /> Actual</th>
                <th>Actualizar <br /> Puntaje</th>
                <th>Opciones</th>
                <th>Casino</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (registro, i) => `
                  <tr>
                  <td>${i + 1}</td>
                    <td>${
                      registro.Nombre ? registro.Nombre.substring(0, 10) : ""
                    }</td>
                    <td>${registro.Cedula}</td>
                    <td>${
                      registro.Fecha ? registro.Fecha.substring(0, 10) : ""
                    }</td>
                    <td>${registro.Puntaje || 0}</td>
                    <td><input placeholder="Puntaje" type="number" class="table_input_puntaje_pp"></td>
                    <td><button  data-info='${JSON.stringify(
                      registro
                    )}' class="btn btn-primary btn-enviar-puntaje">Enviar</button></td>
                    <td>${
                      registro.Nom_casino + " / " + registro.Casino || ""
                    }</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;

        // --- Filtro por nombre ---
        const filtro = document.getElementById("filtro_nombre");
        filtro.style.display = "block";
        if (filtro) {
          filtro.addEventListener("input", () => {
            const texto = filtro.value.toLowerCase();
            const filas = container.querySelectorAll("tbody tr");
            filas.forEach((fila) => {
              const nombre = fila.children[1]?.textContent.toLowerCase() || "";
              fila.style.display = nombre.includes(texto) ? "" : "none";
            });
          });
        }

        document.querySelectorAll(".btn-enviar-puntaje").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const fila = btn.closest("tr");
            const puntajeInput = fila.querySelector(".table_input_puntaje_pp");
            const puntaje = (puntajeInput?.value || "").trim();

            if (!puntaje) {
              Swal.fire({ icon: "warning", title: "Falta el Nuevo Puntaje" });
              return; // evita dejar el loader activo
            }

            // UI
            const prevText = btn.textContent;
            btn.textContent = "Enviando...";
            btn.disabled = true;
            loader.style.display = "flex";

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
                  }[m])
              );
            }

            if (fila) {
              const tdpunt = fila.querySelector("td:nth-child(5)");
              const tdBono = fila.querySelector("td:nth-child(6)");
              const tdAcc = fila.querySelector("td:nth-child(7)");
              if (tdBono) tdpunt.innerHTML = escapeHtml(puntaje);
            }

            const registro = JSON.parse(btn.dataset.info);
            const data = {
              tipo: "update_puntaje",
              match: { Cedula: registro.Cedula, Casino: registro.Casino },
              Puntaje: puntaje,
            };

            let bodyPut = {
              Hora: registro.Hora,
              Fecha: registro.Fecha,
              Nombre: registro.Nombre,
              Cedula: registro.Cedula,
              Casino: registro.Casino,
              Categoria: registro.Categoria,
              Puntaje: puntaje,
              Promocion: registro.Promocion,
              Usuario: registro.Usuario,
              Nom_casino: registro.Nom_casino,
            };
            createDataHistorial(bodyPut);

            fetch(url, {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(data),
            })
              .then((res) => res.text())
              .then(() => {
                btn.textContent = prevText;
                loader.style.display = "none";
                puntajeInput.value = "";
                getDataUPuntaje();
                getDataRaly();
                Swal.fire({
                  icon: "success",
                  allowOutsideClick: false,
                  title: `Envio Exitoso.`,
                  text: `Información enviada de manera correcta.`,
                });
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

  casino_bono.addEventListener("change", () => {
    if (casino_bono.value != "") {
      getDataBono();
    }
  });

  function getDataBono() {
    const container = document.getElementById("content_table_bono");
    let casinoGet = casino_bono.value;
    container.classList.add("table_loading");
    document.getElementById("msj_cargando_bono").style.display = "flex";

    fetch(`${url}?casino=${casinoGet}`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No hay datos disponibles.</p>`;
          document.getElementById("msj_cargando_bono").style.display = "none";
          return;
        }
        document.getElementById("msj_cargando_bono").style.display = "none";

        container.classList.remove("table_loading");
        data.sort((a, b) => {
          const puntajeA = Number(a.Puntaje) || 0;
          const puntajeB = Number(b.Puntaje) || 0;
          return puntajeB - puntajeA; // mayor a menor
        });
        container.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>Fecha</th>
                <th>Bono</th>
                <th>Actualizar <br /> Bono</th>
                <th>Opciones</th>
                <th>Casino</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (registro, i) => `
                  <tr>
                  <td>${i + 1}</td>
                    <td>${
                      registro.Nombre ? registro.Nombre.substring(0, 10) : ""
                    }</td>
                    <td>${registro.Cedula}</td>
                    <td>${
                      registro.Fecha ? registro.Fecha.substring(0, 10) : ""
                    }</td>
                    <td>${
                      registro.Bono == "" || registro.Bono == "0"
                        ? "No hay Bono"
                        : registro.Bono
                    }</td>
                    <td>${
                      registro.Bono == "" || registro.Bono == "0"
                        ? `<input placeholder="Bono" type="number" class="table_input_bono_pp">`
                        : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`
                    }</td>
                    <td>${
                      registro.Bono == "" || registro.Bono == "0"
                        ? `<button  data-info='${JSON.stringify(
                            registro
                          )}' class="btn btn-primary btn-enviar-bono">Enviar</button>`
                        : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`
                    }</td>
                    <td>${
                      registro.Nom_casino + " / " + registro.Casino || ""
                    }</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;

        const filtro = document.getElementById("filtro_nombre_bono");
        filtro.style.display = "block";
        if (filtro) {
          filtro.addEventListener("input", () => {
            const texto = filtro.value.toLowerCase();
            const filas = container.querySelectorAll("tbody tr");
            filas.forEach((fila) => {
              const nombre = fila.children[1]?.textContent.toLowerCase() || "";
              fila.style.display = nombre.includes(texto) ? "" : "none";
            });
          });
        }

        document.querySelectorAll(".btn-enviar-bono").forEach((btn) => {
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
                  }[m])
              );
            }

            if (fila) {
              const tdconB = fila.querySelector("td:nth-child(5)");
              const tdBono = fila.querySelector("td:nth-child(6)");
              const tdAcc = fila.querySelector("td:nth-child(7)");
              if (tdBono) {
                tdBono.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
                tdconB.innerHTML = escapeHtml(bono);
              }
              if (tdAcc)
                tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
            }

            const registro = JSON.parse(btn.dataset.info);
            const data = {
              tipo: "update_bono",
              match: { Cedula: registro.Cedula, Casino: registro.Casino },
              Bono: bono,
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
                bonoInput.value = "";
                Swal.fire({
                  icon: "success",
                  allowOutsideClick: false,
                  title: `Envio Exitoso.`,
                  text: `Información enviada de manera correcta.`,
                });
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
      });
  }
});
