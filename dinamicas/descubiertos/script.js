window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const _ronda_ = document.getElementById("_ronda_");
const _maletin_ = document.getElementById("_maletin_");
const _promedio_ = document.getElementById("_promedio_");

let _ronda_current_ = 1;
let _maletin_current_ = 0;
let _promedio_current_ = 25;

let total_premios;
// let elementos;
let total_premio_length = 0;
let _premio_seleccionado_;

const _ultima_posicion_ = document.getElementById("_ultima_posicion_");
const _premio_entregado_ = document.getElementById("_premio_entregado_");

const _casillas_descu_ = document.querySelectorAll("._casillas_descu_");
const _ficha_en_juego_ = document.querySelectorAll("._ficha_en_juego_");
const _open_contra_oferta_ = document.getElementById("_open_contra_oferta_");
const _close_contra_oferta_ = document.getElementById("_close_contra_oferta_");
const _img_contra_oferta = document.getElementById("_img_contra_oferta");
const _content_accion_contraoferta_ = document.getElementById(
  "_content_accion_contraoferta_",
);
const _valor_antes_contra_oferta_ = document.getElementById(
  "_valor_antes_contra_oferta_",
);
const _val_contraoferta_ = document.getElementById("_val_contraoferta_");
const _content_oferta_ronda_ = document.getElementById(
  "_content_oferta_ronda_",
);
const _oferta_ronda_ = document.getElementById("_oferta_ronda_");

const loader = document.getElementById("loader");

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const posicion_premio_1 = document.getElementById("posicion_premio_1");
const posicion_premio_2 = document.getElementById("posicion_premio_2");
const posicion_premio_3 = document.getElementById("posicion_premio_3");
const posicion_premio_4 = document.getElementById("posicion_premio_4");
const posicion_premio_5 = document.getElementById("posicion_premio_5");
const posicion_premio_6 = document.getElementById("posicion_premio_6");
const posicion_premio_7 = document.getElementById("posicion_premio_7");
const posicion_premio_8 = document.getElementById("posicion_premio_8");
const posicion_premio_9 = document.getElementById("posicion_premio_9");
const posicion_premio_10 = document.getElementById("posicion_premio_10");
const posicion_premio_11 = document.getElementById("posicion_premio_11");
const posicion_premio_12 = document.getElementById("posicion_premio_12");
const posicion_premio_13 = document.getElementById("posicion_premio_13");
const posicion_premio_14 = document.getElementById("posicion_premio_14");
const posicion_premio_15 = document.getElementById("posicion_premio_15");
const posicion_premio_16 = document.getElementById("posicion_premio_16");
const posicion_premio_17 = document.getElementById("posicion_premio_17");
const posicion_premio_18 = document.getElementById("posicion_premio_18");
const posicion_premio_19 = document.getElementById("posicion_premio_19");
const posicion_premio_20 = document.getElementById("posicion_premio_20");
const posicion_premio_21 = document.getElementById("posicion_premio_21");
const posicion_premio_22 = document.getElementById("posicion_premio_22");
const posicion_premio_23 = document.getElementById("posicion_premio_23");
const posicion_premio_24 = document.getElementById("posicion_premio_24");

let _PREMIOS_ = {};
const url =
  "https://script.google.com/macros/s/AKfycbz6usjIqjLUHn1ZD97khmacACHMod3gJSqL7yhUeAds9Ko3hUHkVavADznGq9OOEctF/exec";

