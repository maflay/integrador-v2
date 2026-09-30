window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

document.getElementById("casino").addEventListener("change", ()=> {
  if(document.getElementById("casino").value == "otro"){
    document.getElementById("otro_casino").style.display = "flex";
  } else {
    document.getElementById("otro_casino").style.display = "none";
  }
});

document.getElementById("btn_send_form_ga").addEventListener("click", () => {
  let nombre = document.getElementById("nombre");
  let casino = document.getElementById("casino");
  let otro_casino = document.getElementById("otro_casino");
  let maquinas = document.getElementById("maquinas");
  let telefono = document.getElementById("telefono");
  let cedula = document.getElementById("cedula");
  let loader = document.getElementById("loader");
  let user = inforUser();
  let url =
    "https://script.google.com/macros/s/AKfycbwayBxmdJAREbSl3SjCCYvA6zuanP80M-OAa0YJPL4Mh5v-oOboe0v-btL2-vOjh84l/exec";

  if (nombre.value == "" || telefono.value == "") {
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
    Casino: casino.value == "otro" ? otro_casino.value : casino.value ,
    Telefono: telefono.value,
    Cedula: cedula.value,
    Maquina: maquinas.value,
    Promocion: "Registro GrandAladdin",
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
      casino.value = "";
      telefono.value = "";
      cedula.value = "";
      otro_casino.value = "";
      maquinas.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envío",
      });
    });
});
