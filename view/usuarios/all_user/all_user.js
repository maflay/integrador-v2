const u = metodoprueba();
if (u.Nivel == "1") {
  document.querySelector(".content_info_usuarios_all").style.display = "block";
} else {
  location.hash = "#inicio";
}

function getAllUser() {
  const contenedor_usuarios = document.getElementById("content_table_info");
  contenedor_usuarios.innerHTML = `Cargando ...`;
  const inputBuscar = document.getElementById("buscar_usuario");

  fetch(u.Url)
    .then((res) => res.json())
    .then((data) => {
      contenedor_usuarios.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Area</th>
                <th># Cel</th>
                <th>Permisos</th>
                <th>Config</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${registro.Nombre}</td>
                    <td>${registro.UserName}</td>
                    <td>${registro.Correo}</td>
                    <td>${registro.Rol || ""}</td>
                    <td>${registro.Area || ""}</td>
                    <td>${registro.Telefono || ""}</td>
                    <td>${registro.lvl}</td>
                    <td>
                    <div class="content_nuevo_rol">
                    <select class="form-control new_rol" name="permisos" id="new_rol">
                        <option value="">Permisos...</option>
                        <option value="1">Administrador</option>
                        <option value="3">Social Media</option>
                        <option value="2">Permiso Promotor Admin</option>
                        <option value="4">Permiso Promotor</option>
                    </select>
                    <br />
                    <button class="btn btn-primary btn_update_rol"
                    data-nombre="${registro.Nombre}"
                    data-correo="${registro.Correo}"
                    data-Rol="${registro.Rol}"
                    data-Area="${registro.Area}"
                    data-Telefono="${registro.Telefono}"
                    data-lvl="${registro.lvl}"
                    data-cedula="${registro.Cedula}"
                    >Enviar</button>
                    <button data-nombre="${registro.Nombre}"
                     data-u="${registro.UserName}"
                    data-correo="${registro.Correo}"
                    data-Rol="${registro.Rol}"
                    data-Area="${registro.Area}"
                    data-Telefono="${registro.Telefono}"
                    data-lvl="${registro.lvl}"
                    data-u="${registro.UserName}"
                    data-cedula="${registro.Cedula}" title="Opciones" class="btn btn-warning btn_opciones_user"><img src="/resource/engranaje.png" alt="Aladdin"></button>
                    </div>
                    </td>
                  </tr>
                `,
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;
      inputBuscar.style.display = "block";

      const filas = contenedor_usuarios.querySelectorAll("tbody tr");

      filas.forEach((fila) => {
        const nombre_user =
          fila.querySelector("td:nth-child(1)")?.textContent.trim() || "";

        if (nombre_user === u.Nombre) {
          fila.dataset.hiddenUser = "1";
          fila.style.display = "none";
        }
      });

      inputBuscar.addEventListener("keyup", () => {
        const texto = inputBuscar.value.toLowerCase().trim();
        const filas = contenedor_usuarios.querySelectorAll("tbody tr");
        const columnas = [1, 2, 3, 4, 5, 6];

        filas.forEach((fila) => {
          if (fila.dataset.hiddenUser === "1") {
            fila.style.display = "none";
            return;
          }

          const rowText = columnas
            .map(
              (i) =>
                fila
                  .querySelector(`td:nth-child(${i})`)
                  ?.textContent?.toLowerCase() || "",
            )
            .join(" ");

          fila.style.display = rowText.includes(texto) ? "" : "none";
        });
      });

      contenedor_usuarios.addEventListener("click", async (e) => {
        const btnUser = e.target.closest(".btn_opciones_user");
        if (!btnUser) return;

        const tr = btnUser.closest("tr");
        if (!tr) return;

        const modal = document.getElementById("modal_usuario");
        if (!modal) {
          console.error("No existe #modal_usuario en el DOM");
          return;
        }

        modal.style.display = "flex";

        const nombre =
          tr.querySelector("td:nth-child(1)")?.textContent?.trim() || "";
        const correo =
          tr.querySelector("td:nth-child(3)")?.textContent?.trim() || "";
        const rol =
          tr.querySelector("td:nth-child(4)")?.textContent?.trim() || "";
        const area =
          tr.querySelector("td:nth-child(5)")?.textContent?.trim() || "";
        const cel =
          tr.querySelector("td:nth-child(6)")?.textContent?.trim() || "";
        const permisos =
          tr.querySelector("td:nth-child(7)")?.textContent?.trim() || "";
        const cedula = btnUser.dataset.cedula || "";
        const us = btnUser.dataset.u || "";

        // console.log("ABRIENDO MODAL:", {
        //   nombre,
        //   correo,
        //   cedula,
        //   rol,
        //   area,
        //   cel,
        //   permisos,
        //   us,
        // });

        modal.innerHTML = `<div class="modal_content_user">
                              <h3>Informacion del usuario Aladdin</h3>
                              <p id="close_modal_user">&times;</p>
                              <div class="content_input_modal_user">
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Nombre:</strong></p>
                                      <input class="form-control" id="nuevo_nombre_modal" value="${nombre}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Cargo:</strong></p>
                                      <input class="form-control" id="nuevo_rol_modal" value="${rol}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Teléfono:</strong></p>
                                      <input class="form-control" id="nuevo_cel_modal" value="${cel}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Usuario:</strong></p>
                                      <input class="form-control" id="nuevo_us_modal" value="${us}" type="text" disabled>
                                  </div>


                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Email:</strong></p>
                                      <input class="form-control" id="nuevo_correo_modal" value="${correo}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Área:</strong></p>
                                      <input class="form-control" id="nuevo_area_modal" value="${area}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Cédula:</strong></p>
                                      <input class="form-control" disabled id="nuevo_cedula_modal" value="${cedula}" type="text">
                                  </div>
                                  <div class="input_modal_user">
                                  <p style="font-size: 16px"><strong>Permisos:</strong></p>
                                      <input class="form-control" id="nuevo_permisos_modal" value="${permisos}" type="text" disabled>
                                  </div>


                                  <div class="btn_modal_user">
                                      <button id="btn_send_modal" class="btn btn-primary">Enviar</button>
                                  </div>
                              </div>
                          </div>`;

        const btn_send_modal = document.getElementById("btn_send_modal");

        btn_send_modal.addEventListener("click", () => {
          let nuevo_nombre_modal =
            document.getElementById("nuevo_nombre_modal").value;
          let nuevo_correo_modal =
            document.getElementById("nuevo_correo_modal").value;
          let nuevo_rol_modal =
            document.getElementById("nuevo_rol_modal").value;
          let nuevo_area_modal =
            document.getElementById("nuevo_area_modal").value;
          let nuevo_cel_modal =
            document.getElementById("nuevo_cel_modal").value;
          let nuevo_cedula_modal =
            document.getElementById("nuevo_cedula_modal").value;
          let nuevo_us_modal = document.getElementById("nuevo_us_modal").value;

          document.getElementById("loader-user").style.display = "flex";
          fetch(u.Url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
              tipo: "update_usuario",
              match: { Cedula: nuevo_cedula_modal },
              updates: {
                Nombre: nuevo_nombre_modal,
                Cedula: nuevo_cedula_modal,
                Rol: nuevo_rol_modal,
                Area: nuevo_area_modal,
                Telefono: nuevo_cel_modal,
                Correo: nuevo_correo_modal,
                UserName: nuevo_us_modal,
              },
            }),
          })
            .then((r) => r.text())
            .then(() => {
              document.getElementById("loader-user").style.display = "none";
              document.getElementById("modal_usuario").style.display = "none";
              getAllUser();
              Swal.fire({
                icon: "success",
                title: "Usuario Actulizado",
              });
            })
            .catch((error) => {
              document.getElementById("loader-user").style.display = "none";
              Swal.fire({
                icon: "error",
                title: "Error al actulizar el usuario",
                html: `${error}`,
              });
            });
        });

        document
          .getElementById("close_modal_user")
          .addEventListener("click", () => {
            document.getElementById("modal_usuario").style.display = "none";
          });
      });

      // contenedor_usuarios.addEventListener("click", async (e) => {
      //   const btnUser = e.target.closest(".btn_opciones_user");
      //   if (!btnUser) return;

      //   const tr = btnUser.closest("tr");
      //   if (!tr) return;

      //   const nombre =
      //     tr.querySelector("td:nth-child(1)")?.textContent?.trim() || "";
      //   const correo =
      //     tr.querySelector("td:nth-child(3)")?.textContent?.trim() || "";
      //   const rol =
      //     tr.querySelector("td:nth-child(4)")?.textContent?.trim() || "";
      //   const area =
      //     tr.querySelector("td:nth-child(5)")?.textContent?.trim() || "";
      //   const cel =
      //     tr.querySelector("td:nth-child(6)")?.textContent?.trim() || "";
      //   const permisos =
      //     tr.querySelector("td:nth-child(7)")?.textContent?.trim() || "";
      //   const cedula = btnUser.dataset.cedula || "";
      //   const us = btnUser.dataset.u || "";

      //   console.log({ nombre, correo, cedula, rol, area, cel, permisos, us });

      //   // aquí abres modal, Swal, etc.

      //     document
      //     .getElementById("close_modal_user")
      //     .addEventListener("click", () => {
      //       document.getElementById("modal_usuario").style.display = "none";
      //     });
      // });

      contenedor_usuarios.addEventListener("click", async (e) => {
        const btn = e.target.closest(".btn_update_rol");
        if (!btn) return;

        const tr = btn.closest("tr");
        const lvlInput = tr?.querySelector(".new_rol");
        const nuevoNivel = lvlInput?.value?.trim() || "";

        if (!nuevoNivel) {
          Swal.fire({
            icon: "warning",
            title: "Falta el Nivel",
            allowOutsideClick: false,
          });
          return;
        }

        // console.log("Click en:", btn.dataset.cedula);
        // console.log("Fila:", {
        //   Nombre: tr.querySelector("td:nth-child(1)")?.textContent?.trim(),
        //   Correo: tr.querySelector("td:nth-child(2)")?.textContent?.trim(),
        //   Rol: tr.querySelector("td:nth-child(3)")?.textContent?.trim(),
        //   Area: tr.querySelector("td:nth-child(4)")?.textContent?.trim(),
        //   Telefono: tr.querySelector("td:nth-child(5)")?.textContent?.trim(),
        //   lvlActual: tr.querySelector("td:nth-child(6)")?.textContent?.trim(),
        //   lvlNuevo: nuevoNivel,
        // });

        let data = {
          tipo: "update_nivel",
          valor_4: btn.dataset.cedula,
          valor_10: nuevoNivel,
        };
        document.getElementById("loader-user").style.display = "flex";

        fetch(u.Url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then(() => {
            lvlInput.value = "";
            document.getElementById("loader-user").style.display = "none";
            Swal.fire({
              icon: "success",
              title: "Permiso Actualizado",
            });
            getAllUser();
          });
      });
    })
    .catch(() => {
      contenedor_usuarios.innerHTML = `Error al cargar la información, Por favor refresca.`;
    });
}

getAllUser();
