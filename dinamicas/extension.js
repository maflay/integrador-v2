let url_seccion = window.location.origin;
if (!url_seccion.includes("http://127.0.0")) {
  document.addEventListener("DOMContentLoaded", () => {
    if (location.pathname.endsWith(".html")) {
      const cleanPath = location.pathname.replace(/\.html$/, "");
      history.replaceState(null, "", cleanPath);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const mainStyle = document.body.dataset.mainStyle;
  if (mainStyle) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${mainStyle}?v=${Date.now()}`;
    document.head.appendChild(link);
  }

  const mainScript = document.body.dataset.mainScript;
  if (mainScript) {
    const s = document.createElement("script");
    s.src = `${mainScript}?v=${Date.now()}`;
    document.body.appendChild(s);
  }
});