// handleLoadPremios();
function handleLoadPremios() {
  loader.style.display = "flex";
  fetch(`${url}?hoja=premios`)
    .then((res) => res.json())
    .then((data) => {
      const listaPremios = [
        data[0].premio_1,
        data[0].premio_2,
        data[0].premio_3,
        data[0].premio_4,
        data[0].premio_5,
        data[0].premio_6,
        data[0].premio_7,
        data[0].premio_8,
        data[0].premio_9,
        data[0].premio_10,
        data[0].premio_11,
        data[0].premio_12,
        data[0].premio_13,
        data[0].premio_14,
        data[0].premio_15,
        data[0].premio_16,
        data[0].premio_17,
        data[0].premio_18,
        data[0].premio_19,
        data[0].premio_20,
        data[0].premio_21,
        data[0].premio_22,
        data[0].premio_23,
        data[0].premio_24,
      ];

      for (let i = listaPremios.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listaPremios[i], listaPremios[j]] = [listaPremios[j], listaPremios[i]];
      }

      listaPremios.forEach((premio, index) => {
        _PREMIOS_[index + 1] = premio;
      });

      fetch(`${url}?hoja=tbl_assets`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "update_result",
          sheetName: "tbl_assets",
          match: {
            Numero: "6546464",
          },
          updates: {
            premio_1: _PREMIOS_[1],
            premio_2: _PREMIOS_[2],
            premio_3: _PREMIOS_[3],
            premio_4: _PREMIOS_[4],
            premio_5: _PREMIOS_[5],
            premio_6: _PREMIOS_[6],
            premio_7: _PREMIOS_[7],
            premio_8: _PREMIOS_[8],
            premio_9: _PREMIOS_[9],
            premio_10: _PREMIOS_[10],
            premio_11: _PREMIOS_[11],
            premio_12: _PREMIOS_[12],
            premio_13: _PREMIOS_[13],
            premio_14: _PREMIOS_[14],
            premio_15: _PREMIOS_[15],
            premio_16: _PREMIOS_[16],
            premio_17: _PREMIOS_[17],
            premio_18: _PREMIOS_[18],
            premio_19: _PREMIOS_[19],
            premio_20: _PREMIOS_[20],
            premio_21: _PREMIOS_[21],
            premio_22: _PREMIOS_[22],
            premio_23: _PREMIOS_[23],
            premio_24: _PREMIOS_[24],
          },
        }),
      })
        .then((res) => res.text())
        .then(() => {
          loader.style.display = "none";
        });

      posicion_premio_1.dataset.pre = _PREMIOS_[1];
      posicion_premio_2.dataset.pre = _PREMIOS_[2];
      posicion_premio_3.dataset.pre = _PREMIOS_[3];
      posicion_premio_4.dataset.pre = _PREMIOS_[4];
      posicion_premio_5.dataset.pre = _PREMIOS_[5];
      posicion_premio_6.dataset.pre = _PREMIOS_[6];
      posicion_premio_7.dataset.pre = _PREMIOS_[7];
      posicion_premio_8.dataset.pre = _PREMIOS_[8];
      posicion_premio_9.dataset.pre = _PREMIOS_[9];
      posicion_premio_10.dataset.pre = _PREMIOS_[10];
      posicion_premio_11.dataset.pre = _PREMIOS_[11];
      posicion_premio_12.dataset.pre = _PREMIOS_[12];
      posicion_premio_13.dataset.pre = _PREMIOS_[13];
      posicion_premio_14.dataset.pre = _PREMIOS_[14];
      posicion_premio_15.dataset.pre = _PREMIOS_[15];
      posicion_premio_16.dataset.pre = _PREMIOS_[16];
      posicion_premio_17.dataset.pre = _PREMIOS_[17];
      posicion_premio_18.dataset.pre = _PREMIOS_[18];
      posicion_premio_19.dataset.pre = _PREMIOS_[19];
      posicion_premio_20.dataset.pre = _PREMIOS_[20];
      posicion_premio_21.dataset.pre = _PREMIOS_[21];
      posicion_premio_22.dataset.pre = _PREMIOS_[22];
      posicion_premio_23.dataset.pre = _PREMIOS_[23];
      posicion_premio_24.dataset.pre = _PREMIOS_[24];
    });
}

document.getElementById("_btn_load_premios_").addEventListener("click", () => {
  handleLoadPremios();
});

