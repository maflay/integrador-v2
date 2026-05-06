window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const casino = document.getElementById("casino");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const btn_send_M_cliente = document.getElementById("btn_send_M_cliente");
const loader = document.getElementById("loader");
const url =
  "https://script.google.com/macros/s/AKfycbwrTzN4zdXA0CqjbyQNq6Pnnph3wHMANSy-pOg3hG2w6XEPDWg_DA3ryzaqhhDEqrNZ/exec";

const user = inforUser();

btn_send_M_cliente.addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  if (!nombre.value || !cedula.value || !casino.value) {
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
    hour12: false,
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Cedula: cedula.value,
    Casino: casino.value,
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
      nombre.value = "";
      cedula.value = "";
      casino.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}


btn_envia_observacion.addEventListener("click", () => {
  handleObsFortune();
});

function handleObsFortune() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

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

  if (!casino_observacion.value || !descripcion_observacion.value) {
    Swal.fire({
      icon: "warning",
      title: "Campo en Blanco",
    });
    return;
  }

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
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      loader.style.display = "none";
      getDataObs();
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

getDataObs();
function getDataObs() {
  const container = document.getElementById("result_observaciones_dinamica");
  container.innerHTML = "Cargando...";
  fetch(`${url}?hoja=observaciones`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `No hay Observaciones...`;
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
