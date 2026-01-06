metodoprueba();

const content_form = document.getElementById("content_form");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const cedula = document.getElementById("cedula");
const rol = document.getElementById("rol");
const area = document.getElementById("area");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const permisos = document.getElementById("permisos");
const btn_create_user = document.getElementById("btn_create_user");

const u = metodoprueba();
if (u.Nivel == "1" || u.Nivel == "2") {
  content_form.style.display = "flex";
} else {
  content_form.style.display = "none";
  location.hash = "#inicio";
}

permisos.addEventListener("change", () => {
  if (permisos.value == "2") {
    Swal.fire({
      title: "Admin Seleccionado?",
      text: "El usuario tendra permisos admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si Quiero!",
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isDismissed) {
        permisos.value = "";
      }
    });
  }
});

btn_create_user.addEventListener("click", () => {
  if (
    nombre.value == "" ||
    apellido.value == "" ||
    cedula.value == "" ||
    rol.value == "" ||
    area.value == "" ||
    telefono.value == "" ||
    correo.value == "" ||
    permisos.value == ""
  ) {
    Swal.fire({
      icon: "info",
      title: "Campos en Blanco",
    });
    return;
  }
  Swal.fire({
    title: "Seguro?",
    text: "Confirma los datos antes de enviar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si Quiero!",
    allowOutsideClick: false,
  })
    .then((result) => {
      if (result.isConfirmed) {
        btn_create_user.textContent = "Enviando...";
        content_form.classList.add("item_disable");
        fetch(`${u.Url}?cedula=${encodeURIComponent(cedula.value)}`)
          .then((res) => res.json())
          .then((dif) => {
            console.log(dif.length);
            if (!Array.isArray(dif) || dif.length != 0) {
              Swal.fire({
                icon: "info",
                title: `El Usuario ya existe con el numero de Cédula ${cedula.value}`,
              });
              content_form.classList.remove("item_disable");
              btn_create_user.textContent = "Enviar";
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

            let username =
              nombre.value.toLowerCase().split(" ")[0] +
              "." +
              apellido.value.toLowerCase().split(" ")[0];

            let data = {
              tipo: "envio_1",
              valor_1: hora,
              valor_2: fecha,
              valor_3: nombre.value + " " + apellido.value,
              valor_4: cedula.value,
              valor_5: rol.value,
              valor_6: area.value,
              valor_7: telefono.value,
              valor_8: correo.value,
              valor_9: username,
              valor_10: permisos.value,
            };

            fetch(u.Url, {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(data),
            })
              .then((res) => res.text())
              .then(() => {
                nombre.value = "";
                apellido.value = "";
                cedula.value = "";
                rol.value = "";
                area.value = "";
                telefono.value = "";
                correo.value = "";
                permisos.value = "";
                content_form.classList.remove("item_disable");
                btn_create_user.textContent = "Enviar";
                Swal.fire({
                  icon: "success",
                  title: "Envio Exitoso",
                });
              });
          })
          .catch((err) => {
            console.warn(err);
            Swal.fire({
              icon: "error",
              title: "Error",
              html: "Inténtalo más tarde, o comunícate con el área de comunicaciones.",
            });
          });
      }
    })
    .catch((err) => {
      console.warn(err);
    });
});
