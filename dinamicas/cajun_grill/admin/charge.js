(() => {
  let loader_local = document.createElement("div");
  loader_local.innerHTML = `
        <style>
            .loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #ffffff;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .spinner {
                border: 6px solid #ccc;
                border-top: 6px solid #356adc;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
            #nom_user {
                position: absolute;
                top: 10px;
                right: 10px;
            }
           
        </style>

        <div id="loader" class="loader-overlay">
            <div class="spinner"></div>
        </div>
    `;

  document.body.appendChild(loader_local);
})();

function viewLoader() {
  let user = inforUser();

  let container = document.querySelector(".admin-brand");
  if(container){
    let nameUser = document.createElement("p");
    nameUser.id = "nom_user";
    nameUser.textContent = `Hola, ${user.Nombre}`;
    container.appendChild(nameUser);
  }
  if (document.getElementById("nom_user")) {

  }
  setTimeout(() => {
    if (document.getElementById("loader")) {
      document.getElementById("loader").style.display = "none";
    }
  }, 3000);
}
