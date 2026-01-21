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
  "https://script.google.com/macros/s/AKfycbyW9YT1N3DPIjJBLKhml0XxsQfngMs4VxiAQ_EeN7aJvv3u21MUKJHqwceV3ZQgRhk9nA/exec";
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

  if (!nombre_finalista.value || !casino_finalista.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(`${url}?hoja=finalista&nombre=${nombre_finalista.value}`)
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
        let data = {
          tipo: "finalista",
          Nombre: nombre_finalista.value,
          Fecha: fecha + " - " + hora,
          Cedula: "",
          Casino: casino_finalista.value,
          Usuario: user.Nombre,
        };
        fetch(`${url}?hoja=finalista`, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            getDataFinalista();
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
            Swal.fire({
              icon: "error",
              title: "Error en el Envio",
            });
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

  if (nombre.value.length < 10) {
    Swal.fire({
      icon: "warning",
      title: "Nombre no valido",
    });
    return;
  }

  if (!nombre.value || !casino.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(`${url}?hoja=semis&nombre=${nombre.value}`)
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
        let data = {
          tipo: "semis",
          Nombre: nombre.value,
          Fecha: fecha + " - " + hora,
          Cedula: cedula.value,
          Casino: casino.value,
          Usuario: user.Nombre,
        };
        fetch(`${url}?hoja=semis`, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            getSemis();
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

function handleObservacionSubmit() {
  const casino_modal_observacion = document.getElementById(
    "casino-modal-observacion"
  );
  const casino_modal_descripcion = document.getElementById(
    "casino-modal-descripcion"
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
        title: "Envio Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Evnio",
      });
    });
}

function getCliente() {
  const cedula = document.getElementById("cedulaGet").value;
  const loader = document.getElementById("loader");
  const resultCliente = document.getElementById("content-result-cliente");

  loader.style.display = "flex";
  fetch(`${url}?cedula=${cedula}`)
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
                  <th>Cedula</th>
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
                    `
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

getSemis();
function getSemis() {
  const container = document.getElementById("content-all-result");
  mostrarLoader(container, "Cargando lista de Semi-finalistas...");

  fetch(`${url}?hoja=semis`)
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
                  </tr>
                `
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;

      let lvlTest = user.Nivel;

      if (lvlTest == "2" || lvlTest == "1") {
        const filas = container.querySelectorAll("tbody tr");

        filas.forEach((fila) => {
          fila.addEventListener("click", () => {
            filas.forEach((f) => f.classList.remove("selected"));
            fila.classList.add("selected");
          });
        });
      }
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

  fetch(`${url}?hoja=finalista`)
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
                  </tr>
                `
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;
    })
    .catch((error) => {
      console.warn("Error al cargar los datos:", error);
      container.innerHTML = `<p>Error al cargar los datos.</p>`;
    });
}
