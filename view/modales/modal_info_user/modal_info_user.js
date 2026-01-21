function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const [k, ...rest] = part.split("=");
    if (k === name) {
      const val = rest.join("=");
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return decodeURIComponent(val);
      }
    }
  }
  return null;
}

const u = getCookie("__Secure_1nf0_US3R");

if (document.getElementById("info_user_")) {
  const btn_to_actualizar = document.getElementById("btn_to_actualizar");
  btn_to_actualizar.addEventListener("click", () => {
    document.getElementById("info_user_").style.display = "none";
    document.getElementById("update_user_").style.display = "block";
  });
}

if (document.getElementById("update_user_")) {
  const btn_cancelar_actualizacion = document.getElementById(
    "btn_cancelar_actualizacion",
  );
  const btn_envio_actualizacion = document.getElementById(
    "btn_envio_actualizacion",
  );
  btn_cancelar_actualizacion.addEventListener("click", () => {
    document.getElementById("info_user_").style.display = "block";
    document.getElementById("update_user_").style.display = "none";
  });

  btn_envio_actualizacion.addEventListener("click", () => {
    const funcionario_nombre_u = document.getElementById(
      "funcionario_nombre_u",
    ).value;
    const funcionario_cedula_u = document.getElementById(
      "funcionario_cedula_u",
    ).value;
    const funcionario_rol_u =
      document.getElementById("funcionario_rol_u").value;
    const funcionario_email_u = document.getElementById(
      "funcionario_email_u",
    ).value;
    const funcionario_telefono_u = document.getElementById(
      "funcionario_telefono_u",
    ).value;
    const funcionario_area_u =
      document.getElementById("funcionario_area_u").value;
    const funcionario_user_u =
      document.getElementById("funcionario_user_u").value;

    let data = {
      tipo: "update_usuario",
      match: { Cedula: u.Cedula },
      updates: {
        Nombre: funcionario_nombre_u,
        Cedula: funcionario_cedula_u,
        Rol: funcionario_rol_u,
        Correo: funcionario_email_u,
        Telefono: funcionario_telefono_u,
        Area: funcionario_area_u,
        UserName: funcionario_user_u,
      },
    };

    document.getElementById("loader-user-u").style.display = "flex";
    fetch(u.Url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        document.getElementById("loader-user-u").style.display = "none";

        Swal.fire({
          icon: "success",
          title: "Usuario Actualizado",
          html: "La sesión se cerrará, iniciar nuevamente sesión.",
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            document.cookie = "__Secure_1nf0_US3R=; max-age=0; path=/;";
            window.location.hash = "#login";
            location.reload();
          }
        });
      });
  });
}
