window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const equipo_local = document.getElementById("equipo_local");
const equipo_visitante = document.getElementById("equipo_visitante");
const _img_equipo_local_ = document.getElementById("_img_equipo_local_");
const _img_equipo_visitante_ = document.getElementById(
  "_img_equipo_visitante_",
);
const btn_validar_marcador = document.getElementById("btn_validar_marcador");
const _content_table_cp_ = document.getElementById("_content_table_cp_");
let usuario = "";

equipo_local.addEventListener("change", () => {
  if (equipo_local.value) {
    _img_equipo_local_.src = `/eventos/resources/${equipo_local.value}.png`;
  } else {
    _img_equipo_local_.src = "/eventos/resources/bandera_adivina.png";
  }
});

equipo_visitante.addEventListener("change", () => {
  if (equipo_local.value) {
    _img_equipo_visitante_.src = `/eventos/resources/${equipo_visitante.value}.png`;
  } else {
    _img_equipo_visitante_.src = "/eventos/resources/bandera_adivina.png";
  }
});

chargeInfo();
function chargeInfo() {
  _content_table_cp_.innerHTML = `<table class="styled-table-rally">
    <thead>
        <tr>
            <th>Acción</th>
            <th>Premio</th>
            <th>Ganador</th>
            <th>Casino</th>
        </tr>
    </thead>
    <tbody>
        <tr data-accion="Primer Penalti" data-premio="$ 100.000">
            <td>Primer Penalti</td>
            <td>$ 100.000</td>
            <td>${usuario === "" ? `<button class="_btn_envio_cp_ btn btn-primary">Enviar</button>` : usuario}</td>
            <td>${usuario === "" ? `<p>Sin registro</p>` : "A09"}</td>
        </tr>
        <tr data-accion="Primer Gol" data-premio="$ 50.000">
            <td>Primer Gol</td>
            <td>$ 50.000</td>
            <td>${usuario === "" ? `<button class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
            <td>${usuario === "" ? `<p>Sin registro</p>` : "A05"}</td>
        </tr>
        <tr data-accion="Primera Amarilla" data-premio="$ 40.000">
            <td>Primera Amarilla</td>
            <td>$ 40.000</td>
            <td>${usuario === "" ? `<button class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
            <td>${usuario === "" ? `<p>Sin registro</p>` : "A07"}</td>
        </tr>
        <tr data-accion="Primera Falta" data-premio="$ 30.000">
            <td>Primera Falta</td>
            <td>$ 30.000</td>
            <td>${usuario === "" ? `<button class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
            <td>${usuario === "" ? `<p>Sin registro</p>` : "A08"}</td>
        </tr>
    </tbody>
</table>`;

  _content_table_cp_.addEventListener("click", (event) => {
    if (event.target.classList.contains("_btn_envio_cp_")) {
      const fila = event.target.closest("tr");

      const datosData = {
        accion: fila.dataset.accion,
        premio: fila.dataset.premio,
      };

      const celdas = fila.querySelectorAll("td");
      const datosTexto = {
        accion: celdas[0].innerText,
        premio: celdas[1].innerText,
        ganador: celdas[2].innerText,
        casino: celdas[3].innerText,
      };

      console.log("celdas:", celdas);
      console.log("Datos desde atributos data-:", datosData);
      console.log("Datos desde el texto de la fila:", datosTexto);
    }
  });
}
