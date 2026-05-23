window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
const _content_tesla_ = document.getElementById("_content_tesla_");
const _content_opcions_ = document.getElementById("_content_opcions_");
const show_video = document.getElementById("show_video");
const btn_opciones = document.getElementById("btn_opciones");
const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const casino = document.getElementById("casino");
const nume_1 = document.getElementById("nume_1");
const nume_2 = document.getElementById("nume_2");
const nume_3 = document.getElementById("nume_3");
const numeros = document.getElementById("numeros");
const _content_table_result_ = document.getElementById(
  "_content_table_result_",
);
const _content_table_result_result_ = document.getElementById(
  "_content_table_result_result_",
);
const _ganador_telsa_ = document.getElementById("_ganador_telsa_");
const _content_num_mix_ = document.getElementById("_content_num_mix_");
const accion_1 = document.getElementById("accion_1");
const _mostrar_mixes_ = document.getElementById("_mostrar_mixes_");
const accion_3 = document.getElementById("accion_3");
const promocion = "Promocion TESLA";
const btn_send_info = document.getElementById("btn_send_info");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const _contenedor_inputs_ = document.getElementById("_contenedor_inputs_");
const _content_video_show_ = document.getElementById("_content_video_show_");
const _content_video_show_result_ = document.getElementById(
  "_content_video_show_result_",
);
const url =
  "https://script.google.com/macros/s/AKfycbx_wtN46FbP0M9hE0eMMLtSTaxeTzsBqCCcuhc_gSX1v1NTiaQ7J4--pkvxbaWq5ha2/exec";

show_video.addEventListener("click", () => {
  _content_video_show_.classList.toggle("_mascara_back_");
  _content_table_result_
    ? _content_table_result_.classList.toggle("display_none")
    : "";
  _content_tesla_ ? _content_tesla_.classList.toggle("displa  y_none") : "";
  _content_opcions_ ? _content_opcions_.classList.toggle("display_none") : "";
});

const user = inforUser();

numeros
  ? numeros.addEventListener("change", () => {
      _contenedor_inputs_.innerHTML = "";
      let nums = numeros.value;
      let contentImgs = document.createElement("div");
      let inputs = document.createElement("img");
      inputs.src = `/dinamicas/promocion-tesla/resources/mix_numero_${nums}.jpeg`;
      inputs.id = `img_${nums}`;
      inputs.classList.add("form-control");
      inputs.classList.add("img_mix_num");
      _contenedor_inputs_.appendChild(contentImgs);
      contentImgs.appendChild(inputs);
    })
  : "";

btn_send_info
  ? btn_send_info.addEventListener("click", () => {
      handleSendTesla();
    })
  : "";

function handleSendTesla() {
  if (!nombre.value || !categoria.value || !casino.value || !numeros.value) {
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
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Cedula: "",
    Categoria: categoria.value,
    Casino: casino.value,
    Promocion: promocion,
    Usuario: user.Nombre,
    Numeros: "Mix " + numeros.value,
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
      nombre.value = "";
      casino.value = "";
      categoria.value = "";
      numeros.value = "";
      _contenedor_inputs_.innerHTML = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

btn_envia_observacion
  ? btn_envia_observacion.addEventListener("click", () => {
      handleObs();
    })
  : "";

function handleObs() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

  if (!casino_observacion.value || !descripcion_observacion.value) {
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
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "observaciones",
    Hora: hora,
    Fecha: fecha,
    Casino: casino_observacion.value,
    Observacion: descripcion_observacion.value,
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
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      getDataObs();
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

// function iniciarCicloImagenes() {
//   const imagenes = document.querySelectorAll("#_content_table_result_ img");
//   let indiceActual = 0;
//   const tiempoVisible = 3000;
//   function cambiarImagen() {
//     imagenes[indiceActual].classList.remove("activa");

//     indiceActual = (indiceActual + 1) % imagenes.length;

//     imagenes[indiceActual].classList.add("activa");
//   }

//   if (imagenes.length > 0) {
//     imagenes[0].classList.add("activa");
//   }

//   setInterval(cambiarImagen, tiempoVisible);
// }

// window.addEventListener("DOMContentLoaded", iniciarCicloImagenes);
// _content_table_result_ ? iniciarCicloImagenes() : "";

function getDataObs() {
  const container = document.getElementById("result_observaciones_dinamica");
  if (!container) {
    return;
  }
  container.innerHTML = "Cargando...";

  fetch(`${url}?hoja=observaciones`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "Sin Observaciones.";
        loader.style.display = "none";
        return;
      }

      container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Usuario</th>
                  <th>Hora</th>
                  <th>Fecha</th>
                  <th>Observación</th>
                  <th>Casino</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
               ${data
                 .reverse()
                 .map((registro, i) => {
                   // Formateamos la hora aquí mismo
                   const horaFormateada = new Date(
                     registro.Hora,
                   ).toLocaleTimeString("es-CO", {
                     hour: "2-digit",
                     minute: "2-digit",
                   });

                   return `
            <tr>
              <td>${i + 1}</td>
              <td>${registro.Usuario}</td>
              <td>${horaFormateada}</td> 
              <td>${registro.Fecha.substring(0, 10)}</td>
              <td>${registro.Observacion}</td>
              <td>${registro.Casino}</td>
              ${registro.Estado == "" ? `<td class="pendi_obs">Pendiente</td>` : `<td class="corre_obs">Corregido</td>`}
              
            </tr>
          `;
                 })
                 .join("")}
              </tbody>
            </table>
          </div>
        `;
    });
}
getDataObs();

accion_1
  ? accion_1.addEventListener("click", () => {
      if (typeof window.notificacionVideo === "function") {
        window.notificacionVideo();
      }

      if (typeof window.notificacionOnly === "function") {
        window.notificacionOnly();
      }

      let i = 0;
      showMix(i);
    })
  : "";

function showVideo() {
  _content_table_result_result_
    ? _content_table_result_result_.classList.toggle("display_none")
    : "";
}

_mostrar_mixes_
  ? _mostrar_mixes_.addEventListener("click", () => {
      if (!_ganador_telsa_.value) {
        Swal.fire({
          icon: "warning",
          title: "Elíge un Mix",
        });
        return;
      }
      if (typeof window.notificacionMix === "function") {
        window.notificacionMix();
      }
    })
  : "";

function showMix(num) {
  _content_num_mix_.innerHTML = "";
  let img = document.createElement("img");
  let img_2 = document.createElement("img");
  if (!num || num == 0 || num == "0") {
    img.style.display = "none";
    _content_num_mix_.classList.remove("_mascara_back_");
  } else {
    _content_num_mix_.classList.add("_mascara_back_");
    img.src = `/dinamicas/promocion-tesla/resources/mix_con_numero_${num}.png`;
    img.style.display = "flex";
    img.classList.add("_img_mix_");
    img_2.src = `/dinamicas/promocion-tesla/resources/mix_numero_${num}.png`;
    img_2.style.display = "flex";
    img_2.classList.add("_img_mix_all_");
    _content_table_result_result_.classList.add("display_none");
    _content_num_mix_.appendChild(img);
    _content_num_mix_.appendChild(img_2);
  }
}

function changeBackVideo() {
  _content_video_show_result_
    ? _content_video_show_result_.classList.toggle("_mascara_back_")
    : "";
}
