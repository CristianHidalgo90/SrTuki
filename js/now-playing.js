const NOW_PLAYING = {
  titulo: "Yoshi and the Mysterious Book",
  enlace: "https://www.nintendo.com/es-cl/store/products/yoshi-and-the-mysterious-book-switch-2/",
  imagen: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00030000-00020002.png"
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
          style="object-fit: contain; object-position: center; padding: 6px; box-sizing: border-box; transform: none;"
          alt="${titulo}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="now-playing-contenido">

        <div class="now-playing-encabezado">
          <i class="fa-solid fa-gamepad" aria-hidden="true"></i>
          <span>Now Playing:</span>
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
