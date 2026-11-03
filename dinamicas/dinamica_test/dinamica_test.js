function girarDado3D(targetNumber) {
  const platform = document.getElementById("platform");
  const dice = document.getElementById("dice");
  const result = document.getElementById("result");

  // Si no se pasa un valor explícito, genera uno aleatorio (1 a 6)
  const number = targetNumber || Math.floor(Math.random() * 6) + 1;

  if (platform) {
    platform.classList.remove("stop");
    platform.classList.add("playing");
    dice.classList.add("spin");
  }

  setTimeout(() => {
    if (platform) {
      platform.classList.remove("playing");
      platform.classList.add("stop");
      platform.style.transform = "translate3d(0, 0, 0px)";
      dice.classList.remove("spin");
    }

    let x = 0,
      y = 20,
      z = -20;

    switch (number) {
      case 1:
        x = 0;
        y = 20;
        z = -20;
        break;
      case 2:
        x = -100;
        y = -150;
        z = 10;
        break;
      case 3:
        x = 0;
        y = -100;
        z = -10;
        break;
      case 4:
        x = 0;
        y = 100;
        z = -10;
        break;
      case 5:
        x = 80;
        y = 120;
        z = -10;
        break;
      case 6:
        x = 0;
        y = 200;
        z = 10; // Corregido: en tu código tenías x = 10 por error de sintaxis
        break;
    }

    if (dice) {
      dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
    }

    if (result) {
      result.innerHTML = number;
    }
  }, 1120);
}
