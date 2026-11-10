const NOW_PLAYING = {
  titulo: "Donkey Kong Bananza",
  enlace: "https://www.nintendo.com/us/store/products/donkey-kong-bananza-switch-2/",
  imagen: "https://assets.nintendo.com/image/upload/f_auto/q_auto/w_320/ncom/My%20Nintendo%20Store/EN-US/Nintendo%20Switch%202/Software/Donkey%20Kong%20Bananza/121485-nintendo-switch-2-donkey-kong-bananza-2000x2000"
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
