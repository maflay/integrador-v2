const Num_Rojos = [
  "1",
  "3",
  "5",
  "7",
  "9",
  "12",
  "14",
  "16",
  "18",
  "19",
  "21",
  "23",
  "25",
  "27",
  "30",
  "32",
  "34",
  "36",
];

const Num_Negros = [
  "2",
  "4",
  "6",
  "8",
  "10",
  "11",
  "13",
  "15",
  "17",
  "20",
  "22",
  "24",
  "26",
  "28",
  "29",
  "31",
  "33",
  "35",
];

const Num_Verdes = ["0", "00"];
const url =
  "https://script.google.com/macros/s/AKfycbwqtTZ2OkK-lnAvI0lsu_3An8koosJhTDZzhLgPVcBPxRD7FTiFn2Wd4zAD8jEFMezCCw/exec";
validateInfo();

// setInterval(() => {
//   validateInfo();
// }, 40000);

function validateInfo() {
  const container = document.getElementById("content_view_test");
  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  fetch(`${url}?hoja=finalistab&mesbus=${fecha_reg}&anobus=${anio_res}`)
    .then((res) => res.json())
    .then((data) => {
      // ***************************************************************************
      if (data.length === 0) {
        const fechaCompleta_validate_register = new Date().toLocaleString(
          "es-CO",
          {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "long",
          },
        );

        const [fecha_reg, anio_res] =
          fechaCompleta_validate_register.split(" de ");

        fetch(`${url}?hoja=finalista&mesbus=${fecha_reg}&anobus=${anio_res}`)
          .then((res) => res.json())
          .then((data2) => {
            // data2 = [{ Nombre: "..." }, { Nombre: "..." }, ...]
            if (!Array.isArray(data2) || data2.length === 0) {
              container.innerHTML = `<div class="slider-wrap">
                                        <button class="nav prev posi_btn_slider_resutl_1" type="button" aria-label="Anterior">‹</button>
                                        <div class="slider-viewport">
                                            <div class="slider-track">
                                                <div class="slide">
                                                    <div class="col">
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                        <div class="row-item">
                                                            <div class="num">?</div>
                                                            <div class="name">Disponible</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="nav next posi_btn_slider_resutl_2" type="button" aria-label="Siguiente">›</button>
                                    </div>`;
              return;
            }

            // Tomamos hasta 38 nombres (o los que lleguen)
            const rows = data2.slice(0, 38).map((r, i) => ({
              Numero: "?",
              Nombre: String(r?.Nombre || "").trim() || `Participante ${i + 1}`,
            }));

            function chunk(arr, size) {
              const out = [];
              for (let i = 0; i < arr.length; i += size)
                out.push(arr.slice(i, i + size));
              return out;
            }

            const slidesData = chunk(rows, 10);

            const renderCol = (items) => `<div class="col">
                                            ${items
                                              .map(
                                                (r) => `
                                              <div class="row-item">
                                                <div class="num">${escapeHtml(r.Numero)}</div>
                                                <div class="name">${escapeHtml(r.Nombre).slice(0, 15)}...</div>
                                              </div>`,
                                              )
                                              .join("")}
                                          </div>`;

            container.innerHTML = `<div class="slider-wrap">
                                    <button class="nav prev posi_btn_slider_resutl_1" type="button" aria-label="Anterior">‹</button>
                                    <div class="slider-viewport">
                                      <div class="slider-track">
                                        ${slidesData
                                          .map(
                                            (group, idx) => `
                                          <div class="slide" data-index="${idx}">
                                            ${renderCol(group.slice(0, 5))}
                                            ${renderCol(group.slice(5, 10))}
                                          </div>`,
                                          )
                                          .join("")}
                                      </div>
                                    </div>
                                    <button class="nav next posi_btn_slider_resutl_2" type="button" aria-label="Siguiente">›</button>
                                  </div>
                                  <div class="dots">
                                    ${slidesData.map((_, i) => `<button class="dot" data-dot="${i}"></button>`).join("")}
                                  </div>`;

            // activar navegación
            const track = container.querySelector(".slider-track");
            const slides = [...container.querySelectorAll(".slide")];
            const prevBtn = container.querySelector(".prev");
            const nextBtn = container.querySelector(".next");
            const dots = [...container.querySelectorAll(".dot")];

            let current = 0;

            function updateSlider() {
              track.style.transform = `translateX(-${current * 100}%)`;
              dots.forEach((d, i) =>
                d.classList.toggle("active", i === current),
              );
              prevBtn.disabled = current === 0;
              nextBtn.disabled = current === slides.length - 1;
            }

            prevBtn.addEventListener("click", () => {
              if (current > 0) current--;
              updateSlider();
            });

            nextBtn.addEventListener("click", () => {
              if (current < slides.length - 1) current++;
              updateSlider();
            });

            dots.forEach((d) =>
              d.addEventListener("click", () => {
                current = Number(d.dataset.dot);
                updateSlider();
              }),
            );

            updateSlider();
          });

        return;
      }
      //   ******************************************************************************************
      const last = data[data.length - 1];
      const infoHtml = String(last?.Info || "");

      const lines = infoHtml
        .replace(/<br\s*\/?>/gi, "\n")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const rows = lines.slice(0, 38).map((line) => {
        const parts = line.split(" - ").map((p) => p.trim());

        return {
          Numero: parts[0] || "",
          Nombre: parts[1] || "",
          Casino: parts[2] || "",
          Cedula: parts[3] || "",
          Fecha: parts[4] || "",
        };
      });

      function chunk(arr, size) {
        const out = [];
        for (let i = 0; i < arr.length; i += size)
          out.push(arr.slice(i, i + size));
        return out;
      }

      function padNumero(n) {
        const s = String(n ?? "").trim();
        if (s === "0" || s === "00") return s;
        return s.length === 1 ? "0" + s : s;
      }

      function getColorNumero(num) {
        if (Num_Rojos.includes(num)) return "color_red";
        if (Num_Negros.includes(num)) return "color_black";
        if (Num_Verdes.includes(num)) return "color_green";
        return "";
      }

      const slidesData = chunk(rows, 10);

      container.innerHTML = `
      <button class="nav prev posi_btn_slider_resutl_1" type="button" aria-label="Anterior">‹</button>
      <div class="slider-wrap">
                                <div class="slider-viewport">
                                <div class="slider-track">
                                    ${slidesData
                                      .map((group, idx) => {
                                        const left = group.slice(0, 5);
                                        const right = group.slice(5, 10);

                                        const renderCol = (items) => `
                                        <div class="col">
                                            ${items
                                              .map(
                                                (r) => `
                                                <div class="row-item">
                                                    <div class="num ${getColorNumero(r.Numero)}">
                                                      ${escapeHtml(padNumero(r.Numero))}
                                                    </div>

                                                    <div class="name">${escapeHtml(r.Nombre).slice(0, 15)}...</div>
                                                </div>
                                                `,
                                              )
                                              .join("")}
                                        </div>
                                        `;
                                        return `
                                        <div class="slide" data-index="${idx}">
                                            ${renderCol(left)}
                                            ${renderCol(right)}
                                        </div>
                                        `;
                                      })
                                      .join("")}
                                </div>
                                </div>
                                </div>
                                <button class="nav next posi_btn_slider_resutl_2" type="button" aria-label="Siguiente">›</button>
                            <div class="dots">
                                ${slidesData.map((_, i) => `<button class="dot" data-dot="${i}" aria-label="Ir a ${i + 1}"></button>`).join("")}
                            </div>`;

      const track = container.querySelector(".slider-track");
      const slides = [...container.querySelectorAll(".slide")];
      const prevBtn = container.querySelector(".prev");
      const nextBtn = container.querySelector(".next");
      const dots = [...container.querySelectorAll(".dot")];

      let current = 0;

      function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === slides.length - 1;
      }

      prevBtn.addEventListener("click", () => {
        if (current > 0) current--;
        updateSlider();
      });

      nextBtn.addEventListener("click", () => {
        if (current < slides.length - 1) current++;
        updateSlider();
      });

      dots.forEach((d) =>
        d.addEventListener("click", () => {
          current = Number(d.dataset.dot);
          updateSlider();
        }),
      );

      let startX = 0;
      let dragging = false;

      const viewport = container.querySelector(".slider-viewport");
      viewport.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        dragging = true;
      });
      viewport.addEventListener("touchend", (e) => {
        if (!dragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 40) {
          if (diff < 0 && current < slides.length - 1) current++;
          if (diff > 0 && current > 0) current--;
          updateSlider();
        }
        dragging = false;
      });

      updateSlider();
    })
    .catch(console.error);
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
