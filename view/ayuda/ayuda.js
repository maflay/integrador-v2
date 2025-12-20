const img_send_obs = document.getElementById("img_send_obs");
const rol_desc_obser = document.getElementById("rol_desc_obser");
const mini_spinner_observacion_integrador = document.getElementById(
  "mini_spinner_observacion_integrador"
);
const mini_spinner_any = document.getElementById("mini_spinner_any");
const fechaCompleta = new Date().toLocaleString("es-CO", {
  timeZone: "America/Bogota",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const input_menu = document.getElementById("input_menu");
const btn_text_aviso = document.getElementById("btn_text_aviso");
const text_aviso = document.getElementById("text_aviso");
const loader_menu = document.getElementById("loader_menu");

const url_menu =
  "https://script.google.com/macros/s/AKfycby-mvnpDgPPn0tTQvEABeCPpJXkVIdF0PmFhWydwH-xQo7qVqjsXX_66myO0-95ExEc/exec";

const [fecha, hora] = fechaCompleta.split(", ");
const desc_obser_integrador = document.getElementById("desc_obser_integrador");
const url =
  "https://script.google.com/macros/s/AKfycbxFxJQBmeWPIHjFX11Mxvi1XcC_19owDjHtnB3GMK5MpErIrFIHore-6celJL6uoI5r8g/exec";

const btn_admin_mensaje = document.getElementById("admin_excel");
btn_admin_mensaje.addEventListener("click", () => {
  (window.href =
    "https://docs.google.com/spreadsheets/d/1oZVs6mlve0hngitQLMmGnJx_W9spofKnm13aIZb5gJw/edit?gid=0#gid=0"),
    "_blank";
});
metodoprueba();
const btn_recargarcomentario = document.getElementById("recargarcomentario");
const user = getCookie("__Secure_1nf0_US3R");

img_send_obs.addEventListener("click", () => {
  const valor_mensaje = desc_obser_integrador.value;
  const nombre_usuario = user.Nombre;
  // console.log(nombre_usuario,"nombre_usuario");

  if (valor_mensaje == "") {
    Swal.fire({
      title: "Campos en Blanco",
      text: "Antes de continuar completa la información.",
      icon: "info",
      heightAuto: false, // opcional, evita “brinco” en algunos casos
    });
    return;
  }
  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre_usuario,
    valor_4: valor_mensaje,
  };
  img_send_obs.style.display = "none";
  mini_spinner_any.style.display = "flex";
  desc_obser_integrador.style.opacity = "0.7";
  desc_obser_integrador.style.pointerEvents = "none";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  }).then(() => {
    getAllMensajes();
    img_send_obs.style.display = "flex";
    mini_spinner_any.style.display = "none";
    desc_obser_integrador.style.opacity = "1";
    desc_obser_integrador.style.pointerEvents = "auto";
    desc_obser_integrador.value = "";
  });
});

function getAllMensajes() {
  const container = document.getElementById("GetDataOberservacion");
  mini_spinner_observacion_integrador.style.display = "flex";
  container.innerHTML = ``;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay Comentarios.</p>`;
        mini_spinner_observacion_integrador.style.display = "none";
        return;
      }

      mini_spinner_observacion_integrador.style.display = "none";
      container.innerHTML = `
            ${[...data]
              .reverse()
              .map((registro) => {
                const fecha = new Date(registro.hora);
                const fecha_dia = new Date(registro.fecha);
                const hora = fecha.toLocaleTimeString("es-CO", {
                  timeZone: "America/Bogota",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const fecha_larga = fecha_dia.toLocaleDateString("es-CO", {
                  timeZone: "America/Bogota",
                  day: "2-digit",
                  month: "long",
                  year: "2-digit",
                });

                return `
                    <div class="content_mensaje_chat">
                        <span class="nombre_int">${registro.nombre}:</span>
                        <span class="mensaje_int">${registro.mensaje}</span>
                        <div class="content_date_chat">
                            <span class="hora_int">${registro.hora}</span>
                            <span class="fecha_int">${fecha_larga}</span>
                        </div>
                    </div>
                `;
              })
              .join("")}
            `;
    })
    .catch((err) => {
      console.error("Ocurrió un error:", err);
    });
}

getAllMensajes();

btn_recargarcomentario.addEventListener("click", () => {
  getAllMensajes();
});

btn_text_aviso.addEventListener("click", () => {
  let input_menu_V = input_menu.value;

  if (input_menu_V == "") {
    Swal.fire({
      icon: "warning",
      title: "Introduce un Título Valido.",
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

  let data = {
    tipo: "valor",
    Clave: "AVISO_MENU",
    Valor: input_menu_V,
    Fecha: fecha + " - " + hora,
  };

  loader_menu.style.display = "flex";
  fetch(url_menu, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      fetch(url_menu, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "log",
          Clave: "AVISO_MENU",
          Valor: input_menu_V,
          Fecha: fecha + " " + hora,
        }),
      });
      input_menu.value = "";
      loader_menu.style.display = "none";
      GetValorMenu();
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
        html: "La información se envió de manera correcta.",
      });
    })
    .catch((error) => {
      loader_menu.style.display = "none";

      Swal.fire({
        icon: "error",
        title: "Error",
        html: "Error 23423545#%#%34#43443546456$%34534&%345345$&$%32322#%#$%#$&/(&)/(=&/&$/%/%##.",
      });
    });
});

GetValorMenu();

function GetValorMenu() {
  loader_menu.style.display = "flex";
  fetch(url_menu)
    .then((res) => res.json())
    .then((data) => {
      loader_menu.style.display = "none";
      text_aviso.textContent = data[0].Valor;
    });
}
