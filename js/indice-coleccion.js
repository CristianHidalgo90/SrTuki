(() => {
  const rutas = {
    meta: "datos/indice-meta.json",
    sobremesa: "datos/indice-sobremesa.json",
    portatiles: "datos/indice-portatiles.json",
    consolas: "datos/indice-consolas.json",
    accesorios: "datos/indice-accesorios.json",    terminadosPlataforma: "datos/indice-terminados-plataforma.json",
    terminadosAnio: "datos/indice-terminados-anio.json"
  };

  const estado = {
    vista: "coleccion",
    categoria: "Todos",
    busqueda: "",
    datos: null
  };

  const normalizar = (texto = "") =>
    texto
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const escapar = (texto = "") =>
    texto
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  async function cargarJson(ruta) {
    const respuesta = await fetch(ruta, { cache: "no-store" });
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar ${ruta}`);
    }
    return respuesta.json();
  }


  const iconosResumen = {
    portatil: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="22" fill="currentColor" aria-hidden="true" focusable="false" style="display:block"><path fill-rule="evenodd" d="M7 1h14a2 2 0 0 1 2 2v19a5 5 0 0 1-5 5H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm1 3v10h12V4H8Zm2 2h8v6h-8V6Zm-1 11v2H7v2h2v2h2v-2h2v-2h-2v-2H9Zm9 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm3-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>',
    cartucho: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="22" fill="currentColor" aria-hidden="true" focusable="false" style="display:block"><path fill-rule="evenodd" d="M5 2h18v3h2v20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5h2V2Zm3 3v12h12V5H8Zm2 2h8v8h-8V7ZM8 21v3h2v-3H8Zm5 0v3h2v-3h-2Zm5 0v3h2v-3h-2Z"/></svg>',
    consola: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="22" fill="currentColor" aria-hidden="true" focusable="false" style="display:block"><path fill-rule="evenodd" d="M5 5h18l4 7v12H1V12l4-7Zm1.2 2L4 11h20l-2.2-4H6.2ZM4 14v7h14v-7H4Zm2 2h10v3H6v-3Zm14-2v7h4v-7h-4Z"/></svg>'
  };

  function tarjetaResumen(icono, valor, etiqueta) {
    return `
      <article class="indice-resumen-card">
        <i class="${iconosResumen[icono] ? "indice-icono" : `fa-solid ${icono}`}" aria-hidden="true">${iconosResumen[icono] || ""}</i>
        <strong>${valor}</strong>
        <span>${etiqueta}</span>
      </article>
    `;
  }

  function pintarResumen(stats) {
    const contenedor = document.getElementById("indiceResumen");
    if (!contenedor) return;

    contenedor.innerHTML = [
      tarjetaResumen("fa-gamepad", stats.juegos_sobremesa, "Juegos sobremesa"),
      tarjetaResumen("portatil", stats.juegos_portatiles, "Juegos portátiles"),
      tarjetaResumen("consola", stats.total_consolas, "Total consolas"),
      tarjetaResumen("fa-chess-pawn", stats.accesorios, "Accesorios, figuras y otros"),
      tarjetaResumen("cartucho", stats.total_juegos, "Total juegos"),
      tarjetaResumen("fa-trophy", stats.terminados, "Juegos terminados")
    ].join("");
  }

  function obtenerGrupos() {
    if (!estado.datos) return [];

    if (estado.vista === "terminados-plataforma") {
      return estado.datos.terminadosPlataforma.map((grupo) => ({
        ...grupo,
        categoria: "Terminados por plataforma"
      }));
    }

    if (estado.vista === "terminados-anio") {
      return estado.datos.terminadosAnio.map((grupo) => ({
        ...grupo,
        categoria: "Terminados por año"
      }));
    }

    return estado.datos.coleccion.filter((grupo) =>
      estado.categoria === "Todos" || grupo.categoria === estado.categoria
    );
  }

  function itemCoincide(item, grupo) {
    if (!estado.busqueda) return true;
    const aguja = normalizar(estado.busqueda);
    return [
      item.nombre,
      grupo.grupo,
      grupo.categoria
    ].some((valor) => normalizar(valor).includes(aguja));
  }

  function renderItem(item) {
    const estadoJugado =
      typeof item.jugado === "boolean"
        ? `<span class="indice-item-estado ${item.jugado ? "si" : "no"}">Jugado: ${item.jugado ? "Sí" : "No"}</span>`
        : "";

    const nombreConVideo = item.video
      ? `<span class="indice-item-nombre">
          <button type="button" class="indice-item-nombre indice-item-foto" data-foto="${escapar(item.imagen)}" aria-label="Ver foto de ${escapar(item.nombre)}">Donkey Kong Country <i class="fa-solid fa-camera" aria-hidden="true"></i></button>
          (<a href="${escapar(item.video)}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">cartucho maldito</a>)
        </span>`
      : "";

    return `
      <li class="indice-item">
        <span class="indice-item-nombre">
        ${nombreConVideo || (item.imagen ? `<button type="button" class="indice-item-nombre indice-item-foto" data-foto="${escapar(item.imagen)}" aria-label="Ver foto de ${escapar(item.nombre)}">${escapar(item.nombre)} <i class="fa-solid fa-camera" aria-hidden="true"></i></button>` : `<span class="indice-item-nombre">${escapar(item.nombre)}</span>`)}
        ${(item.imagenes || []).map((ruta, indice) => `<button type="button" class="indice-item-foto" data-foto="${escapar(ruta)}" data-nombre="${escapar(item.nombre)} - foto ${indice + 2}" aria-label="Ver foto ${indice + 2} de ${escapar(item.nombre)}" style="margin-left: 6px;"><i class="fa-solid fa-camera" aria-hidden="true"></i> ${indice + 2}</button>`).join("")}
        </span>
        ${estadoJugado}
      </li>
    `;
  }

  function renderGrupo(grupo, abrir) {
    const items = grupo.items
      .filter((item) => itemCoincide(item, grupo))
      .sort((a, b) => a.nombre.trim().localeCompare(b.nombre.trim(), "es", {
        sensitivity: "base",
        numeric: true
      }));
    if (!items.length) return "";

    return `
      <details class="indice-grupo" ${abrir ? "open" : ""}>
        <summary>
          <span>${escapar(grupo.categoria === "Consolas" ? `Consolas - ${grupo.grupo}` : grupo.grupo)}</span>
          <span class="indice-grupo-cantidad">${items.length}</span>
        </summary>
        <ul class="indice-items">
          ${items.map(renderItem).join("")}
        </ul>
      </details>
    `;
  }

  function pintarContenido() {
    const contenedor = document.getElementById("indiceResultados");
    const contador = document.getElementById("indiceContador");
    const filtros = document.getElementById("indiceFiltrosColeccion");

    if (!contenedor || !contador || !filtros) return;

    filtros.hidden = false;

    const grupos = obtenerGrupos();
    const hayBusqueda = Boolean(estado.busqueda.trim());

    let total = 0;
    const html = grupos
      .map((grupo) => {
        const coincidencias = grupo.items.filter((item) => itemCoincide(item, grupo));
        total += coincidencias.length;
        return renderGrupo(grupo, hayBusqueda);
      })
      .filter(Boolean)
      .join("");

    contador.textContent = `${total} resultado${total === 1 ? "" : "s"}`;

    contenedor.innerHTML =
      html ||
      `<div class="indice-vacio"><i class="fa-solid fa-magnifying-glass"></i><p>No encontré coincidencias.</p></div>`;
  }

  function activarBotones(selector, atributo, valor) {
    document.querySelectorAll(selector).forEach((boton) => {
      boton.classList.toggle("activo", boton.dataset[atributo] === valor);
    });
  }

  function registrarEventos() {
    document.querySelectorAll("[data-categoria]").forEach((boton) => {
      boton.addEventListener("click", () => {
        estado.categoria = boton.dataset.categoria;
        activarBotones("[data-categoria]", "categoria", estado.categoria);
        pintarContenido();
      });
    });

    const buscador = document.getElementById("indiceBuscador");
    buscador?.addEventListener("input", (evento) => {
      estado.busqueda = evento.target.value;
      pintarContenido();
    });

    const limpiar = document.getElementById("indiceLimpiar");
    limpiar?.addEventListener("click", () => {
      estado.busqueda = "";
      if (buscador) {
        buscador.value = "";
        buscador.focus();
      }
      pintarContenido();
    });
  }


  function registrarVisor() {
    const visor = document.getElementById("indiceVisor");
    const imagen = document.getElementById("indiceVisorImagen");
    const cerrar = document.getElementById("indiceVisorCerrar");
    let origen = null;
    let overflowAnterior = "";

    document.getElementById("indiceResultados").addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-foto]");
      if (!boton) return;
      origen = boton;
      imagen.src = boton.dataset.foto;
      imagen.alt = boton.dataset.nombre || boton.textContent.trim();
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
      if (origen?.isConnected) origen.focus();
    });
  }

  async function iniciar() {
    const estadoCarga = document.getElementById("indiceCarga");

    try {
      const [
        meta,
        sobremesa,
        portatiles,
        consolas,
        accesorios,
        terminadosPlataforma,
        terminadosAnio
      ] = await Promise.all([
        cargarJson(rutas.meta),
        cargarJson(rutas.sobremesa),
        cargarJson(rutas.portatiles),
        cargarJson(rutas.consolas),
        cargarJson(rutas.accesorios),
        cargarJson(rutas.terminadosPlataforma),
        cargarJson(rutas.terminadosAnio)
      ]);

      estado.datos = {
        coleccion: [
          ...sobremesa,
          ...portatiles,
          ...consolas,
          ...accesorios
        ],
        terminadosPlataforma,
        terminadosAnio
      };

      pintarResumen(meta.stats);
      registrarEventos();
      registrarVisor();
      pintarContenido();

      if (estadoCarga) {
        estadoCarga.remove();
      }
    } catch (error) {
      console.error(error);
      if (estadoCarga) {
        estadoCarga.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>No se pudo cargar el índice de la colección.</span>
        `;
        estadoCarga.classList.add("error");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();