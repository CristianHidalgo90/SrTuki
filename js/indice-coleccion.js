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

  function tarjetaResumen(icono, valor, etiqueta) {
    return `
      <article class="indice-resumen-card">
        <i class="fa-solid ${icono}" aria-hidden="true"></i>
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
      tarjetaResumen("fa-mobile-screen-button", stats.juegos_portatiles, "Juegos portátiles"),
      tarjetaResumen("fa-tv", stats.consolas, "Consolas"),
      tarjetaResumen("fa-puzzle-piece", stats.accesorios, "Accesorios y figuras"),      tarjetaResumen("fa-trophy", stats.terminados, "Juegos terminados")
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

    return `
      <li class="indice-item">
        <span class="indice-item-nombre">${escapar(item.nombre)}</span>
        ${estadoJugado}
      </li>
    `;
  }

  function renderGrupo(grupo, abrir) {
    const items = grupo.items.filter((item) => itemCoincide(item, grupo));
    if (!items.length) return "";

    return `
      <details class="indice-grupo" ${abrir ? "open" : ""}>
        <summary>
          <span>${escapar(grupo.grupo)}</span>
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

    filtros.hidden = estado.vista !== "coleccion";

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
    document.querySelectorAll("[data-vista]").forEach((boton) => {
      boton.addEventListener("click", () => {
        estado.vista = boton.dataset.vista;
        activarBotones("[data-vista]", "vista", estado.vista);
        pintarContenido();
      });
    });

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