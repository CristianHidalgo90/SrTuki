(() => {
  const cabecera = document.querySelector(".perfil-header");
  if (!cabecera) return;

  const escritorio = window.matchMedia("(min-width: 701px) and (hover: hover) and (pointer: fine)");
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "portada-ampliar";
  boton.setAttribute("aria-label", "Ampliar foto de portada");
  cabecera.appendChild(boton);

  const visor = document.createElement("dialog");
  visor.className = "indice-visor";
  visor.setAttribute("aria-label", "Foto de portada ampliada");
  visor.innerHTML = '<button type="button" class="visor-cerrar" aria-label="Cerrar foto">×</button><img class="visor-imagen" alt="Colección de Sr.Tuki">';
  document.body.appendChild(visor);

  const imagen = visor.querySelector("img");
  const cerrar = visor.querySelector("button");
  let overflowAnterior = "";

  boton.addEventListener("click", () => {
    if (!escritorio.matches || visor.open) return;
    const fondo = getComputedStyle(cabecera).backgroundImage;
    const ruta = fondo.match(/^url\(["']?(.*?)["']?\)$/);
    if (!ruta) return;
    imagen.src = ruta[1];
    overflowAnterior = document.body.style.overflow;
    visor.showModal();
    document.body.style.overflow = "hidden";
    cerrar.focus();
  });

  cerrar.addEventListener("click", () => visor.close());
  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) visor.close();
  });
  visor.addEventListener("close", () => {
    imagen.removeAttribute("src");
    document.body.style.overflow = overflowAnterior;
    if (escritorio.matches) boton.focus();
  });
  escritorio.addEventListener("change", () => {
    if (!escritorio.matches && visor.open) visor.close();
  });
})();
