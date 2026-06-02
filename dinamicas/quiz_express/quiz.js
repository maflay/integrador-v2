window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const user = inforUser();
const currentHash = window.location.href;
if (currentHash.includes("admin_quiz")) {
  if (user.Nivel != 2 && user.Nivel != 1) {
    window.location.href = "/#login";
  }
}
