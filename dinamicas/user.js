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
        window.location.href = "/#login";
      }
    });
    return;
  }

  return objUser;
}

validateSession();

function inforUser() {
  let objUser = getCookie(CS_KEY);
  return objUser;
}

function confettiAl() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });
}

let tiempo;

function resetearTemporizador() {
  clearTimeout(tiempo);
  tiempo = setTimeout(accionInactividad, 1200000);
}

function accionInactividad() {
  window.location.href = "/#login";
}

// Escuchamos los eventos para reiniciar el conteo
window.onload = resetearTemporizador;
document.onmousemove = resetearTemporizador;
document.onkeypress = resetearTemporizador;
document.onscroll = resetearTemporizador;
document.onclick = resetearTemporizador;

function lockBodyScroll() {
  _scrollY = window.scrollY || document.documentElement.scrollTop;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add("body-lock");
  document.body.style.backgroundColor = "white";
}

function unlockBodyScroll() {
  document.body.classList.remove("body-lock");
  document.body.style.top = "";
  window.scrollTo(0, _scrollY);
}

// const user = inforUser();

window.inforUser = inforUser;
