window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const formatearFechaHora = (isoString, tipo) => {
  if (!isoString) return "-";
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return isoString;

  if (tipo === "hora") {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } else {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
};

function setCookie(name, value, opts = {}) {
  const {
    hours = 3,
    path = "/",
    sameSite = "Lax",
    secure = location.protocol === "https:",
  } = opts;

  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  const encoded = encodeURIComponent(JSON.stringify(value));
  let cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;
  document.cookie = cookie;
}

function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const [k, ...rest] = part.split("=");
    if (k === name) {
      const val = rest.join("=");
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return decodeURIComponent(val);
      }
    }
  }
  return null;
}

const content_form_bingo_login_admin = document.getElementById(
  "content_form_bingo_login_admin",
);
const content_actions_head_admin = document.getElementById(
  "content_actions_head_admin",
);

const content_form_bingo_admin = document.getElementById(
  "content_form_bingo_admin",
);

const btn_consultar_por_dato = document.getElementById(
  "btn_consultar_por_dato",
);

const btn_cerrar_session = document.getElementById("btn_cerrar_session");

const url =
  "https://script.google.com/macros/s/AKfycbyYZtWAnE949LyW70sjx0QU393NuBnA9OBOQq6cU-_NjuQvpFsHP7uLfDhHLyj-pFYa/exec";

const loader = document.getElementById("loader");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const btn_iniciar_promo = document.getElementById("btn_iniciar_promo");

document
  .getElementById("btn_export_excel")
  .addEventListener("click", exportarTablaXLSX);

function exportarTablaXLSX() {
  const table = document.querySelector(".table_all_data");

  if (!table) {
    Swal.fire({
      icon: "warning",
      title: "No hay datos para exportar",
    });
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Registros");
  XLSX.writeFile(wb, "consulta_tablas.xlsx");
}

document
  .getElementById("btn_export_excel_for_document")
  .addEventListener("click", exportarTablaXLSXD);

function exportarTablaXLSXD() {
  const table = document.querySelector(".table_all_data_for_document");

  if (!table) {
    Swal.fire({
      icon: "warning",
      title: "No hay datos para exportar",
    });
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Registros");
  XLSX.writeFile(wb, "consulta_tablas.xlsx");
}

btn_iniciar_promo.addEventListener("click", () => {
  inciar_sesion_promo();
});

function inciar_sesion_promo() {
  if (!usuario.value || !password.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";
  fetch(
    `${url}?hoja=usuario_admin&usuario=${usuario.value}&password=${password.value}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        loader.style.display = "none";
        Swal.fire({
          icon: "warning",
          title: "El usuario no existe.",
        });
        return;
      } else {
        loader.style.display = "none";
        let user_admin = {
          Usuario: usuario.value,
        };

        setCookie("user_admin", user_admin);
        window.location.reload();
      }
    });
}

validateSession();

function validateSession() {
  const user_admin = getCookie("user_admin");

  if (!user_admin) {
    content_form_bingo_login_admin.style.display = "flex";
    content_form_bingo_admin.style.display = "none";
  } else {
    content_form_bingo_login_admin.style.display = "none";
    content_form_bingo_admin.style.display = "flex";
    content_actions_head_admin.style.display = "flex";
  }
}

btn_consultar_por_dato.addEventListener("click", () => {
  consultaPornumero();
});

function consultaPornumero() {
  const container = document.getElementById("table_result");
  let tipo_busqueda = document.getElementById("tipo_busqueda");
  let numero_buscado = document.getElementById("numero_buscado");

  if (!tipo_busqueda.value || !numero_buscado.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }
  container.innerHTML = "";
  loader.style.display = "flex";
  fetch(`${url}?hoja=tablas&${tipo_busqueda.value}=${numero_buscado.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Cant. Tablas</th>
                  <th>Jugador</th>
                  <th># de Tabla</th>
                  <th>Documento</th>
                  <th># Documento</th>
                  <th>Correo</th>
                  <th># Celular</th>
                  <th>Creado por</th>
                  <th>Certifica que no es func.</th>
                  <th>Autorizo de Datos</th>
                  <th>Total de la Compra</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Num_tabla}</td>
                        <td>${registro.Tipo_documento}</td>
                        <td>${registro.Num_documento}</td>
                        <td>${registro.Correo}</td>
                        <td>${registro.Num_celular}</td>
                        <td>${registro.Usuario_crea}</td>
                        <td>${registro.Funcionario}</td>
                        <td>${registro.Autorizo}</td>
                        <td>${registro.Total_compra}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
        document.getElementById("btn_export_excel").style.display = "block";
        loader.style.display = "none";
      } else {
        loader.style.display = "none";
        container.innerHTML = "Sin Registros";
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        html: "Intentalo mas tarde",
      });
    });
}

