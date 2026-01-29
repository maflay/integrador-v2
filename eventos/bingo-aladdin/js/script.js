window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

function setCookie(name, value, opts = {}) {
  const {
    hours = 3,
    path = "/",
    sameSite = "Lax", // recomendado
    secure = location.protocol === "https:", // true si estás en https
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

const valCompra = document.getElementById("val_compra");

valCompra.addEventListener("input", () => {
  valCompra.value = valCompra.value.replace(/[^0-9]/g, "");
});

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const loader = document.getElementById("loader");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const btn_iniciar_promo = document.getElementById("btn_iniciar_promo");
const btn_cerrar_session = document.getElementById("btn_cerrar_session");
const content_actions_head = document.getElementById("content_actions_head");
const btn_consultar_jugadores = document.getElementById(
  "btn_consultar_jugadores",
);
const btn_send = document.getElementById("btn_send");
const btn_consultar_por_dato = document.getElementById(
  "btn_consultar_por_dato",
);
const content_form_bingo_login = document.getElementById(
  "content_form_bingo_login",
);
const content_form_bingo = document.getElementById("content_form_bingo");
const seccion_consultar_jugador = document.getElementById(
  "seccion_consultar_jugador",
);
const url =
  "https://script.google.com/macros/s/AKfycbzIH2b__OG_Ez383hyZp_XUMYerZctUjZN8M4nppUsznxgIsQwhw53DX333u_fh4_RD/exec";

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
    `${url}?hoja=usuario_promo&usuario=${usuario.value}&password=${password.value}`,
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
        let user_promo = {
          Usuario: usuario.value,
        };

        setCookie("user_promo", user_promo);
        window.location.reload();
      }
    });
}

validateSession();

function validateSession() {
  const user = getCookie("user_promo");
  const user_admin = getCookie("user_admin");

  if (!user && !user_admin) {
    content_form_bingo_login.style.display = "flex";
    content_form_bingo.style.display = "none";
  } else {
    content_form_bingo_login.style.display = "none";
    content_form_bingo.style.display = "flex";
    content_actions_head.style.display = "flex";
  }

  if (user_admin) {
    btn_consultar_jugadores.style.display = "none";
    document.getElementById("volver_to_admin").style.display = "flex";
  }
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

const cant_tablas = document.getElementById("cant_tablas");
const tablas_container = document.getElementById("tablas_container");

cant_tablas.addEventListener("change", renderTablaInputs);

function renderTablaInputs() {
  const n = Number(cant_tablas.value || 0);

  tablas_container.innerHTML = "";

  if (!n) return;

  for (let i = 1; i <= n; i++) {
    const wrap = document.createElement("div");
    wrap.className = "input-group";
    wrap.innerHTML = `
      <input id="tabla_${i}" name="tabla_${i}" type="number" required />
      <label># Tabla ${i} : <strong style="color: red;">*</strong></label>
    `;
    tablas_container.appendChild(wrap);
  }
}

function getTablasFromUI() {
  const n = Number(document.getElementById("cant_tablas").value || 0);
  const tablas = [];

  for (let i = 1; i <= n; i++) {
    const el = document.getElementById(`tabla_${i}`);
    const val = (el?.value || "").trim();
    if (!val) return { error: `Falta el número de la tabla ${i}` };
    tablas.push(val);
  }

  // evitar duplicadas en el mismo envío
  const set = new Set(tablas);
  if (set.size !== tablas.length)
    return { error: "No puedes repetir números de tabla." };

  return { tablas };
}

btn_send.addEventListener("click", () => {
  handleSendTabla();
});

function handleSendTabla() {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let tipo_documento = document.getElementById("tipo_documento");
  let num_documento = document.getElementById("num_documento");
  let correo = document.getElementById("correo");
  let celular = document.getElementById("celular");
  let no_soy_del_casino = document.getElementById("no_soy_del_casino");
  let autorizo_uso_datos = document.getElementById("autorizo_uso_datos");

  let user = getCookie("user_promo");

  if (!user) {
    user = getCookie("user_admin");
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

  const { tablas, error } = getTablasFromUI();
  if (error) {
    Swal.fire({ icon: "warning", title: error });
    loader.style.display = "none";
    return;
  }

  if (
    !nombre.value ||
    !apellido.value ||
    !tipo_documento.value ||
    !num_documento.value ||
    !celular.value ||
    autorizo_uso_datos.checked == false
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos Obligatorios en Blanco",
    });
    return;
  }

  const esNoFuncionario = no_soy_del_casino.checked ? "Si" : "No";
  const autorizoDatos = autorizo_uso_datos.checked ? "Si" : "No";

  loader.style.display = "flex";

  fetch(`${url}?hoja=tablas&num_documento=${num_documento.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length + tablas.length > 5) {
        loader.style.display = "none";
        Swal.fire({
          icon: "warning",
          title: "No puedes asignar mas tablas para este documento.",
        });
        return;
      } else {
        let data = {
          tipo: "tabla_create_batch",
          Hora: hora,
          Fecha: fecha,
          Usuario_crea: user.Usuario,
          Nombre: nombre.value + " " + apellido.value,
          Tipo_documento: tipo_documento.value,
          Num_documento: num_documento.value,
          Correo: correo.value,
          Num_celular: celular.value,
          Tablas: tablas,
          Funcionario: esNoFuncionario,
          Autorizo: autorizoDatos,
          Total_compra: formatoPesos_monto_efectivo.format(valCompra.value),
        };
        fetch(`${url}?hoja=tablas`, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            loader.style.display = "none";
            nombre.value = "";
            apellido.value = "";
            tipo_documento.value = "";
            num_documento.value = "";
            correo.value = "";
            celular.value = "";
            cant_tablas.value = "";
            no_soy_del_casino.checked = false;
            autorizo_uso_datos.checked = false;
            tablas_container.innerHTML = "";
            valCompra.value = "";
            Swal.fire({
              icon: "success",
              title: "Envió Exitoso",
            });
          })
          .catch((error) => {
            loader.style.display = "none";
            Swal.fire({
              icon: "error",
              title: "Error en el Envio",
              html: "Ha ocurrido un error en el envió, por favor comunícate con el área de comunicaciones",
            });
          });
      }
    });
}

btn_consultar_jugadores.addEventListener("click", () => {
  content_form_bingo.classList.toggle("off_screen");
  seccion_consultar_jugador.classList.toggle("on_screen");
  document.getElementById("table_result").innerHTML = "";
  document.getElementById("tipo_busqueda").value = "";
  document.getElementById("numero_buscado").value = "";
  btn_consultar_jugadores.textContent =
    btn_consultar_jugadores.textContent === "Consultar Jugadores"
      ? "Registrar"
      : "Consultar Jugadores";
});

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
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
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
