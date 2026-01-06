const u = metodoprueba();
console.log(u.Nivel);
if (u.Nivel != "1" && u.Nivel != "2") {
  console.log("entro");
  location.hash = "#inicio";
} else {
  document.querySelector(".content_info_usuarios").style.display = "flex";
}

function getAllUser() {
  const contenedor_usuarios = document.getElementById("content_table_info");
  const url =
    "https://script.google.com/macros/s/AKfycbwoQFpBcbOBhNbIvqo6UPlv9oV1H8IHKJMlonFOiK1T9cW6J0I8uZHAe5bPps4NxdmD3Q/exec";
  contenedor_usuarios.innerHTML = `Cargando ...`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      contenedor_usuarios.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Area</th>
                <th># Cel</th>
                <th style="display: none;">Nivel</th>
              </tr>
            </thead>
            <tbody>
            ${[...data]
              .reverse()
              .map(
                (registro, i) =>
                  `<tr>
                    <td>${registro.Nombre}</td>
                    <td>${registro.Correo}</td>
                    <td>${registro.Rol || ""}</td>
                    <td>${registro.Area || ""}</td>
                    <td>${registro.Telefono || ""}</td>
                    <td style="display: none;">${registro.lvl}</td>
                  </tr>
                `
              )
              .join("")}
            </tbody>
          </table>
        </div>
      `;

      const filas = contenedor_usuarios.querySelectorAll("tbody tr");

      filas.forEach((fila) => {
        const celdaLvl = fila.querySelector("td:nth-child(6)");
        if (!celdaLvl) return;

        const lvl = celdaLvl.textContent.trim();

        if (lvl !== "2" && lvl !== "4") {
          fila.style.display = "none";
        }
      });
    })
    .catch(() => {
      contenedor_usuarios.innerHTML = `Error al cargar la informaión, Por favor refresca.`;
    });
}

getAllUser();
