window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const _content_table_cp_ = document.getElementById("_content_table_cp_");
let usuario = "";
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
                            <tr>
                                <td>Primer Penalti</td>
                                <td>$ 100.000</td>
                                <td>${usuario == "" ? `<button data-info=${usuario} class="_btn_envio_cp_ btn btn-primary ">Enviar</button>` : usuario}</td>
                                <td>${usuario == "" ? `<p>Sin registro</p>` : "A09"}</td>
                            </tr>
                            <tr>
                                <td>Primer Gol</td>
                                <td>$ 50.000</td>
                                <td>${usuario == "" ? `<button data-info=${usuario} class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
                                <td>${usuario == "" ? `<p>Sin registro</p>` : "A05"}</td>
                            </tr>
                            <tr>
                                <td>Primera Amarilla</td>
                                <td>$ 40.000</td>
                                <td>${usuario == "" ? `<button data-info=${usuario} class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
                                <td>${usuario == "" ? `<p>Sin registro</p>` : "A07"}</td>
                            </tr>
                            <tr>
                                <td>Primera Falta</td>
                                <td>$ 30.000</td>
                                <td>${usuario == "" ? `<button  data-info=${usuario} class="btn btn-primary _btn_envio_cp_">Enviar</button>` : usuario}</td>
                                <td>${usuario == "" ? `<p>Sin registro</p>` : "A08"}</td>
                            </tr>
                        </tbody>
                    </table>`;

  let _btn_envio_cp_ = document.querySelectorAll("._btn_envio_cp_");
  _btn_envio_cp_.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.dataset.info);
    });
  });
}
