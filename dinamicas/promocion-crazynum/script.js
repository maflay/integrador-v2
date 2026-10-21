window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

function iniciarBusqueda() {
  const numeroInput = document.getElementById("numeroInput");
  const contenedor = document.querySelector(".content_numeros_gene");
  contenedor.innerHTML = "";

  const cantidad = parseInt(numeroInput.value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingresa una cantidad válida");
    return;
  }
  let cargando = document.createElement("p");
  cargando.textContent = "Cargando...";
  contenedor.appendChild(cargando);
  let tiempoTranscurido = 0;
  const duracionTotal = 5000;
  const intervaloVelocidad = 50;

  let elementosCreados = [];

  for (let i = 0; i < cantidad; i++) {
    let valorEntrada = document.createElement("p");
    valorEntrada.classList.add("itemt_show", "display-box");
    valorEntrada.textContent = "0000";
    contenedor.appendChild(valorEntrada);
    elementosCreados.push(valorEntrada);
  }

  const intervalId = setInterval(() => {
    tiempoTranscurido += intervaloVelocidad;

    elementosCreados.forEach((el) => {
      let randomTemp = Math.floor(Math.random() * 9999) + 1;
      el.textContent = String(randomTemp).padStart(4, "0");
    });

    if (tiempoTranscurido >= duracionTotal) {
      clearInterval(intervalId);
      cargando.remove();
      elementosCreados.forEach((el, index) => {
        let randomFinal = Math.floor(Math.random() * 9999) + 1;
        let numeroFormateado = String(randomFinal).padStart(4, "0");

        el.id = numeroFormateado;
        el.textContent = numeroFormateado;

        setTimeout(() => {
          el.classList.add("add_flex");
        }, index * 1000);
      });
    }
  }, intervaloVelocidad);
}

document.getElementById("btn_enviar").addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  let numeroInput = document.getElementById("numeroInput");
  let loader = document.getElementById("loader");
  let nombre = document.getElementById("nombre");
  let cedula = document.getElementById("cedula");
  let casino = document.getElementById("casino");
  let categoria = document.getElementById("categoria");
  let user = inforUser();
  let Promocion = "Núnmeros Locos";
  let url =
    "https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec";
  const elementosNumeros = document.querySelectorAll(".add_flex");

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
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: cedula.value,
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: Array.from(elementosNumeros).map((item) => item.textContent),
    valor_8: "",
    valor_9: Promocion,
    valor_10: user.Nombre,
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
      categoria.value = "";
      casino.value = "";
      numeroInput.value = "";
      const contenedor = document.querySelector(".content_numeros_gene");
      contenedor.innerHTML = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
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

document.getElementById("btn_cedu_search").addEventListener("click", () => {
  if (document.getElementById("val_cedu_search").value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  } else {
    getData();
  }
});

