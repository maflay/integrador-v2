// script de cada vista
let objUser = getCookie(CS_KEY);
let username = objUser ? objUser.Nombre : "Sin usuario";
document.getElementById("username_dinamica").textContent =
  "Usuario: " + username;
//   html para el usuario
//<span id="username_dinamica" class="username_dinamica"></span>;

const selectElem = document.querySelector("select");
const startBtn = document.querySelector("button");
const divElem = document.querySelector(".content_item>div");

startBtn.addEventListener("click", () => {
  divElem.classList.remove("last_posicion");

  if (startBtn.textContent === "Start animation") {
    divElem.style.animationName = "move-right";
    divElem.style.animationTimingFunction = selectElem.value;
    divElem.style.animationFillMode = "forwards";
    startBtn.textContent = "Stop animation";

    setTimeout(() => {
      divElem.style.animationName = "move-top";
      divElem.style.animationTimingFunction = selectElem.value;
      divElem.style.animationFillMode = "forwards";
    }, 3000);

    setTimeout(() => {
      divElem.style.animationName = "unset";
      startBtn.textContent = "Start animation";
      divElem.classList.add("last_posicion");
    }, 6000);
  } else {
    divElem.style.animationName = "unset";
    startBtn.textContent = "Start animation";
  }
});

selectElem.addEventListener("change", () => {
  divElem.style.animationTimingFunction = selectElem.value;
});

const barra = document.getElementById("test_barra_inclinada");
document.getElementById("btnStart").addEventListener("click", () => {
  barra.classList.remove("animar-inclinacion");
  void barra.offsetWidth; // reflow para reiniciar animación
  barra.classList.add("animar-inclinacion");
});

function pruebaAnimacion() {
  divElem.style.animationName = "move-right";
  divElem.style.animationTimingFunction = selectElem.value;
  divElem.style.animationFillMode = "forwards";
  startBtn.textContent = "Stop animation";

  setTimeout(() => {
    divElem.style.animationName = "move-top";
    divElem.style.animationTimingFunction = selectElem.value;
    divElem.style.animationFillMode = "forwards";
  }, 3000);

  setTimeout(() => {
    divElem.style.animationName = "unset";
    startBtn.textContent = "Start animation";
    divElem.classList.add("last_posicion");
  }, 6000);

  barra.classList.remove("animar-inclinacion");
  void barra.offsetWidth; // reflow para reiniciar animación
  barra.classList.add("animar-inclinacion");
}

pruebaAnimacion();

const entrevista = document.getElementById("usuario_entrevista");
let urlEntre =
  "https://script.google.com/macros/s/AKfycbymfWU1aFFBRp9_s0g_mxNY9LycxMCnS3zIzZT7rfXHTu2al7OkTaUK1Oj-JTxKZ8Wt/exec";

const URL = urlEntre;
const lista = document.getElementById("listaEntrevistas");
const detalle = document.getElementById("detalleEntrevista");
let registros = []; // cache de lo recibido
let seleccionadoId = null; // id del seleccionado (si lo tienes) o índice