getAllData();

function getAllData() {
  const container = document.getElementById("table_all_result");
  const inputBuscar = document.getElementById("buscar_usuario");

  container.innerHTML = "Cargando...";
  loader.style.display = "flex";
  fetch(`${url}?hoja=tablas`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table table_all_data">
              <thead>
                <tr>
                  <th>Cant. Tablas</th>
                  <th>Jugador</th>
                  <th># de Tabla</th>
                  <th>Documento</th>
                  <th># Documento</th>
                  <th>Correo</th>
                  <th># Celular</th>
                  <th>Creado por</th>
                  <th>Certifica que no es func.</th>
                  <th>Autorizo de Datos</th>
                  <th>Total de la Compra</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .reverse()
                  .map(
                    (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Num_tabla}</td>
                        <td>${registro.Tipo_documento}</td>
                        <td>${registro.Num_documento}</td>
                        <td>${registro.Correo}</td>
                        <td>${registro.Num_celular}</td>
                        <td>${registro.Usuario_crea}</td>
                        <td>${registro.Funcionario}</td>
                        <td>${registro.Autorizo}</td>
                        <td>${registro.Total_compra}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
        document.getElementById("btn_export_excel").style.display = "block";

        inputBuscar.addEventListener("keyup", () => {
          const texto = inputBuscar.value.toLowerCase().trim();
          const filas = container.querySelectorAll("tbody tr");

          const columnas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

          filas.forEach((fila) => {
            const nombre = columnas
              .map(
                (i) =>
                  fila
                    .querySelector(`td:nth-child(${i})`)
                    ?.textContent.toLocaleLowerCase() || "",
              )
              .join(" ")
              .toLowerCase();
            fila.style.display = nombre.includes(texto) ? "" : "none";
          });
        });
      } else {
        container.innerHTML = "Sin Registros";
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        html: "Intentalo mas tarde",
      });
    });
}

getAllforDocument();

function getAllforDocument() {
  const container = document.getElementById("table_for_document");

  container.innerHTML = "Cargando...";
  loader.style.display = "flex";
  fetch(`${url}?hoja=tablas`)
    .then((res) => res.json())
    .then((data) => {
      const normalizado = [...data].reverse();

      const vistos = new Set();
      const sinDuplicados = [];

      for (const r of normalizado) {
        const doc = String(r.Num_documento || "").trim();
        if (!doc) continue;
        if (vistos.has(doc)) continue;
        vistos.add(doc);
        sinDuplicados.push(r);
      }

      data = sinDuplicados;
      if (data.length > 0) {
        container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table table_all_data_for_document">
              <thead>
                <tr>
                  <th>Cant. Tablas</th>
                  <th>Jugador</th>
                  <th># de Tabla</th>
                  <th>Documento</th>
                  <th># Documento</th>
                  <th>Correo</th>
                  <th># Celular</th>
                  <th>Creado por</th>
                  <th>Certifica que no es func.</th>
                  <th>Autorizo de Datos</th>
                  <th>Total de la Compra</th>
                  <th>Hora</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
               ${data
                 .map(
                   (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Num_tabla}</td>
                        <td>${registro.Tipo_documento}</td>
                        <td>${registro.Num_documento}</td>
                        <td>${registro.Correo}</td>
                        <td>${registro.Num_celular}</td>
                        <td>${registro.Usuario_crea}</td>
                        <td>${registro.Funcionario}</td>
                        <td>${registro.Autorizo}</td>
                        <td>${registro.Total_compra}</td>
                        <td>${formatearFechaHora(registro.Hora, "hora")}</td>
                        <td>${formatearFechaHora(registro.Fecha, "fecha")}</td>
                      </tr>
                    `,
                 )
                 .join("")}
              </tbody>
            </table>
          </div>
        `;
        document.getElementById("btn_export_excel_for_document").style.display =
          "block";
      } else {
        container.innerHTML = "Sin Registros";
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        html: "Intentalo mas tarde",
      });
    });
}

btn_cerrar_session.addEventListener("click", () => {
  cerrarSession();
});

function cerrarSession() {
  Swal.fire({
    title: "Seguro de salir?",
    text: "Se olvidara el usuario y la contraseña",
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
        text: "Tu usuario has sido olvidado.",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          document.cookie = "user_promo=; max-age=0; path=/;";
          document.cookie = "user_admin=; max-age=0; path=/;";
          location.reload();
        }
      });
    }
  });
}
