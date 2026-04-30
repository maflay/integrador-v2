// const num_test = document.getElementById("numero_ejemplo");

// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         console.log("¡Entró! El contenido cambió a:", num_test.innerHTML);
//         entroCarganueva();
//     });
// });


// observer.observe(num_test, { 
//     childList: true, 
//     characterData: true, 
//     subtree: true 
// });

// function ejemploCarga(){
//     console.log("entro a ejemplo Carga");
// }


// // observer.observe(document.getElementById("numero_ejemplo"), { childList: true });

// function entroCarganueva(){
//     console.log("entro nueva peticion");
//     setTimeout(() => {
//         console.log("cargando peticion");
//     }, 1500);
//     setTimeout(() => {
//         console.log("solicitando datos");
//     }, 3000);
//     setTimeout(() => {
//         console.log("datos entregados");
//     }, 4500);
// }