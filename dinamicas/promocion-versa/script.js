window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

document.getElementById("send_prim").addEventListener("click", () => {
  handleSendInfo();
});

let loader = document.getElementById("loader");
let url = "https://script.google.com/macros/s/AKfycbx_Rp1dLKoR4nZ7HhtGK93_ges2_o8gB98Y6PGN2pIIO_QcTIVvETW1_cSG7sW6EgJ4EA/exec";

function handleSendInfo() {
  let nombre = document.getElementById("nombre");
  let cedula = document.getElementById("cedula");
  let casino = document.getElementById("casino");
  let categoria = document.getElementById("categoria");
  let puntaje = document.getElementById("puntaje");
  let bono = document.getElementById("bono");
  let Promocion = "Sorteo VERSA";
  let user = inforUser();

  if (
    nombre.value == "" ||
    cedula.value == "" ||
    casino.value == "" ||
    categoria.value == "" ||
    puntaje.value == ""
  ) {
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
    Categoria: categoria.value,
    Puntaje: puntaje.value,
    Bono: bono.value,
    Promo: Promocion,
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
      nombre.value = "";
      cedula.value = "";
      casino.value = "";
      categoria.value = "";
      puntaje.value = "";
      bono.value = "";
      getData();
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: error,
        title: "Error en el envio",
      });
    });
}

getData();
function getData(){
    let container = document.getElementById("result_dia_acumula");
        container.innerHTML = `Cargando...`;

    fetch(`${url}?hoja=dinamica`)
    .then((res) => res.json())
    .then((data) => {
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
                      registro.Nombre ? registro.Nombre : ""
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
                      registro.Casino 
                    }</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;


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
              if (tdBono) tdpunt.innerHTML = escapeHtml(Number(puntaje) + Number(tdpunt.textContent));
            }


            const registro = JSON.parse(btn.dataset.info);
            const data = {
              tipo: "update_puntaje",
              match: { Cedula: registro.Cedula, Casino: registro.Casino },
              puntaje: Number(puntaje) + Number(tdpunt.textContent),
            };

            // let horaFormateada = new Date(registro.Hora).toLocaleTimeString(
            //     "es-CO",
            //     {
            //       hour: "2-digit",
            //       minute: "2-digit",
            //     },
            //   );

            // let bodyPut = {
            //   Hora: horaFormateada,
            //   Fecha: registro.Fecha.substring(0, 10),
            //   Nombre: registro.Nombre,
            //   Cedula: registro.Cedula,
            //   Casino: registro.Casino,
            //   Categoria: registro.Categoria,
            //   Puntaje: puntaje,
            //   Promo: registro.Promo,
            //   Usuario: registro.Usuario,
            // };

        console.log(data);

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
}