function handleSendInfo() {
  const valor1 = document.getElementById("input1").value;
  const valor2 = document.getElementById("input2").value;
  const valor3 = document.getElementById("input3").value;

  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const casino = document.getElementById("casino").value;
  const cedula = document.getElementById("cedula").value;
  const loader = document.getElementById("loader");

  const val1 = parseInt(valor1);
  const val2 = parseInt(valor2);
  const val3 = parseInt(valor3);

  const lastposicion = posicionTirada3;

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

  if (categoria == "ADICIONAL") {
    loader.style.display = "flex";
    const dataAd = {
      tipo: "dinamica",
      hora,
      fecha,
      nombre,
      cedula,
      casino,
      categoria,
      resultado: lastposicion,
      valBono: "0",
      promocion,
    };

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(dataAd),
    })
      .then((response) => response.text())
      .then(() => {
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "success",
            title: "Envió Exitoso.",
            text: `El envió de la información con ${categoria} fue exitoso.`,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }, 2000);
      });
    return;
  }

  const valBono = "no hay";

  if (nombre == "" || categoria == "" || casino == "" || cedula == "") {
    Swal.fire({
      icon: "warning",
      title: `Campos vacios.`,
      text: `Por favor, completa toda la información`,
      confirmButtonColor: "#a13b22",
      allowOutsideClick: false,
    });
    return;
  }

  const data = {
    tipo: "dinamica",
    hora,
    fecha,
    nombre,
    cedula,
    casino,
    categoria,
    resultado: lastposicion,
    valBono,
    promocion,
  };

  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaTren");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosTren", JSON.stringify([]));
    localStorage.setItem("fechaTren", hoy);
  }

  loader.style.display = "flex";
  let registrosTren = JSON.parse(localStorage.getItem("registrosTren")) || [];
  registrosTren.push(data);
  localStorage.setItem("registrosTren", JSON.stringify(registrosTren));

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envió Exitoso.",
          text: `El envió de la información fue exitoso.`,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }, 2000);
    })
    .catch((error) => {
      console.warn(error, "error");
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la información. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
        allowOutsideClick: false,
      });
    });
}

function HandleSecondSubmit() {
  const casinoModal = document.getElementById("casino-modal-tren");
  const categoriaModal = document.getElementById("categoria-modal-tren");
  const cedulaModal = document.getElementById("cedula-modal-tren");
  const nombreModal = document.getElementById("nombre-modal-tren");
  const horaModal = document.getElementById("hora-modal-tren");
  const fechaModal = document.getElementById("fecha-modal-tren");
  const posicionModal = document.getElementById("posicion-modal-tren");
  const bonoModal = document.getElementById("bono-modal-tren");

  const valCasinoModal = casinoModal.value.trim();
  const valCategoriaModal = categoriaModal.value.trim();
  const valCedulaModal = cedulaModal.value.trim();
  const valNombreModal = nombreModal.value.trim();
  const valHoraModal = horaModal.value.trim();
  const valFechaModal = fechaModal.value.trim();
  const valPosicionModal = posicionModal.value.trim();
  const valBonoModal = bonoModal.value.trim();

  const loader = document.getElementById("loader");

  const data = {
    tipo: "dinamica",
    casino: valCasinoModal,
    categoria: valCategoriaModal,
    cedula: valCedulaModal,
    nombre: valNombreModal,
    hora: valHoraModal,
    fecha: valFechaModal,
    resultado: valPosicionModal,
    valBono: valBonoModal,
    promocion,
  };

  loader.style.display = "flex";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casinoModal.value = "";
      categoriaModal.value = "";
      cedulaModal.value = "";
      nombreModal.value = "";
      horaModal.value = "";
      fechaModal.value = "";
      bonoModal.value = "";
      posicionModal.value = "";

      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "EXITO",
          text: "El envio de la información fue exitoso.",
          confirmButtonColor: "#dc3545",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        }, 1000);
      });
    })
    .catch((error) => {});
}

function HandleObservacionSend() {
  const valCasino = document.getElementById("casino-modal-observacion");
  const valObservacion = document.getElementById("casino-modal-descripcion");
  const loader = document.getElementById("loader");

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

  const valCasinoObs = valCasino.value.trim();
  const valObservacionObs = valObservacion.value.trim();

  if (!valCasinoObs || !valObservacionObs) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los campos.",
      confirmButtonColor: "#dc3545",
      allowOutsideClick: false,
    });
    return;
  }

  loader.style.display = "flex";

  const data = {
    tipo: "observacion",
    hora,
    fecha,
    casino: valCasinoObs,
    observacion: valObservacionObs,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      valCasino.value = "";
      valObservacion.value = "";

      loader.style.display = "none";

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El envío de la información fue exitoso.",
        confirmButtonColor: "#dc3545",
        allowOutsideClick: false,
      });
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la información.",
        confirmButtonColor: "#dc3545",
        allowOutsideClick: false,
      });
    });
}


function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos-registros-tren");
  const registros = JSON.parse(localStorage.getItem("registrosTren")) || [];
  const casinoNumero = document.getElementById("casino-numero-tren");
  const valInfo = document.getElementById("Info-tren");
  const valCasino = document.getElementById("casino").value;
  const filtrados = registros.filter((item) => item.casino === valCasino);
  casinoNumero.innerHTML = valCasino;

  if (filtrados.length === 0) {
    ultimosRegistros.innerHTML = `<p class="color-gray">No hay registros para este casino.</p>`;
    valInfo.innerHTML = ``;
  } else {
    valInfo.innerHTML = `<small class="color-gray">* Estos registros son temporales (se reinicia a las 00:00), por favor tener en
                          cuenta.</small>`;
    ultimosRegistros.innerHTML = `
  <div class="table-result-tren">
    <table class="styled-table-tren">
      <thead>
        <tr>
          <th># Registro</th>
          <th>Casino</th>
          <th>Categoria</th>
          <th>Nombre</th>
          <th>Cedula</th>
          <th>Bono</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        ${filtrados
          .map(
            (registro, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${registro.casino}</td>
                <td>${registro.categoria}</td>
                <td>${registro.nombre}</td>
                <td>${registro.cedula}</td>
                <td>${registro.valBono}</td>
                <td>${registro.fecha} ${registro.hora}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
  }
}