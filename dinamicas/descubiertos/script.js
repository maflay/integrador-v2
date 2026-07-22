const _ronda_ = document.getElementById("_ronda_");
const _maletin_ = document.getElementById("_maletin_");
const _promedio_ = document.getElementById("_promedio_");
const _casillas_descu_ = document.querySelectorAll("._casillas_descu_");

let _PREMIOS_ = {};
const url =
  "https://script.google.com/macros/s/AKfycbydcWlQuJu2DipzCoDRNQBYK89cWtjJ2LxNqscVehaWewTYgS3HIJNPF58OXwhY7JM4/exec";

handleLoadPremios();
function handleLoadPremios() {
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
        [listaPremios[i], listaPremios[j]] = [listaPremios[j], listaPremios[i]]; // Intercambia valores
      }

      listaPremios.forEach((premio, index) => {
        _PREMIOS_[index + 1] = premio;
      });

      _casillas_descu_.forEach((premio) => {
        for (let i = 0; 0 < 24; i++) {
            premio.dataset.pre = _PREMIOS_[i];
        }
      });
    });
}
