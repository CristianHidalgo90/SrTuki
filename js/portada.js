(() => {
  const cabecera = document.querySelector(".perfil-header");
  const fotos = document.querySelectorAll(".portada-novedad-foto");
  if (!cabecera && !fotos.length) return;

  const escritorio = window.matchMedia("(min-width: 701px) and (hover: hover) and (pointer: fine)");
  let botonPortada;
  if (cabecera) {
    botonPortada = document.createElement("button");
    botonPortada.type = "button";
    botonPortada.className = "portada-ampliar";
    botonPortada.setAttribute("aria-label", "Ampliar foto de portada");
    cabecera.appendChild(botonPortada);
  }

  const visor = document.createElement("dialog");
  visor.className = "indice-visor";
  visor.setAttribute("aria-label", "Foto ampliada");
  visor.innerHTML = '<button type="button" class="visor-cerrar" aria-label="Cerrar foto">×</button><img class="visor-imagen" alt="">';
  document.body.appendChild(visor);

  const imagen = visor.querySelector("img");
  const cerrar = visor.querySelector("button");
  let overflowAnterior = "";
  let origen;

  const abrir = (ruta, descripcion, boton) => {
    if (visor.open) return;
    imagen.src = ruta;
    imagen.alt = descripcion;
    origen = boton;
    overflowAnterior = document.body.style.overflow;
    visor.showModal();
    document.body.style.overflow = "hidden";
    cerrar.focus();
  };

  botonPortada?.addEventListener("click", () => {
    if (!escritorio.matches) return;
    const fondo = getComputedStyle(cabecera).backgroundImage;
    const ruta = fondo.match(/^url\(["']?(.*?)["']?\)$/);
    if (ruta) abrir(ruta[1], "Colección de Sr.Tuki", botonPortada);
  });

  fotos.forEach((foto) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "portada-novedad-ampliar";
    boton.setAttribute("aria-label", "Ampliar foto: " + foto.alt);
    foto.replaceWith(boton);
    boton.appendChild(foto);
    boton.addEventListener("click", () => abrir(foto.currentSrc || foto.src, foto.alt, boton));
  });

  cerrar.addEventListener("click", () => visor.close());
  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) visor.close();
  });
  visor.addEventListener("close", () => {
    imagen.removeAttribute("src");
    document.body.style.overflow = overflowAnterior;
    if (origen && (origen !== botonPortada || escritorio.matches)) origen.focus();
  });
  escritorio.addEventListener("change", () => {
    if (!escritorio.matches && visor.open && origen === botonPortada) visor.close();
  });
})();