_casillas_descu_.forEach((posicion) => {
  posicion.addEventListener("click", () => {
    
    if(posicion.dataset.pre == "" || posicion.dataset.pre == 0){
      Swal.fire({
        icon: "warning",
        title: "Sin premios"
      });
      return;
    }

    const ficha_chose = document.querySelectorAll(".ficha_chose");
    if (ficha_chose.length === 0) {
      posicion.classList.add("ficha_chose");
      _premio_seleccionado_ = posicion.dataset.pre;
      _ultima_posicion_.textContent = posicion.textContent;
      return;
    }

    posicion.textContent = formatoPesos_monto_efectivo.format(
      posicion.dataset.pre,
    );
    posicion.classList.add("premio_show");
    posicion.classList.remove("_ficha_en_juego_");
    _content_oferta_ronda_.style.display = "none";
    _content_accion_contraoferta_.style.display = "none";

    const elementos = document.querySelectorAll("._ficha_en_juego_");
    if (_ronda_current_ == 1) {
      _premio_entregado_.textContent = posicion.textContent;
      if (_maletin_current_ < 5) {
        _maletin_current_++;
        if (_maletin_current_ === 5) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          console.log(Number(total_premio_length));
          console.log(Number(elementos.length));
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";
          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.25,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 1," + "<br/>" + " Inicia la ronda 2",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = _promedio_current_ + "%";
      }
    } else if (_ronda_current_ == 2) {
      if (_maletin_current_ < 9) {
        _maletin_current_++;
        if (_maletin_current_ === 9) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.35,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 2," + "<br/>" + " Inicia la ronda 3",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 35 + "%";
      }
    } else if (_ronda_current_ == 3) {
      if (_maletin_current_ < 13) {
        _maletin_current_++;
        if (_maletin_current_ === 13) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.5,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 3, " + "<br/>" + "Inicia la ronda 4",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 50 + "%";
      }
    } else if (_ronda_current_ == 4) {
      if (_maletin_current_ < 16) {
        _maletin_current_++;
        if (_maletin_current_ === 16) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.65,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 4," + "<br/>" + "Inicia la ronda 5",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 65 + "%";
      }
    } else if (_ronda_current_ == 5) {
      if (_maletin_current_ < 19) {
        _maletin_current_++;
        if (_maletin_current_ === 19) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.8,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 5," + "<br/>" + "Inicia la ronda 6",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 80 + "%";
      }
    } else if (_ronda_current_ == 6) {
      if (_maletin_current_ < 21) {
        _maletin_current_++;
        if (_maletin_current_ === 21) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.9,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 6, " + "<br/>" + "Inicia la ronda 7",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 90 + "%";
      }
    } else if (_ronda_current_ == 7) {
      if (_maletin_current_ < 22) {
        _maletin_current_++;
        if (_maletin_current_ === 22) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          const posicion = document.getElementById(
            `posicion_premio_${_ultima_posicion_.textContent}`,
          );
          posicion.classList.remove("ficha_chose");
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.9,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 7, " + "<br/>" + "Inicia la ronda 8",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 90 + "%";
      }
    } else if (_ronda_current_ == 8) {
      if (_maletin_current_ < 23) {
        _maletin_current_++;
        if (_maletin_current_ === 23) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.9,
          );
          Swal.fire({
            icon: "info",
            title: "Termina la ronda 8, " + "<br/>" + "Inicia la ronda 9",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 90 + "%";
      }
    } else if (_ronda_current_ == 9) {
      if (_maletin_current_ < 24) {
        _maletin_current_++;
        if (_maletin_current_ === 24) {
          _ronda_current_++;
          _ronda_.textContent = _ronda_current_;
          total_premio_length = 0;
          elementos.forEach((elemento) => {
            let texto = elemento.dataset.pre;
            let valor = parseFloat(texto);
            if (!isNaN(valor)) {
              total_premio_length += valor;
            }
          });
          _content_oferta_ronda_.style.display = "flex";
          _content_accion_contraoferta_.style.display = "flex";

          _oferta_ronda_.textContent = formatoPesos_monto_efectivo.format(
            (Number(total_premio_length) / Number(elementos.length)) * 0.9,
          );
          Swal.fire({
            icon: "info",
            title: "La ronda 9 ha terminado",
          });
        }
        _maletin_.textContent = _maletin_current_;
        _promedio_.textContent = 90 + "%";
      }
    }
  });
});

_open_contra_oferta_.addEventListener("click", () => {
  _valor_antes_contra_oferta_.textContent =
    "Oferta Actual :" + _oferta_ronda_.textContent;
  _img_contra_oferta.style.display = "flex";
});

_close_contra_oferta_.addEventListener("click", () => {
  _img_contra_oferta.style.display = "none";
});
