const NOW_PLAYING = {
  titulo: "Castlevania: Belmont's Curse",
  enlace: "https://www.nintendo.com/us/store/products/castlevania-belmonts-curse-switch/",
  imagen: "imagenes/coleccion/switch/castlevania-belmonts-curse-midnight-edition.jpeg"
};

function renderNowPlaying() {
  const contenedor = document.getElementById("now-playing-root");

  if (!contenedor) {
    return;
  }

  const { titulo, enlace, imagen } = NOW_PLAYING;

  contenedor.innerHTML = `
    <section class="now-playing panel-lateral" aria-label="Juego actual">

      <a
        class="now-playing-imagen"
        href="${enlace}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="${imagen}"
          alt="${titulo}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="now-playing-contenido">

        <div class="now-playing-encabezado">
          <i class="fa-solid fa-gamepad" aria-hidden="true"></i>
          <span>Currently Playing:</span>
        </div>

        <a
          class="now-playing-juego"
          href="${enlace}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${titulo}
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>

      </div>

    </section>
  `;
}

renderNowPlaying();
