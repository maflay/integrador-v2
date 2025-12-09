window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const casino = document.getElementById("casino");
  const cedula = document.getElementById("cedula");
  const nombre = document.getElementById("nombre");
  const num_tabla = document.getElementById("num_tabla");
  const tipo_bingo = document.getElementById("tipo_bingo");
  const _btn_submit = document.getElementById("_btn_submit");
  const loader = document.getElementById("loader");
  const tipo_sorteo = document.getElementById("tipo_sorteo");

  const user = inforUser();

  const url =
    "https://script.google.com/macros/s/AKfycbx4Ze2G726aokyBHWoEUCARExPLOfbXWW9BSXjzAKwwfCGcQdzJrHlrzlVYJK7JqxA2/exec";

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  _btn_submit.addEventListener("click", () => {
    handleSubmit();
  });

  function handleSubmit() {
    let casino_val = casino.value;
    let cedula_val = cedula.value;
    let nombre_val = nombre.value;
    let num_tabla_val = num_tabla.value;
    let tipo_bingo_val = tipo_bingo.value;
    let tipo_sorteo_val = tipo_sorteo.value;

    if (
      casino_val == "" ||
      nombre_val == "" ||
      num_tabla_val == "" ||
      tipo_bingo_val == "" ||
      tipo_sorteo_val == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
        html: "Para poder enviar el formulario, debes completar toda la información.",
      });
      return;
    }

    let data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre_val,
      valor_4: cedula_val,
      valor_5: casino_val,
      valor_6: num_tabla_val,
      valor_7: tipo_bingo_val,
      valor_8: tipo_sorteo_val,
      valor_9: user.Nombre,
    };

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        casino.value = "";
        cedula.value = "";
        nombre.value = "";
        num_tabla.value = "";
        tipo_bingo.value = "";

        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "success",
            title: "Envió Exitoso",
            html: "La información se envió de forma correcta.",
          });
        }, 2000);
      })
      .catch((err) => {
        console.warn(err);
        loader.style.display = "none";
      });
  }
});
