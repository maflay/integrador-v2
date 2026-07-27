window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const loader = document.getElementById("loader");
const _contentn_new_formadata_ = document.getElementById(
  "_contentn_new_formadata_",
);
const _btn_crear_new_promo_ = document.getElementById("_btn_crear_new_promo_");
const _btn_send_new_promo_ = document.getElementById("_btn_send_new_promo_");
const user = inforUser();
const url =
  "https://script.google.com/macros/s/AKfycbwv0Tvqm2DAHfXdrpihRX3mG6KeFSxc4L09azT-rBLy6rddq-31DC3PkJgiEKusKBrLFQ/exec";

if (user.Nivel === 1 || user.Nivel === 2) {
  _contentn_new_formadata_.style.display = "flex";
}

_btn_crear_new_promo_.addEventListener("click", () => {
  handleSendNewPromo();
});

function handleSendNewPromo() {
  let _new_promo_ = document.getElementById("_new_promo_");
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  if (!_new_promo_.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "nom_din",
    Hora: hora,
    Fecha: fecha,
    Nom_dinamica: _new_promo_.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(`${url}?hoja=nom_din`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      _new_promo_.value = "";
      getDataPromo();
      Swal.fire({
        icon: "success",
        title: "Promoción creada",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en la Creación",
        html: "Ha ocurrido un error en él envió, comunícate con el área responsable.",
      });
    });
}

_btn_send_new_promo_.addEventListener("click", () => {
  handleSendDinamico();
});

function handleSendDinamico() {
  let nombre_form = document.getElementById("nombre_form");
  let _promo_crea_ = document.getElementById("_promo_crea_");
  let casino_form = document.getElementById("casino_form");
  let categoria_form = document.getElementById("categoria_form");
  let _new_num_bono_form_ = document.getElementById("_new_num_bono_form_");
  let _new_resultado_form_ = document.getElementById("_new_resultado_form_");

  if (
    !nombre_form.value ||
    !_promo_crea_.value ||
    !casino_form.value ||
    !categoria_form.value
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
    hour12: true,
  });

  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre_form.value,
    Casino: casino_form.value,
    Categoria: categoria_form.value,
    Resultado: _new_resultado_form_.value,
    Bono: _new_num_bono_form_.value,
    Promocion: _promo_crea_.value,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";

  fetch(`${url}?hoja=dinamica`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      nombre_form.value = "";
      casino_form.value = "";
      categoria_form.value = "";
      _new_resultado_form_.value = "";
      _new_num_bono_form_.value = "";
      _promo_crea_.value = "";
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
        html: "Ha ocurrido un error en él envió, comunícate con el área responsable.",
      });
    });
}
getDataPromo();
function getDataPromo() {
  const select = document.getElementById("_promo_crea_");
  select.innerHTML = '<option value="">Cargando...</option>';
  fetch(`${url}?hoja=nom_din`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        select.innerHTML = '<option value="">Sin promociones</option>';
        return;
      }
      select.innerHTML = '<option value="">Selecciona una promoción</option>';
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.Nom_dinamica;
        option.textContent = item.Nom_dinamica;
        select.appendChild(option);
      });
    });
}