// Helper: convierte link de Drive fileId -> link embebible
function driveView(urlOG) {
  // Si ya viene en formato "uc?export=view&id=..." lo devuelves igual
  // o intenta extraer el id si te pasan /file/d/{id}/view
  const m = urlOG.match(/\/d\/([^/]+)\//);
  if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  return urlOG;
}
lista.innerHTML = "Cargando...";

async function cargarLista() {
  const res = await fetch(URL); // GET que devuelve array de objetos
  registros = await res.json();
console.log(registros);
  // Render list
  lista.innerHTML = registros
    .reverse()
    .map((r, i) => {
      const fechaE = r.Fecha;
      const id = r.Id || r.id || i; // usa tu campo real de ID si existe
      const titulo = r.Nombre || r.name || "(sin nombre)";
      const subt = `${r.Cedula ?? ""} • ${fechaE ?? ""}`;
      return `
      <div class="item" data-id="${id}" data-index="${i}">
        <div><strong>${titulo}</strong></div>
        <small>${subt}</small>
      </div>
    `;
    })
    .join("");
}

// Event delegation: click en cualquier item
lista.addEventListener("click", (e) => {
  const item = e.target.closest(".item");
  if (!item) return;

  // Quitar selección previa
  const prev = lista.querySelector(".item.selected");
  if (prev) prev.classList.remove("selected");
  item.classList.add("selected");

  // Recuperar el registro
  const idx = Number(item.dataset.index); // o usa data-id si prefieres
  const reg = registros[idx];
  seleccionadoId = item.dataset.id;

  // Render detalle
  detalle.innerHTML = renderDetalle(reg);
});

// Cómo pintas el detalle (ajusta campos a tu payload real)
function renderDetalle(r) {
  // Manejo de foto si viene de Drive (campo "Foto")
  const foto = r.Foto ? driveView(r.Foto) : "";
  console.log(foto);
  const fechaE = r.Fecha_de_Nacimiento;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;">
    <h2 style="margin:0 0 8px;">Nuevo registro creado</h2>
    <p>Se registró una nueva solicitud/invitación.</p>
    <table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr><td><b>Fecha: </b></td><td>${safe(r.Fecha)}</td></tr>
      <tr><td><b>Hora: </b></td><td>${safe(r.Hora)}</td></tr>
      <tr><td><b>Nombre: </b></td><td>${safe(r.Nombre)}</td></tr>
      <tr><td><b>Cédula: </b></td><td>${safe(r.Cedula)}</td></tr>
      <tr><td><b>Fecha de Nacimiento: </b></td><td>${safe(r.Fecha_nac)}</td></tr>
      <tr><td><b>Local: </b></td><td>${safe(r.Local)}</td></tr>
      <tr><td><b>Correo: </b></td><td>${safe(r.Correo)}</td></tr>
      <tr><td><b>Acompañante: </b></td><td>${safe(r.Acompanante)}</td></tr>

      ${r.Invitado_1 != "" ? `
            <tr><td style="padding-top: 10px;"><b>Invitado 1 :</b></td><td style="padding-top: 10px;">${safe(r.Invitado_1)}</td></tr>
        <tr><td><b>Nombre :</b></td><td>${safe(r.Nombre_inv_1)}</td></tr>
      <tr><td><b>Parentesco :</b></td><td>${safe(r.Parentesco_inv_1)}</td></tr>
      <tr><td><b>Tipo de Identificación :</b></td><td>${safe(r.Tipo_identificacion_inv_1)}</td></tr>
      <tr><td><b># de Identificación :</b></td><td>${safe(r.Num_identificacion_inv_1)}</td></tr>
      <tr><td><b>Pais de Residencia :</b></td><td>${safe(r.Pais_resi_inv_1)}</td></tr>
      <tr><td><b>Ciudad de Residencia :</b></td><td>${safe(r.Ciudad_resi_inv_1)}</td></tr>
      <tr><td><b>Fecha de Visita :</b></td><td>${safe(r.Fecha_visita_inv_1)}</td></tr>
      <tr><td><b>Número de Contacto :</b></td><td>${safe(r.Num_contacto_inv_1)}</td></tr>
      <tr><td><b>Detalle del Invitado :</b></td><td>${safe(r.descr_inv_1)}</td></tr>
        ` : ""}
        ${r.Invitado_2 != "" ? `
            <tr><td style="padding-top: 10px;"><b>Invitado 2 :</b></td><td style="padding-top: 10px;">${safe(r.Invitado_2)}</td></tr>
        <tr><td><b>Nombre :</b></td><td>${safe(r.Nombre_inv_2)}</td></tr>
      <tr><td><b>Parentesco :</b></td><td>${safe(r.Parentesco_inv_2)}</td></tr>
      <tr><td><b>Tipo de Identificación :</b></td><td>${safe(r.Tipo_identificacion_inv_2)}</td></tr>
      <tr><td><b># de Identificación :</b></td><td>${safe(r.Num_identificacion_inv_2)}</td></tr>
      <tr><td><b>Pais de Residencia :</b></td><td>${safe(r.Pais_resi_inv_2)}</td></tr>
      <tr><td><b>Ciudad de Residencia :</b></td><td>${safe(r.Ciudad_resi_inv_2)}</td></tr>
      <tr><td><b>Fecha de Visita :</b></td><td>${safe(r.Fecha_visita_inv_2)}</td></tr>
      <tr><td><b>Número de Contacto :</b></td><td>${safe(r.Num_contacto_inv_2)}</td></tr>
      <tr><td><b>Detalle del Invitado :</b></td><td>${safe(r.descr_inv_2)}</td></tr>
        ` : ""}
            ${r.Invitado_3 != "" ? `
            <tr><td style="padding-top: 10px;"><b>Invitado 3 :</b></td><td style="padding-top: 10px;">${safe(r.Invitado_3)}</td></tr>
        <tr><td><b>Nombre :</b></td><td>${safe(r.Nombre_inv_3)}</td></tr>
      <tr><td><b>Parentesco :</b></td><td>${safe(r.Parentesco_inv_3)}</td></tr>
      <tr><td><b>Tipo de Identificación :</b></td><td>${safe(r.Tipo_identificacion_inv_3)}</td></tr>
      <tr><td><b># de Identificación :</b></td><td>${safe(r.Num_identificacion_inv_3)}</td></tr>
      <tr><td><b>Pais de Residencia :</b></td><td>${safe(r.Pais_resi_inv_3)}</td></tr>
      <tr><td><b>Ciudad de Residencia :</b></td><td>${safe(r.Ciudad_resi_inv_3)}</td></tr>
      <tr><td><b>Fecha de Visita :</b></td><td>${safe(r.Fecha_visita_inv_3)}</td></tr>
      <tr><td><b>Número de Contacto :</b></td><td>${safe(r.Num_contacto_inv_3)}</td></tr>
      <tr><td><b>Detalle del Invitado :</b></td><td>${safe(r.descr_inv_3)}</td></tr>
        ` : ""}
         ${r.Invitado_4 != "" ? `
            <tr><td style="padding-top: 10px;"><b>Invitado 4 :</b></td><td style="padding-top: 10px;">${safe(r.Invitado_4)}</td></tr>
        <tr><td><b>Nombre :</b></td><td>${safe(r.Nombre_inv_4)}</td></tr>
      <tr><td><b>Parentesco :</b></td><td>${safe(r.Parentesco_inv_4)}</td></tr>
      <tr><td><b>Tipo de Identificación :</b></td><td>${safe(r.Tipo_identificacion_inv_4)}</td></tr>
      <tr><td><b># de Identificación :</b></td><td>${safe(r.Num_identificacion_inv_4)}</td></tr>
      <tr><td><b>Pais de Residencia :</b></td><td>${safe(r.Pais_resi_inv_4)}</td></tr>
      <tr><td><b>Ciudad de Residencia :</b></td><td>${safe(r.Ciudad_resi_inv_4)}</td></tr>
      <tr><td><b>Fecha de Visita :</b></td><td>${safe(r.Fecha_visita_inv_4)}</td></tr>
      <tr><td><b>Número de Contacto :</b></td><td>${safe(r.Num_contacto_inv_4)}</td></tr>
      <tr><td><b>Detalle del Invitado :</b></td><td>${safe(r.descr_inv_4)}</td></tr>
        ` : ""}
        
             ${r.Invitado_5 != "" ? `
            <tr><td style="padding-top: 10px;"><b>Invitado 5 :</b></td><td style="padding-top: 10px;">${safe(r.Invitado_5)}</td></tr>
        <tr><td><b>Nombre :</b></td><td>${safe(r.Nombre_inv_5)}</td></tr>
      <tr><td><b>Parentesco :</b></td><td>${safe(r.Parentesco_inv_5)}</td></tr>
      <tr><td><b>Tipo de Identificación :</b></td><td>${safe(r.Tipo_identificacion_inv_5)}</td></tr>
      <tr><td><b># de Identificación :</b></td><td>${safe(r.Num_identificacion_inv_5)}</td></tr>
      <tr><td><b>Pais de Residencia :</b></td><td>${safe(r.Pais_resi_inv_5)}</td></tr>
      <tr><td><b>Ciudad de Residencia :</b></td><td>${safe(r.Ciudad_resi_inv_5)}</td></tr>
      <tr><td><b>Fecha de Visita :</b></td><td>${safe(r.Fecha_visita_inv_5)}</td></tr>
      <tr><td><b>Número de Contacto :</b></td><td>${safe(r.Num_contacto_inv_5)}</td></tr>
      <tr><td><b>Detalle del Invitado :</b></td><td>${safe(r.descr_inv_5)}</td></tr>
        ` : ""}
         

    </table>
    <hr style="margin:14px 0;border:none;border-top:1px solid #eee;">
    <small>Enviado a través del sistema del área de comunicaciones.</small>
  </div>
  `;
}

// <div style="margin-top:10px;display:flex;gap:8px;">
//   <button class="btn btn-primary" onclick="hacerAlgoCon('${seleccionadoId}')">Acción</button>
//   </div>
// <button onclick="verSolo(${registros.indexOf(r)})">Ver JSON</button>
// Ejemplos de acciones
function verSolo(idx) {
  alert(JSON.stringify(registros[idx], null, 2));
}

function hacerAlgoCon(id) {
  console.log("Hacer algo con ID:", id);
}

// inicia
cargarLista();

// handletestenvio();

function handletestenvio(){

  let url = "https://script.google.com/macros/s/AKfycbxIZoczKZhfIOQzonJuAyClMeW1mmtxvK4VH2MoSawYWD781a4alHH5WlvosS7ItMXZ/exec";

  let data  ={
    tipo: "envio_1",
    valor_1: "1134564675",
    valor_2: "Juan Felipe Donneys",
    valor_3: "Increible"
  }
  console.log(data);

  fetch(url,{
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  }).then((res) => res.text())
  .then(()=>{
    console.log("entro");
  })
}
