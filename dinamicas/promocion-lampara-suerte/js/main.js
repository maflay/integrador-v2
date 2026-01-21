window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});


const ValorFinal_lamp = document.getElementById("resultado");
const BonosRepartir = document.getElementById("bonos");
const historial = [];

const formBox = document.getElementById("formBox");
const toggleBtn = document.getElementById("toggleBtn");
const logo = document.getElementById("prueba");

toggleBtn.addEventListener("click", () => {
  formBox.classList.toggle("hidden");

  const oculto = formBox.classList.contains("hidden");
  toggleBtn.textContent = oculto ? "Mostrar" : "Ocultar";

  if (oculto) {
    logo.classList.add("logo-centrado");
  } else {
    logo.classList.remove("logo-centrado");
  }
});


class SlotMachine {
  constructor(slotElement, prefix, selectElement) {
    this.slotElement = slotElement;
    this.prefix = prefix; // '1er', '2do', '3er'
    this.selectElement = selectElement;
    this.imagesCount = 6;
    this.currentIndex = 0;
    this.interval = null;
    this.stopping = false;
    this.targetNumber = null;
    this.imgElement = document.createElement("img");
    this.slotElement.appendChild(this.imgElement);
  }

  start() {
    this.stopping = false;
    this.targetNumber = null;
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex % this.imagesCount) + 1;
      this.imgElement.src = `./images/fichas/${this.prefix} ${this.currentIndex}.png`;
      this.imgElement.alt = `${this.prefix} ${this.currentIndex}`;
    }, 100);
  }

  stopOnNumber(number) {
    if (this.stopping) return;
    this.stopping = true;
    this.targetNumber = number;
    clearInterval(this.interval);
    const valselect1 = document.getElementById("listad-1er").value;
    const valselect2 = document.getElementById("listad-2do").value;
    const valselect3 = document.getElementById("listad-3er").value;
    const valcategoria = document.getElementById("categoria").value;
    // ValorFinal_lamp.textContent = "prueba de que gano"

    if (
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 3) || // 1
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 5) || // 2
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 3) || // 3
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 5) || // 4
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 3) || // 5
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 5) || // 6
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 3) || // 7
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 5) || // 8
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 2) || // 9
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 4) || // 10
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 6) || // 11
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 3) || // 12
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 5) || // 13
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 2) || // 14
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 4) || // 15
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 6) || // 16
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 2) || // 17
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 4) || // 18
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 6) || // 19
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 3) || // 20
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 5) || // 21
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 3) || // 22
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 5) || // 23
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 2) || // 24
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 4) || // 25
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 6) || // 26
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 3) || // 27
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 5) || // 28
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 2) || // 29
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 4) || // 30
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 6) || // 31
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 2) || // 32
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 4) || // 33
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 6) || // 34
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 3) || // 35
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 5) || // 36
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 3) || // 37
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 5) || // 38
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 3) || // 39
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 5) || // 40
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 3) || // 41
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 5) || // 42
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 3) || // 43
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 5) || // 44
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 2) || // 45
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 4) || // 46
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 6) || // 47
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 3) || // 48
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 5) || // 49
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 2) || // 50
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 4) || // 51
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 6) || // 52
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 2) || // 53
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 4) || // 54
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 6) || // 55
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 3) || // 56
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 5) // 57
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$50.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$70.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$80.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$50.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$70.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$90.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$110.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$130.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      }
    } else if (
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 2) || // 1
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 4) || // 2
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 2) || // 3
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 4) || // 4
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 1) || // 5
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 2) || // 6
      (valselect1 == 2 && valselect2 == 1 && valselect3 == 4) || // 7
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 1) || // 8
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 2) || // 9
      (valselect1 == 2 && valselect2 == 6 && valselect3 == 4) || // 10
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 1) || // 11
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 2) || // 12
      (valselect1 == 3 && valselect2 == 1 && valselect3 == 4) || // 13
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 1) || // 14
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 2) || // 15
      (valselect1 == 3 && valselect2 == 6 && valselect3 == 4) || // 16
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 3) || // 17
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 5) || // 18
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 6) || // 19
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 1) || // 20
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 2) || // 21
      (valselect1 == 4 && valselect2 == 2 && valselect3 == 4) || // 22
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 2) || // 23
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 4) || // 24
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 1) || // 25
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 2) || // 26
      (valselect1 == 4 && valselect2 == 4 && valselect3 == 4) || // 27
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 1) || // 28
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 2) || // 29
      (valselect1 == 4 && valselect2 == 5 && valselect3 == 4) || // 30
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 3) || // 31
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 5) || // 32
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 6) || // 33
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 3) || // 34
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 5) || // 35
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 2) || // 36
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 4) || // 37
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 2) || // 38
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 4) || // 39
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 2) || // 40
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 4) || // 41
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 3) || // 42
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 5) || // 43
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 1) || // 44
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 2) || // 45
      (valselect1 == 6 && valselect2 == 1 && valselect3 == 4) || // 46
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 1) || // 47
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 2) || // 48
      (valselect1 == 6 && valselect2 == 6 && valselect3 == 4) // 49
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$70.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$90.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$90.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$110.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$70.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$90.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$110.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$130.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$170.000");
        }, 2000);
      }
    } else if (
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 1) || // 1
      (valselect1 == 1 && valselect2 == 1 && valselect3 == 6) || // 2
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 1) || // 3
      (valselect1 == 1 && valselect2 == 2 && valselect3 == 6) || // 4
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 2) || // 5
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 3) || // 6
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 4) || // 7
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 5) || // 8
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 1) || // 9
      (valselect1 == 1 && valselect2 == 4 && valselect3 == 6) || //10
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 1) || //11
      (valselect1 == 1 && valselect2 == 5 && valselect3 == 6) || //12
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 1) || //13
      (valselect1 == 1 && valselect2 == 6 && valselect3 == 6) || //14
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 1) || //15
      (valselect1 == 2 && valselect2 == 3 && valselect3 == 6) || //16
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 1) || //17
      (valselect1 == 3 && valselect2 == 3 && valselect3 == 6) || //18
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 1) || //19
      (valselect1 == 4 && valselect2 == 3 && valselect3 == 6) || //20
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 6) || //21
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 6) || //22
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 2) || //23
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 3) || //24
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 4) || //25
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 5) || //26
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 6) || //27
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 6) || //28
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 6) || //29
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 1) || //30
      (valselect1 == 6 && valselect2 == 3 && valselect3 == 6) //31
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$80.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$80.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$140.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$160.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$180.000");
        }, 2000);
      }
    } else if (
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 1) || // 1
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 3) || // 2
      (valselect1 == 2 && valselect2 == 2 && valselect3 == 5) || // 3
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 1) || // 4
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 3) || // 5
      (valselect1 == 2 && valselect2 == 4 && valselect3 == 5) || // 6
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 1) || // 7
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 3) || // 8
      (valselect1 == 2 && valselect2 == 5 && valselect3 == 5) || // 9
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 1) || //10
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 3) || //11
      (valselect1 == 3 && valselect2 == 2 && valselect3 == 5) || //12
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 1) || //13
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 3) || //14
      (valselect1 == 3 && valselect2 == 4 && valselect3 == 5) || //15
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 1) || //16
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 3) || //17
      (valselect1 == 3 && valselect2 == 5 && valselect3 == 5) || //18
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 1) || //19
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 3) || //20
      (valselect1 == 5 && valselect2 == 2 && valselect3 == 5) || //21
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 1) || //22
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 3) || //23
      (valselect1 == 5 && valselect2 == 4 && valselect3 == 5) || //24
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 1) || //25
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 3) || //26
      (valselect1 == 5 && valselect2 == 5 && valselect3 == 5) || //27
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 1) || //28
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 3) || //29
      (valselect1 == 6 && valselect2 == 2 && valselect3 == 5) || //30
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 1) || //31
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 3) || //32
      (valselect1 == 6 && valselect2 == 4 && valselect3 == 5) || //33
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 1) || //34
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 3) || //35
      (valselect1 == 6 && valselect2 == 5 && valselect3 == 5) //36
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$120.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$100.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$200.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$350.000");
        }, 2000);
      }
    } else if (
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 1) || // 1
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 2) || // 2
      (valselect1 == 4 && valselect2 == 1 && valselect3 == 4) || // 3
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 1) || // 4
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 2) || // 5
      (valselect1 == 4 && valselect2 == 6 && valselect3 == 4) || // 6
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 1) || // 7
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 2) || // 8
      (valselect1 == 5 && valselect2 == 1 && valselect3 == 4) || // 9
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 1) || //10
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 2) || //11
      (valselect1 == 5 && valselect2 == 6 && valselect3 == 4) //12
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$180.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$250.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$130.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$150.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$170.000");
        }, 2000);
      }
    } else if (
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 1) || // 1
      (valselect1 == 1 && valselect2 == 3 && valselect3 == 6) || // 2
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 1) || // 3
      (valselect1 == 5 && valselect2 == 3 && valselect3 == 6) // 4
    ) {
      if (valcategoria == "ESTANDARALADDIN") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORALADDIN") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "ESTANDARMARCOPOLO") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SUPERIORMARCOPOLO") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "BRONCE") {
        setTimeout(() => {
          alerResult("$300.000");
        }, 2000);
      } else if (valcategoria == "SILVER") {
        setTimeout(() => {
          alerResult("$400.000");
        }, 2000);
      } else if (valcategoria == "GOLD") {
        setTimeout(() => {
          alerResult("$500.000");
        }, 2000);
      } else if (valcategoria == "LEGENDARIO") {
        setTimeout(() => {
          alerResult("$800.000");
        }, 2000);
      } else if (valcategoria == "TITANIO") {
        setTimeout(() => {
          alerResult("$900.000");
        }, 2000);
      } else if (valcategoria == "GENIUS") {
        setTimeout(() => {
          alerResult("$1.000.000");
        }, 2000);
      }
    } else if (valselect3) {
      setTimeout(() => {
        Swal.fire({
          icon: "warning",
          title: `Combinacion no ganadora, Vuelve y juega 😃`,
          showConfirmButton: false,
          timer: 3000,
        });
        ValorFinal_lamp.innerHTML = `<button style="width: auto;" class="btn-lampara" onclick="vuelveyjuega()">Vuelve y juega</button>`;
      }, 2000);
      // setTimeout(() => {
      //   ValorFinal_lamp.textContent = ``;
      // }, 5000);
    }

    // Empezamos a bajar la velocidad y después quedamos en la imagen final
    let current = this.currentIndex;
    const slowDown = () => {
      if (current === number) {
        this.imgElement.src = `./images/fichas/${this.prefix} ${number}.png`;
        this.imgElement.alt = `${this.prefix} ${number}`;
        return;
      }
      current = (current % this.imagesCount) + 1;
      this.imgElement.src = `./images/fichas/${this.prefix} ${current}.png`;
      this.imgElement.alt = `${this.prefix} ${current}`;

      setTimeout(slowDown, 200);
    };
    slowDown();
  }
}

