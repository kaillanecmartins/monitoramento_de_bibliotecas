const modal = document.getElementById("modalMapa");

document.getElementById("btnMapa").onclick = () => {
  modal.classList.add("is-active");
};

document.getElementById("fecharMapa").onclick = () => {
  modal.classList.remove("is-active");
};

document.querySelector(".modal-background").onclick = () => {
  modal.classList.remove("is-active");
};

function atualizarMapa(id, ocupada) {
  const box = document.getElementById(id);

  if (ocupada) {
    box.className = "cabine has-background-danger-light";

    box.innerHTML = `
      <strong>Cabine ${id === "cab1Mapa" ? "1" : "2"}</strong>
      <p>Ocupada</p>
    `;
  } else {
    box.className = "cabine has-background-success-light";

    box.innerHTML = `
      <strong>Cabine ${id === "cab1Mapa" ? "1" : "2"}</strong>
      <p>Disponível</p>
    `;
  }
}

conectarMQTT((dados) => {
  const livre1 = dados.movimento1 != 0;

  const livre2 = dados.movimento2 != 0;

  let livres = 0;

  if (livre1) livres++;

  if (livre2) livres++;

  document.getElementById("totalCabines").textContent = livres + " / 2";

  atualizarMapa("cab1Mapa", !livre1);

  atualizarMapa("cab2Mapa", !livre2);
});
