(async () => {
  const publicacion = document.querySelector(".instagram-wrapper .instagram-media");
  if (!publicacion) return;

  try {
    const respuesta = await fetch("datos/instagram.json", {
      cache: "no-cache",
      signal: AbortSignal.timeout(8000)
    });
    if (!respuesta.ok) throw new Error("Instagram no disponible");
    const datos = await respuesta.json();
    const publicaciones = [...new Set(
      (Array.isArray(datos.publicaciones) ? datos.publicaciones : [])
        .filter((url) => typeof url === "string" &&
          /^https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\/$/.test(url))
    )];
    if (publicaciones.length) {
      let anterior;
      try {
        anterior = sessionStorage.getItem("instagram-anterior");
      } catch {}
      const opciones = publicaciones.length > 1
        ? publicaciones.filter((url) => url !== anterior)
        : publicaciones;
      const url = opciones[Math.floor(Math.random() * opciones.length)];
      publicacion.dataset.instgrmPermalink = url;
      const enlace = publicacion.querySelector("a");
      if (enlace) enlace.href = url;
      try {
        sessionStorage.setItem("instagram-anterior", url);
      } catch {}
    }
  } catch {}

  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);
})();