// Instanciar las tres slot machines
const slot1 = new SlotMachine(
  document.getElementById("slot-1er"),
  "1er",
  document.getElementById("listad-1er")
);
const slot2 = new SlotMachine(
  document.getElementById("slot-2do"),
  "2do",
  document.getElementById("listad-2do")
);
const slot3 = new SlotMachine(
  document.getElementById("slot-3er"),
  "3er",
  document.getElementById("listad-3er")
);

// Iniciar slots al cargar la página
slot1.start();
slot2.start();
slot3.start();

// Función para manejar selección y detener slot correspondiente
document.getElementById("listad-1er").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot1.stopOnNumber(val);
});

document.getElementById("listad-2do").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot2.stopOnNumber(val);
});

document.getElementById("listad-3er").addEventListener("change", (e) => {
  const val = parseInt(e.target.value, 10);
  slot3.stopOnNumber(val);
});

function alerResult(val) {
  Swal.fire({
    icon: "success",
    title: `Combinación exitosa, Ganaste ${val} `,
    showConfirmButton: false,
    timer: 3000,
  });
  if (val == "$120.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $50</th>`;
    html += `<th>Bono $70</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$120.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$140.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $70</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$140.000</td>`;
    html += `<td>2</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$160.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $80</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$160.000</td>`;
    html += `<td>2</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$180.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $80</th>`;
    html += `<th>Bono $100</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$180.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$200.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $50</th>`;
    html += `<th>Bono $150</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$200.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$350.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $50</th>`;
    html += `<th>Bono $300</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$350.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$400.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $100</th>`;
    html += `<th>Bono $300</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$400.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$800.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $300</th>`;
    html += `<th>Bono $500</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$800.000</td>`;
    html += `<td>1</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$900.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $100</th>`;
    html += `<th>Bono $150</th>`;
    html += `<th>Bono $500</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$900.000</td>`;
    html += `<td>1</td>`;
    html += `<td>2</td>`;
    html += `<td>1</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  } else if (val == "$1.000.000") {
    let html = `<div class="table-result">`;
    html += `<h1 style="color:white;">Bonos a pagar</h1>`;
    html += `<table border="1">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Pago de premios</th>`;
    html += `<th>Bono $500</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    html += `<tr>`;
    html += `<td>$1.000.000</td>`;
    html += `<td>2</td>`;
    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    html += `<button class="btn-lampara btn-table" onclick="limpiartabla()">Limpiar tabla</button>`;
    html += `</div>`;
    BonosRepartir.innerHTML = html;
  }

  // ValorFinal.textContent = `Ganaste, ${val} `;
  ValorFinal_lamp.innerHTML = `<div><label>Ganaste,<strong style="font-size: 2rem"> ${val}</strong> </label><div  style="align-items: center;"> <input class="num-bono" type="text" id="num-bono" placeholder="# de Bono"/></div></div>`;
}
function limpiartabla() {
  BonosRepartir.innerHTML = "";
  ValorFinal_lamp.innerHTML = "";
}

