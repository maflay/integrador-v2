window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const url =
    "https://script.google.com/macros/s/AKfycbxS6JERBY5tkDqyp7BbPgYgWX8yuBJ2cecGfFnzwcUqHC8_os1QI2tr8wEaVOFoQduX/exec";

  async function getData() {
    const res = await fetch(`${url}?hoja=registro`);
    const data = await res.json(); // ← esto debe ser un array de objetos
    console.log("Datos crudos:", data);

    // Ejemplos: contar por columnas
    const conteoValorAdp = contarPorCampo(data, "valor_adp");
    const conteoValorAdpCas1 = contarPorCampo(data, "valor_adp_cas1");
    const conteoEdad = contarPorCampo(data, "edad");
    const conteoCasino = contarPorCampo(data, "casinos");
    const frecuencia = contarPorCampo(data, "frecuencia");
    const exp_cas_atencion_del_personal = contarPorCampo(data, "exp_cas_atencion_del_personal");
    const valor_adp = contarPorCampo(data, "valor_adp");

    console.log("valor_adp:", conteoValorAdp);
    console.log("valor_adp_cas1:", conteoValorAdpCas1);
    console.log("edad:", conteoEdad);
    console.log("casinos:", conteoCasino);
    console.log("frecuencia:", frecuencia);
    console.log("exp_cas_atencion_del_personal:", exp_cas_atencion_del_personal);
    console.log("valor_adp:", valor_adp);

    // Para pintar en gráfico: labels + valores
    const labelsAdp = Object.keys(conteoValorAdp); // ["1","2","3","4","5"]
    const dataAdp = Object.values(conteoValorAdp); // [cantidad de cada uno]

    const labelsAdpCas1 = Object.keys(conteoValorAdpCas1);
    const dataAdpCas1 = Object.values(conteoValorAdpCas1);

    const columnas = [
      "valor_adp",
      "valor_adp_cas1",
      "valor_adp_cas2",
      "valor_adp_cas3",
      "valor_seg",
      "valor_seg_cas1",
      "valor_seg_cas2",
      "valor_seg_cas3",
      "valor_amb",
      "valor_amb_cas1",
      "valor_amb_cas2",
      "valor_amb_cas3",
      "valor_insta",
      "valor_insta_cas1",
      "valor_insta_cas2",
      "valor_insta_cas3",
      "valor_promo",
      "valor_promo_cas1",
      "valor_promo_cas2",
      "valor_promo_cas3",
      "valor_cerca",
      "valor_cerca_cas1",
      "valor_cerca_cas2",
      "valor_cerca_cas3",
      "valor_comida",
      "valor_comida_cas1",
      "valor_comida_cas2",
      "valor_comida_cas3",
      "nivelSatisfaccion",
    ];

    const promediosColumnas = calcularPromediosPorColumna(data, columnas);
    console.log("Promedios por columna:", promediosColumnas);

    const promedios = calcularPromediosExperiencia(data);
    console.log("Promedios:", promedios);

    dibujarGrafica(promedios);
  }

  function calcularPromediosExperiencia(data) {
    const campos = [
      "valor_adp",
      "valor_seg",
      "valor_amb",
      "valor_insta",
      "valor_promo",
      "valor_cerca",
      "valor_comida",
    ];

    const acumulados = {};
    const conteo = {};

    campos.forEach((campo) => {
      acumulados[campo] = 0;
      conteo[campo] = 0;
    });

    data.forEach((registro) => {
      campos.forEach((campo) => {
        const v = Number(registro[campo]);
        if (!isNaN(v) && v > 0) {
          acumulados[campo] += v;
          conteo[campo] += 1;
        }
      });
    });

    const promedios = {};
    campos.forEach((campo) => {
      promedios[campo] =
        conteo[campo] > 0 ? acumulados[campo] / conteo[campo] : 0;
    });

    return promedios;
  }

function contarPorCampo(data, campo) {
  const conteo = {};

  data.forEach((row) => {
    const valor = row[campo];

    // Ignorar vacíos o undefined
    if (valor === null || valor === undefined || valor === "") return;

    const clave = String(valor).trim(); // asegurar texto limpio
    conteo[clave] = (conteo[clave] || 0) + 1;
  });

  console.log(conteo)

  // 🔁 Convertir el objeto en un array ordenado
  const resultado = Object.entries(conteo)
    .map(([etiqueta, cantidad]) => ({
      etiqueta,
      conteo: cantidad,
    }))
    // opcional: orden numérico si las etiquetas son números
    .sort((a, b) => (isNaN(a.etiqueta) ? 0 : a.etiqueta - b.etiqueta));

  return resultado;
}


  let graficaExperiencia = null; // para poder resetear si la vuelves a dibujar

  function dibujarGrafica(promedios) {
    const ctx = document.getElementById("graficaExperiencia").getContext("2d");

    const labels = [
      "Atención del personal",
      "Seguridad",
      "Ambiente",
      "Instalaciones",
      "Promociones y beneficios",
      "Cercanía",
      "Comida",
    ];

    const dataValores = [
      promedios.valor_adp,
      promedios.valor_seg,
      promedios.valor_amb,
      promedios.valor_insta,
      promedios.valor_promo,
      promedios.valor_cerca,
      promedios.valor_comida,
    ];

    if (graficaExperiencia) {
      graficaExperiencia.destroy(); // evitar gráficas superpuestas
    }

    graficaExperiencia = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Promedio (1 a 5)",
            data: dataValores,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 5,
          },
        },
      },
    });
  }

  function calcularPromediosPorColumna(data, columnas) {
    const resultado = {};

    columnas.forEach((col) => {
      let suma = 0;
      let cuenta = 0;

      data.forEach((row) => {
        const v = Number(row[col]);
        if (!isNaN(v)) {
          suma += v;
          cuenta++;
        }
      });

      resultado[col] = cuenta > 0 ? suma / cuenta : 0;
    });

    return resultado;
  }

  getData();
});