function getData() {
  let result_dia_acumula = document.getElementById("result_dia_acumula");
  let cedula = document.getElementById("val_cedu_search").value;
  let url = `https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec?hoja=dinamica&cedula=${cedula}`;

  result_dia_acumula.innerHTML = `Cargando...`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        let clienteNombre = data[0].Nombre || "CLIENTE";
        let casinoNombre = data[0].Casino || "";

        // Extraer todos los números asociados
        let listaNumeros = [];
        let fechasRegistros = [];

        data.forEach((registro) => {
          let resultadoTexto = String(registro.Resultado || "");
          let numerosArray = resultadoTexto.split(/[.,]/);

          let horaFormateada = "";
          if (registro.Hora) {
            try {
              horaFormateada = new Date(registro.Hora).toLocaleTimeString(
                "es-CO",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );
            } catch (e) {
              horaFormateada = "";
            }
          }
          let fechaStr = registro.Fecha ? registro.Fecha.substring(0, 10) : "";
          if (fechaStr) fechasRegistros.push(`${fechaStr} ${horaFormateada}`);

          numerosArray.forEach((numIndividual) => {
            let numeroLimpio = numIndividual.trim();
            if (numeroLimpio) {
              listaNumeros.push(String(numeroLimpio).padStart(4, "0"));
            }
          });
        });

        let fechaImpresion =
          fechasRegistros[0] || new Date().toLocaleString("es-CO");

        // Construcción de la lista de números para la tirilla
        let numerosHTML = listaNumeros
          .map(
            (num, idx) => `
            <div class="tirilla-item">
              <span>#${idx + 1}</span>
              <strong class="tirilla-num">${num}</strong>
            </div>
          `,
          )
          .join("");

        // Filas para la vista normal en pantalla (Tabla)
        let filasTablaHTML = listaNumeros
          .map(
            (num, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${clienteNombre}</td>
              <td>${fechaImpresion}</td>
              <td><strong>${num}</strong></td>
              <td>${casinoNombre}</td>
            </tr>
          `,
          )
          .join("");

        // Guardamos los datos estructurados para la impresión en una propiedad global
        window.datosTirillaActual = {
          nombre: clienteNombre,
          cedula: cedula,
          casino: casinoNombre,
          fecha: fechaImpresion,
          numeros: listaNumeros,
        };

        result_dia_acumula.innerHTML = `
          <div style="margin-bottom: 10px; text-align: right;">
            <button onclick="imprimirResultadosPOS()" class="btn-imprimir" title="Imprimir Tirilla">
              <img id="_excel_search_" src="/resource/impresion.png" alt="Imprimir">
            </button>
          </div>
          <div class="table-result table-scrolld table_all_data">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Número</th>
                  <th>Casino</th>
                </tr>
              </thead>
              <tbody>
                ${filasTablaHTML}
              </tbody>
            </table>
          </div>
        `;
      } else {
        console.log("No se encontró ninguna coincidencia.");
        result_dia_acumula.innerHTML = `No se encontró ninguna coincidencia.`;

        Swal.fire({
          icon: "error",
          title: `Error en la verificación.`,
          text: `No se encontró ninguna coincidencia.`,
        });
      }
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      result_dia_acumula.innerHTML = `Error al cargar los datos.`;
    });
}

function imprimirResultadosPOS() {
  let datos = window.datosTirillaActual;
  if (!datos) {
    Swal.fire({ icon: "warning", title: "No hay datos para imprimir" });
    return;
  }

  let contenedor = document.getElementById("print-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "print-container";
    document.body.appendChild(contenedor);
  }

  let numerosTirilla = datos.numeros
    .map(
      (num, idx) => `
        <div class="pos-row">
          <span>NÚMERO ${idx + 1}:</span>
          <span class="pos-num">${num}</span>
        </div>
      `,
    )
    .join("");

  contenedor.innerHTML = `
        <div class="ticket-pos">
            <div class="pos-header">
                <h2>CASINOS ALADDIN</h2>
                <p><strong>PROMO: NÚMEROS LOCOS</strong></p>
                <p>CASINO: ${datos.casino || "GENERAL"}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-info">
                <p><strong>CLIENTE:</strong> ${datos.nombre}</p>
                <p><strong>CÉDULA:</strong> ${datos.cedula}</p>
                <p><strong>FECHA:</strong> ${datos.fecha}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-title">NÚMEROS REGISTRADOS</div>
            <div class="pos-numeros">
                ${numerosTirilla}
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-footer">
                <p>TOTAL JUGADAS: ${datos.numeros.length}</p>
                <p>¡Gracias por participar!</p>
                <p>Conserve este tiquete</p>
            </div>
        </div>
    `;

  window.print();

  setTimeout(() => {
    contenedor.innerHTML = "";
  }, 1000);
}

document
  .getElementById("btn_envia_observacion")
  .addEventListener("click", () => {
    handleSenObs();
  });

function handleSenObs() {
  let loader = document.getElementById("loader");
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );
  let user = inforUser();
  let url = `https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec`;
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

  if (casino_observacion.value == "" || descripcion_observacion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casino_observacion.value,
    valor_4: descripcion_observacion.value,
    valor_5: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(`${url}`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
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