function handleSend() {
  const url =
    "https://script.google.com/macros/s/AKfycbwjQei6l9v1Bsbot28aTJyHIIXxMYc1enuarCD6Ucq2HEf3ZmR1WuPlAYDBPCgvmJ4K/exec";

  const valselect1 = document.getElementById("listad-1er").value;
  const valselect2 = document.getElementById("listad-2do").value;
  const valselect3 = document.getElementById("listad-3er").value;
  const casino = document.getElementById("casino").value;
  const categoria = document.getElementById("categoria").value;
  const nombre = document.getElementById("nombre").value;
  const cedula = document.getElementById("cedula").value;
  const loader = document.getElementById("loader");
  // const now = new Date();
  // const fecha = now.toISOString().split("T")[0];
  // const hora = now.toTimeString().split(" ")[0];

  const fechaCompleta = new Date().toLocaleString("es-CO", {
  timeZone: "America/Bogota",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

const [fecha, hora] = fechaCompleta.split(", ");


  if (
    !valselect1 ||
    !valselect2 ||
    !valselect3 ||
    !casino ||
    !categoria ||
    !nombre ||
    !cedula
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes completar todos los campos antes de continuar.",
    });
    return;
  }

  const promocion = "Lampara de la suerte";
  const numbono = document.getElementById("num-bono").value;
  loader.style.display = "flex";

  const data = {
    valselect1,
    valselect2,
    valselect3,
    numbono,
    casino,
    categoria,
    nombre,
    cedula,
    fecha,
    hora,
    promocion,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    //   headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      Swal.fire({
        icon: "success",
        title: `✅ Datos enviados 😃`,
        showConfirmButton: false,
        timer: 3000,
      });
      document.getElementById("listad-1er").value = "";
      document.getElementById("listad-2do").value = "";
      document.getElementById("listad-3er").value = "";
      document.getElementById("casino").value = "";
      document.getElementById("categoria").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("cedula").value = "";
      document.getElementById("num-bono").value = "";
      ValorFinal_lamp.textContent = ``;
      BonosRepartir.innerHTML = "";
      slot1.start();
      slot2.start();
      slot3.start();
      loader.style.display = "none";
    })
    .catch((err) => {
      console.error("❌ Error al enviar", err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: ` ❌ Datos no enviados 😞`,
        showConfirmButton: false,
        timer: 3000,
      });
    });
}

