const CS_KEY = "__Secure_1nf0_US3R";

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

function validateSession() {
  // // script de cada vista
  let objUser = getCookie(CS_KEY);
  let username = objUser ? objUser.Nombre : "Sin usuario";
  if (!objUser) {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      html: "Para poder ver la dinámica, debes iniciar sesión primero",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/#inicio";
      }
    });
    if (document.getElementById("content_halloween_misterioso")) {
      document.getElementById("content_halloween_misterioso").style.display =
        "none";
    }

    if (document.getElementById("content_halloween_misterioso_mp")) {
      document.getElementById("content_halloween_misterioso_mp").style.display =
        "none";
    }

    if (document.getElementById("content_principal_portales")) {
      document.getElementById("content_principal_portales").style.display =
        "none";
    }

    if (document.getElementById("content_main_bingo")) {
      document.getElementById("content_main_bingo").style.display = "none";
    }

    if (document.getElementById("main_dinamica_test")) {
      document.getElementById("main_dinamica_test").style.display = "none";
    }

    if (document.getElementById("main_class_acumula_y_gana")) {
      document.getElementById("main_class_acumula_y_gana").style.display =
        "none";
    }

    if (document.getElementById("main_class_rally_puntos")) {
      document.getElementById("main_class_rally_puntos").style.display = "none";
    }
    return;
  }

  return objUser;
}

validateSession();

function inforUser() {
  let objUser = getCookie(CS_KEY);
  return objUser;
}

window.inforUser = inforUser;