function newGame() {
  const val1 = document.getElementById("listad-1er").value;
  const val2 = document.getElementById("listad-2do").value;
  const val3 = document.getElementById("listad-3er").value;

  document.getElementById("listad-1er").value = "";
  document.getElementById("listad-2do").value = "";
  document.getElementById("listad-3er").value = "";
  document.getElementById("casino").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("cedula").value = "";
  ValorFinal_lamp.textContent = ``;
  BonosRepartir.innerHTML = "";
  if (val1 == "" && val2 == "" && val3 == "") {
  } else {
    slot1.start();
    slot2.start();
    slot3.start();
  }
}

function vuelveyjuega() {
  document.getElementById("listad-1er").value = "";
  document.getElementById("listad-2do").value = "";
  document.getElementById("listad-3er").value = "";
  ValorFinal_lamp.textContent = ``;
  BonosRepartir.innerHTML = "";
  slot1.start();
  slot2.start();
  slot3.start();
}

function restarlanz1() {
  const val1 = document.getElementById("listad-1er").value;

  if (val1) {
    document.getElementById("listad-1er").value = "";
    slot1.start();
  } else {
  }
}

function restarlanz2() {
  const val2 = document.getElementById("listad-2do").value;

  if (val2) {
    document.getElementById("listad-2do").value = "";
    slot2.start();
  } else {
  }
}

function restarlanz3() {
  const val3 = document.getElementById("listad-3er").value;

  if (val3) {
    document.getElementById("listad-3er").value = "";
    slot3.start();
  } else {
  }
}
